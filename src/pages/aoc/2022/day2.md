---
layout: "@layouts/AdventOfCodeLayoutDay.astro"
title: day 2
pubDate: 2022-12-02
---

second day, a problem with ever slightly more meat, but still light

my solution could have been more compact, but i already what i wanted my solution to be in my head as soon as i saw the problem, so i went with the flow

---

<details>
<summary>click to view my solution</summary>

<br />

given the sample strategy guide:

```
A Y
B X
C Z
```

assuming `input` is the above as one big string,

```elixir
input =
  input
  |> String.trim()
  |> String.split("\n")
  |> Enum.map(&String.split(&1, " "))
```

the usual input trim / split, but this time splitting each line itself by an empty string

```elixir
[
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"]
]
```

leaving us with a list of lists yet again

```elixir
defmodule RockPaperScissors do
  def score(them, you) do
    choice_score =
      case you do
        :rock -> 1
        :paper -> 2
        :scissors -> 3
      end

    game_score =
      case {you, them} do
        {you, you} -> 3
        {:rock, :paper} -> 0
        {:rock, :scissors} -> 6
        {:paper, :scissors} -> 0
        {:paper, :rock} -> 6
        {:scissors, :rock} -> 0
        {:scissors, :paper} -> 6
      end

    choice_score + game_score
  end

  def pick_then_score(them, wanted_result) do
    case {them, wanted_result} do
      {x, :draw} -> score(them, x)
      {:rock, :win} -> score(them, :paper)
      {:rock, :throw} -> score(them, :scissors)
      {:paper, :win} -> score(them, :scissors)
      {:paper, :throw} -> score(them, :rock)
      {:scissors, :win} -> score(them, :rock)
      {:scissors, :throw} -> score(them, :paper)
    end
  end
end
```

creating a _module_ for the first time this year, to

- calculate score, using `score/2`, which takes in a 'game' (choice from us, and choice from enemy), and returns the score from that game we receive

#### `score/2`

```elixir
choice_score =
  case you do
    :rock -> 1
    :paper -> 2
    :scissors -> 3
  end
```

using pattern matching, get the score we get from simply picking an option

```elixir
game_score =
  case {you, them} do
    {you, you} -> 3
    {:rock, :paper} -> 0
    {:rock, :scissors} -> 6
    {:paper, :scissors} -> 0
    {:paper, :rock} -> 6
    {:scissors, :rock} -> 0
    {:scissors, :paper} -> 6
  end
```

using pattern matching _again_, to figure out what we actually from winning / losing, using a sneaky pattern matching trick for handling the draw case

```elixir
choice_score + game_score
```

then, _returning a value_

big stuff

#### `pick_then_score/2`

```elixir
case {them, wanted_result} do
  {x, :draw} -> score(them, x)
  {:rock, :win} -> score(them, :paper)
  {:rock, :throw} -> score(them, :scissors)
  {:paper, :win} -> score(them, :scissors)
  {:paper, :throw} -> score(them, :rock)
  {:scissors, :win} -> score(them, :rock)
  {:scissors, :throw} -> score(them, :paper)
end
```

for this util, we take in what we know _they_ picked, and the result we wish the game to end up in, and do _yet another pattern match_, with some more sneaky logic for the draw case, using `score/2` to calculate the score of our very legit game

### part 1

```elixir
assumed_guide = %{
  "A" => :rock,
  "B" => :paper,
  "C" => :scissors,
  "X" => :rock,
  "Y" => :paper,
  "Z" => :scissors
}
```

for part 1, i assume i have the 'assumed guide' from the elf, which maps the input from string -> atom, so the rest of my program can use atoms instead of strings

```elixir
input
|> Enum.map(fn [them, you] ->
  RockPaperScissors.score(
    assumed_guide[them],
    assumed_guide[you]
  )
end)
|> Enum.sum()
# -> 15
```

map over the already cleaned up input, pluck out the left and right values into variables, and stuff them into `score/2`

sum that, and boom, answer

### part 2

```elixir
actual_guide = %{
  "A" => :rock,
  "B" => :paper,
  "C" => :scissors,
  "X" => :throw,
  "Y" => :draw,
  "Z" => :win
}
```

this is a similar map to the one above, but the _actual_ guide from the elf, no silly stuff this time

```elixir
input
|> Enum.map(fn [them, you] ->
  RockPaperScissors.pick_then_score(
    actual_guide[them],
    actual_guide[you]
  )
end)
|> Enum.sum()
# -> 12
```

same as above, yet again, but we use `pick_then_score`, because we are legit rock paper scissor _gamers_

<br />

</details>

---

the [[MUN Computer Science Society]](https://muncompsci.ca/) server / discord continues to be _busy_, as i write this at 11:00pm on the 2nd:

\- 39 people have solved day 1

\- 30 have solved day 2

it seems we had another large crowd of late folk up doing the problem again,
even those who did the problem later but still pretty early in the morning have been pushed off of the top twenty!

---

### others

[[Mudkip/AdventOfCode]](https://github.com/Mudkip/AdventOfCode/blob/main/2022/2.py) python

> a python solution, with ample usage of dicts to map input to expected output
>
> verbose but it means each part is nice and clean

[[briannamcdonald/advent-of-code-2022]](https://github.com/briannamcdonald/advent-of-code-2022/tree/main/day02) python

> the brute force way, but decently compact

[[krbarter/Advent-Of-Code-2022]](https://github.com/krbarter/Advent-Of-Code-2022/blob/main/Day2/day2.py) python

> the brute force way, but not as decently compact :D

[[nint8835/AdventOfCode2022]](https://github.com/nint8835/AdventOfCode2022/blob/main/Day2/Day2.fsx) f#

> _the functional, **and**, mathematical way_
>
> nice

[[hamzahap/AdventOfCode2022]](https://docs.google.com/spreadsheets/d/14X_347m2Yjt-7KavMA145m2vRu2luDlzrg73sLIsmOU/edit) sheets

> ~~i wish github could preview excel files in a table because i am simply not spending the time required to pull this down and view~~
>
> ~~however,~~ keep it up hamzah
>
> edit: turns out it is not being done in excel, but actually being done in sheets and being exported to excel such that there can exist files in the repo
>
> fixed :)

[[TheCrypticCanadian/advent-of-code-2022]](https://github.com/TheCrypticCanadian/advent-of-code-2022/tree/main/2) python

> less of a blob this time but still two files, gump why?
>
> the brute force way, but just mapping the lines to the output,
> which for this problem isn't a bad strat

[[STollenaar/AdventOfCode2022]](https://github.com/STollenaar/AdventOfCode2022/blob/main/cmd/day2/main.go) golang
>
> clean little go maps and structs again
>
> setup means problem is smol :)

[[zcvaters/adventofcode2022]](https://github.com/zcvaters/adventofcode2022/blob/main/day02/day02.swift) swift

> swift enums, interesting
>
> them having methods looks cursed i must admit

[[chadmroberts88/advent-of-code-2022]](https://github.com/chadmroberts88/advent-of-code-2022/blob/main/src/day2/solutions.ts) typescript

> brute force, but still compact!

[[devthedevel/advent_of_code]](https://github.com/devthedevel/advent_of_code/blob/master/2022/2/index.ts) typescript

> wow pulling out type defs that are a union of strings
>
> _but usage of `//@ts-ignore`_
>
> yet, i still cannot question the logic of the wise clouds
>
> for they are so high

[[mathieuboudreau/advent]](https://github.com/mathieuboudreau/advent/tree/main/day-02) python notebook

> simple, clean, reads nice
>
> nice

[[ericthomasca/adventofcode2022]](https://github.com/ericthomasca/adventofcode2022/blob/main/day02/src/main.rs) rust

> bruce force, but :crab:

[[Keenan-Nicholson/AdventOfCode]](https://github.com/Keenan-Nicholson/AdventOfCode/blob/main/2022/day2/day2.ts) typescript

> brute force
>
> yeah

[[CameronSquires/AdventOfCode2022]](https://github.com/CameronSquires/AdventOfCode2022/blob/main/Day2.py) python

> _brute force_, an `if` soup

[[RyanBrushett/adventofcode2022]](https://github.com/RyanBrushett/adventofcode2022/tree/main/day2) ruby

> brute force, but ruby, so its nice <3
>
> pretty compact

[[joel1842/advent-of-code-2022]](https://github.com/joel1842/advent-of-code-2022/blob/main/day2/day2.py) python

> brute force, but match statement usage, so nice

[[ecumene/advent_of_code]](https://github.com/ecumene/advent_of_code/blob/main/2022/notebooks/day2.ipynb) python notebook

> a little bit of ai generated art of a man tending to a garden integrated into the notebook, we love to see it
>
> brute force, but spread over many compact cells
>
> even a summary at the end, very introspective

---

if you want to have your repo added for me to make a note of / talk about here (or have you repo removed), reach out:

email -> `me@jackharrhy.com`

discord -> `<i>jack arthur null</i>#7539`
