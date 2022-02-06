# Title: COMP 3600 Optional Assignment

# ── Setup ──

# Here I install 'Kino' and 'VegaLite', a libraries for input boxes & plotting within Livebook.

Mix.install([
  {:vega_lite, "~> 0.1.2"},
  {:kino, "~> 0.4.1"}
])

alias VegaLite, as: Vl

# Whenever I do something random, I will likely set the random seed so my runs are consistent, in which I define here.

seed = {4, 8, 16}

# > Note: Anything written like _this_ has been taken from the assignment writing, and is included here both for context where I have solved each aspect, and also for my own reference as I write this.

# _In the stable matching problem we considered, every person could potentially have a unique preference list. Now, suppose that there are only a few methods people use to rank their matches, and thus only a few possible rankings._

# _More specifically, suppose there are k many possible rankings of hospitals, and also k possible rankings of students. In this case, the input consists of n,k,H,S,HI,SI, where H and S are now k×n matrices, and arrays HI and SI specify, for each hospital and student, which row of matrices H and S each hospital (respectively, student) uses as ranking._

# _You may be wondering how having repeated rankings affects the performance of Gale-Shapley algorithm (and in general how it performs on average). To test this, you will implement the stable matching with repeating preferences variant of Gale-Shapley algorithm which takes the input in the above format, implement a generator of random instances, and run experiments to see how it does._

# 1. _First, write a generator of random instances of the stable matching problem. Your generator should take as an input n and k, and produce an instance n,k,H.S,HI,SI. Please see the description of the input/output format as well as the output format of Gale-Shapley algorithm._

defmodule InputGenerator do
  # The random instance generator takes as an input numbers n and k.
  def run(n, k \\ nil) do
    # If only one number is given, interpret it as k=n.
    k = if k == nil, do: n, else: k

    generate_preference_string = fn ->
      Enum.map(0..(k - 1), fn _ ->
        0..(n - 1)
        |> Enum.shuffle()
        |> Enum.reduce("", fn x, acc -> "#{x} #{acc}" end)
        |> String.trim()
      end)
      |> Enum.reduce("", fn line, acc -> "#{acc}\n#{line}" end)
      |> String.trim()
    end

    # then there are k lines each containing n space-separated values
    # (permutations of numbers 0 to n-1) encoding k possible preference
    # lists for hospitals (H),
    hospital_preferences = generate_preference_string.()

    # then k lines with n space-separated numbers (permutations of
    # numbers 0 to n-1) encoding k possible preference lists for
    # students (S)
    student_preferences = generate_preference_string.()

    possible_list_picks = 0..(k - 1)

    generate_preference_index = fn ->
      Enum.reduce(0..(n - 1), "", fn _, acc ->
        "#{Enum.random(possible_list_picks)} #{acc}"
      end)
      |> String.trim()
    end

    # then space-separated list HI encoding which hospital has which
    # preference list, HI (in the sample, hospital 0 uses list 0,
    # hospital 1 uses list 1, hospital 2 again uses list 0, hospital 3
    # uses list 2 and the last hospital uses list 1).
    hospital_preference_index = generate_preference_index.()

    # list SI similar to HI specifying which student uses which list.
    student_preference_index = generate_preference_index.()

    """
    #{n}
    #{k}

    #{hospital_preferences}

    #{student_preferences}

    #{hospital_preference_index}

    #{student_preference_index}
    """
    |> String.trim()
    |> String.replace("\r", "")
  end
end

:rand.seed(:exsss, seed)
InputGenerator.run(5, 3) |> IO.puts()

# I'd like to keep my implmentation of the Gale Shapley algorithm clean from input parsing and output generation, so I will define two more modules that will take care of that for me.

defmodule InputParser do
  def run(input) do
    [
      head,
      hospital_preferences,
      student_preferences,
      hospital_index,
      student_index
    ] = input |> String.split("\n\n")

    [n, _k] = head |> String.split("\n") |> Enum.map(&String.to_integer(&1))

    line_to_list = fn line ->
      line |> String.split(" ") |> Enum.map(&String.to_integer(&1))
    end

    multiline_to_list = fn multiline ->
      multiline |> String.split("\n") |> Enum.map(line_to_list)
    end

    mappify = fn indexes, preferences ->
      indexes
      |> Enum.with_index()
      |> Enum.map(fn {pref_index, index} ->
        {index, Enum.at(preferences, pref_index)}
      end)
      |> Map.new()
    end

    hospital_preferences = multiline_to_list.(hospital_preferences)
    hospital_index = line_to_list.(hospital_index)
    hospital_preferences = mappify.(hospital_index, hospital_preferences)

    student_preferences = multiline_to_list.(student_preferences)
    student_index = line_to_list.(student_index)
    student_preferences = mappify.(student_index, student_preferences)

    {n, hospital_preferences, student_preferences}
  end
end

defmodule OutputGenerator do
  def run(%{hospital_matching: hospital_matching}) do
    hospital_matching
    |> Map.to_list()
    |> Enum.sort(fn {x, _}, {y, _} -> x <= y end)
    |> Enum.map(fn {h, s} -> "#{h} #{s}" end)
    |> Enum.join("\n")
  end
end

# 1. _Then, implement Gale-Shapley algorithm which takes as an input the instances in the format above (that is, as n, k, H, S, HI,SI)._

defmodule GaleShapley do
  def run({n, hospital_preferences, student_preferences}) do
    unmatched_hospitals = 0..(n - 1) |> Enum.to_list()

    student_matching = %{}
    hospital_matching = %{}
    rounds = 0

    recur(
      hospital_preferences,
      student_preferences,
      unmatched_hospitals,
      student_matching,
      hospital_matching,
      rounds
    )
  end

  defp recur(_, _, [], student_matching, hospital_matching, rounds) do
    %{
      student_matching: student_matching,
      hospital_matching: hospital_matching,
      rounds: rounds
    }
  end

  defp recur(
         hospital_preferences,
         student_preferences,
         unmatched_hospitals,
         student_matching,
         hospital_matching,
         rounds
       ) do
    [hospital | unmatched_hospitals] = unmatched_hospitals

    hospital_preference = hospital_preferences[hospital]
    [student | hospital_preference] = hospital_preference
    student_preference = student_preferences[student]
    student_current_hospital_id = student_matching[student]

    {student_matching, hospital_matching, unmatched_hospitals} =
      cond do
        student_current_hospital_id == nil ->
          student_matching = student_matching |> Map.put(student, hospital)
          hospital_matching = hospital_matching |> Map.put(hospital, student)
          {student_matching, hospital_matching, unmatched_hospitals}

        Enum.find_index(student_preference, &(&1 == hospital)) <
            Enum.find_index(student_preference, &(&1 == student_current_hospital_id)) ->
          student_matching = student_matching |> Map.put(student, hospital)

          hospital_matching =
            hospital_matching
            |> Map.delete(student_current_hospital_id)
            |> Map.put(hospital, student)

          unmatched_hospitals = [student_current_hospital_id | unmatched_hospitals]

          {student_matching, hospital_matching, unmatched_hospitals}

        true ->
          unmatched_hospitals = [hospital | unmatched_hospitals]
          {student_matching, hospital_matching, unmatched_hospitals}
      end

    hospital_preferences = hospital_preferences |> Map.put(hospital, hospital_preference)

    rounds = rounds + 1

    recur(
      hospital_preferences,
      student_preferences,
      unmatched_hospitals,
      student_matching,
      hospital_matching,
      rounds
    )
  end
end

:rand.seed(:exsss, seed)

InputGenerator.run(5, 3)
|> InputParser.run()
|> GaleShapley.run()
|> OutputGenerator.run()
|> IO.puts()

# If you'd like to test arbitrary input, enter in values in the text area below, and then run the next block.

test_input = Kino.Input.textarea("Test input text")

Kino.Input.read(test_input)
|> InputParser.run()
|> GaleShapley.run()
|> IO.inspect()
|> OutputGenerator.run()
|> IO.puts()

# 1. _Now, let's see how the behaviour of Gale-Shapley is affected by changes in k._

# a. _As a control, let us start with k=n. Generate random instances for n=20 to n=200, in increments of 10; produce 10 random inputs (samples) for each n. You will end up with 190 different instances, 10 with n=20, 10 with n=30, etc._

instance_sets =
  20..200//10
  |> Enum.to_list()
  |> Enum.map(fn n ->
    {n, 1..10 |> Enum.map(fn _ -> InputGenerator.run(n) end)}
  end)

length(instance_sets)

# b. _Now, run your implementation of the Gale-Shapley algorithm on each of these test cases and record the number of rounds for each. Then, for every value of n, compute the average of the number of rounds for the corresponding 10 instances._

results_when_k_is_n =
  instance_sets
  |> Enum.map(fn {n, instances} ->
    instances
    |> Enum.map(fn instance ->
      instance
      |> InputParser.run()
      |> GaleShapley.run()
      |> Map.get(:rounds)
    end)
    |> Enum.sum()
    |> then(fn sum -> %{"n" => n, "average" => sum / length(instances)} end)
  end)

# c. _To test what happens when k is a small constant, repeat the experiment with k=10, for the same range of n and same number of samples for each n._

results_when_k_is_10 =
  20..200//10
  |> Enum.to_list()
  |> Enum.map(fn n ->
    k = 10
    {n, 1..10 |> Enum.map(fn _ -> InputGenerator.run(n, k) end)}
  end)
  |> Enum.map(fn {n, instances} ->
    instances
    |> Enum.map(fn instance ->
      instance
      |> InputParser.run()
      |> GaleShapley.run()
      |> Map.get(:rounds)
    end)
    |> Enum.sum()
    |> then(fn sum -> %{"n" => n, "average" => sum / length(instances)} end)
  end)

# d. _Plot the results of your experiments. More specifically, produce a plot with n labeling x-axis and y-axis being the number of rounds. On it, plot two curves, one for k=n, another for k=10. Make sure to label all your axes and curves._

Vl.new(width: 700, height: 300, title: "Results from n = 20 -> n = 200, when k is n")
|> Vl.data_from_values(results_when_k_is_n)
|> Vl.mark(:line)
|> Vl.encode_field(:x, "n", type: :nominal, axis: [label_angle: 0])
|> Vl.encode_field(:y, "average", type: :quantitative)

Vl.new(width: 700, height: 300, title: "Results from n = 20 -> n = 200, when k is 10")
|> Vl.data_from_values(results_when_k_is_10)
|> Vl.mark(:line)
|> Vl.encode_field(:x, "n", type: :nominal, axis: [label_angle: 0])
|> Vl.encode_field(:y, "average", type: :quantitative)

# e. _Discuss what you observe about the performance of Gale-Shapley on inputs with repeated preferences._

# > When we confine the k to a specific value (in the graph above it is 10), the algorithm is fed a potentially large amount of hospital / student combinations, but is restricted to a smaller subset of preference lists for each to pick from.
# > 
# > As seen in the difference in the graphs, this causes the algorithm to require many more rounds to complete, which likely means there is infighting between hospitals for some of the same students, therefore lots of cases in which a hospital is added back to the pool of unmatched hospitals.

# f. _Let's test your observation a little more. Choose a large n (for example, n=200 or n=1000), and repeat the experiments now varying k (in increments of 10) with 10 samples for each value of k. Plot the results (again as an average of 10 samples for each point) with k now labeling the x-axis, and the number of rounds for y-axis._

results_when_n_is_200 =
  20..200//10
  |> Enum.to_list()
  |> Enum.map(fn k ->
    n = 200
    {k, 1..10 |> Enum.map(fn _ -> InputGenerator.run(n, k) end)}
  end)
  |> Enum.map(fn {k, instances} ->
    instances
    |> Enum.map(fn instance ->
      instance
      |> InputParser.run()
      |> GaleShapley.run()
      |> Map.get(:rounds)
    end)
    |> Enum.sum()
    |> then(fn sum -> %{"k" => k, "average" => sum / length(instances)} end)
  end)

Vl.new(width: 700, height: 300, title: "Results from k = 20 -> k = 200, when n is 200")
|> Vl.data_from_values(results_when_n_is_200)
|> Vl.mark(:line)
|> Vl.encode_field(:x, "k", type: :nominal, axis: [label_angle: 0])
|> Vl.encode_field(:y, "average", type: :quantitative)

# g. _Write what you observed from this experiment. State your conjecture about the effect of restricting the number of possible preference lists on the running time and the number of rounds of Gale-Shapley algorithm. What do you think is an explanation of such behaviour? Write your explanation of this phenomenon._

# > Restricting the options that can be picked from for both hospitals and students affects the number of rounds the algorithm comes in, due to (as previously stated before for the previous written question) what I assume to be fighting between hospitals for the same set of students, therefore causing more situations in which a hopsital is assigned a student in one round, only to have it later replaced by another hospital, and added back to the pool of unmatched hospitals, potentially many times before finally getting the matching that will remain until the end of that run of the algorithm.
