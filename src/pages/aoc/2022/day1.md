---
layout: "@layouts/AdventOfCodeLayoutDay.astro"
title: day 1
pubDate: 2022-12-02
---

_note: i wrote this on the evening of day 2, so this is a day-after retrospective_

another year, another advent of code!

as expected, day 1 is very approachable, with more story preamble than problem definition (since there isn't much to even explain)

my plan this year is to rehash the same set of tools i picked last year, [[Elixir]](https://elixir-lang.org/), being written within an instance of [[Livebook]](https://livebook.dev/) running on my personal DigitalOcean server

---

<details>
<summary>click to view my solution</summary>

<br />

given the sample input:

```
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```

assuming `input` is the above as one big string,

```elixir
input =
  input
  |> String.trim()
  |> String.split("\n\n")
  |> Enum.map(fn elf ->
    elf |> String.split("\n") |> Enum.map(&String.to_integer/1)
  end)
```

split the string on `\n\n`, causing each group to be its own chunk,
and since that chunk is still a compact string, split it again by `\n`, and map
each value to an integer

```elixir
[
    [1000, 2000, 3000],
    [4000],
    [5000, 6000],
    [7000, 8000, 9000],
    [10000]
]
```

this leaves us with the following list of lists

```elixir
elfs = input |> Enum.map(&Enum.sum/1) |> Enum.sort(&(&1 >= &2))
```

i then sum each list within this list of lists, and sort this new list of just sums in descending order

```elixir
[24000, 11000, 10000, 6000, 4000]
```

which leaves me with this list

### part 1

```elixir
Enum.at(elfs, 0) # -> 24000
```

plucking the first element of this list gives me the elf with the most calories

### part 2

```elixir
elfs |> Enum.take(3) |> Enum.sum() # -> 45000
```

and, plucking the top 3, and then summing this list of 3 items, give us the combined calories

the full solution can be found [[here]](https://github.com/jackharrhy/advent2022/blob/main/day1.livemd)

<br />

</details>

---

this year i have _quite_ a few places that are all actively taking part in advent of code:

[[MUN Computer Science Society]](https://muncompsci.ca/) discord, specifically in the channels prefixed with `#aoc-...`

[[CTSNL]](https://ctsnl.ca/) slack, in threads posted in `#general`

[[NDev]](https://www.meetup.com/ndevmeetup/) slack, in `#advent-of-code`

[[Get Coding]](https://www.getcoding.ca/)'s private slack, in `#general`

most of these have their own leaderboard, and due to staying up until 1:30am to solve the problem, i managed to snag first on ctsnl & ndev, but due to the muncs leaderboard being filled with late night tryhards, even though i took less than 10 minutes to solve, I was 4/5th on that leaderboard

i know placement means nothing, and that sacrificing sleep isn't worthwhile, i just find the first few days of Advent of Code when:

- more people are taking part, since its more approachable, and people will fall off quickly over the next few days

- the problems can be solved before 2am, so _some_ sleep is acquired

---

### others

while this is my ramblings, i'm thinking i can also use this place to advertise other peoples solutions to advent of code problems

this list will quickly become a lot less long as people drop off, but it'll give me more chance to dig into the specifics of each persons solution as the days progress and become more complex, because at the moment most solutions look _quite_ similar

[[Mudkip/AdventOfCode]](https://github.com/Mudkip/AdventOfCode/blob/main/2022/day01/1.py) python

> mudkip killed in on the muncs leaderboard, managing to snag #1, even though beforehand they mentioned they weren't planning on taking part on aoc this year, and not staying up late, tsk tsk!
>
> also, not going with php this year, safe choice for someone who seems to care less about doing it in an interesting way this year

[[maegpi-nl/advent_of_code]](https://github.com/maegpi-nl/advent_of_code) ???

> i think mat managed to get this problem done, but the repository is bare as of authoring this page...
>
> i hope to see some common lisp in this repository in time ;)

[[briannamcdonald/advent-of-code-2022]](https://github.com/briannamcdonald/advent-of-code-2022/tree/main/day01) python

> brianna also did well on the leaderboard, i believe inbetween myself and mudkip

[[krbarter/Advent-Of-Code-2022]](https://github.com/krbarter/Advent-Of-Code-2022/blob/main/Day1/day1.py) python

> kent out here

[[nint8835/AdventOfCode2022]](https://github.com/nint8835/AdventOfCode2022/blob/main/Day1/Day1.fsx) f#

> riley going in with the F# again this year! nice to have another functional friend :)

[[hamzahap/AdventOfCode2022]](https://github.com/hamzahap/AdventOfCode2022/blob/main/Day%201/AoC22Day1.xlsx) excel

> hamzah pls
>
> amazing though, seeing excel solutions is always fun
>
> curious how long this lasts until you fallback to, well, a _programming_ language :)

[[TheCrypticCanadian/advent-of-code-2022]](https://github.com/TheCrypticCanadian/advent-of-code-2022/tree/main/1) blob of python

> there is a jupyter notebook file here, and two .py files
>
> gump whats going on here
>
> great job though, keep it up <3

[[STollenaar/AdventOfCode2022]](https://github.com/STollenaar/AdventOfCode2022/blob/main/cmd/day1/main.go) golang

> its sven, so of course its go
>
> split up into nice little packages, with some shared utils
>
> using a struct to hold the inventories too, webscale

[[DanielPower/AdventOfCode2022]](https://github.com/DanielPower/AdventOfCode2022/blob/master/src/Day1.hs) haskell

> dan back again with the haskell this year, functional gang unite
>
> similar in concept to my solution it seems, just done using a larger more mathematical brain than i have

[[emilydormody/advent-of-code]](https://github.com/emilydormody/advent-of-code) ...

> there is a repo here, but like mats, as of the writing of this, there is no code here
>
> actually even mats has a readme, this is proper empty!
>
> but emily did get this problem done according to the leaderboard! good job

[[ecumene/advent_of_code]](https://github.com/ecumene/advent_of_code/blob/main/2022/notebooks/day1.ipynb) python notebook

> mitch going ham with utilities that fetch problem input directly from the site, and even submit answers to the site from the code, _neat_

[[zcvaters/adventofcode2022]](https://github.com/zcvaters/adventofcode2022/blob/main/day01/day01.swift) swift

> swift! neat
>
> type definitions here look funky, it feels familiar in some ways, but also foreign in others

[[chadmroberts88/advent-of-code-2022]](https://github.com/chadmroberts88/advent-of-code-2022/blob/main/src/day1/solutions.ts) typescript

> nice lil input parsing, and great usage of condensing previous problem into something reusable for the second

[[devthedevel/advent_of_code]](https://github.com/devthedevel/advent_of_code/blob/master/2022/1/index.ts) typescript

> dev has blessed us with some code from the clouds
>
> although i am curious why each function in this solution is an async function
>
> however, i will not dare question the clouds

[[mathieuboudreau/advent]](https://github.com/mathieuboudreau/advent/tree/main/day-01) python notebook

> clean lil notebook, with a link to open in [[binder]](https://mybinder.org/), which is the first i have heard of it, looks cool

[[SteveParson/AOC2022]](https://github.com/SteveParson/AOC2022) c

> keeping it real, steve is, with a bit of low level c
>
> > [12:46 AM] Степан111: Shame that C doesn’t have a built in sort method
>
> \- steve

[[ajhynes7/advent-of-code-2022]](https://github.com/ajhynes7/advent-of-code-2022/blob/main/days/01.jl) julia

> cute little julia solution, i find julia is always nice to look at

[[ericthomasca/adventofcode2022]](https://github.com/ericthomasca/adventofcode2022/blob/main/day01/src/main.rs) rust

> pretty decent rust solution, more unwraps than one would hope to see, but being here to solve problems = unwraps being welcome <3

[[Keenan-Nicholson/AdventOfCode]](https://github.com/Keenan-Nicholson/AdventOfCode/blob/main/2022/day1/day1.ts) typescript

> this solution was almost _javascript_, but thankfully i sat down with sir keenan and sorted him out for this to be written in typescript, and future problems to _stay_ typescript
>
> i'm biased with this one since during the typescriptification, i also helped refactor it slightly :)

[[CameronSquires/AdventOfCode2022]](https://github.com/CameronSquires/AdventOfCode2022/blob/main/Day1.py) python

> pretty compact, clever usage to keep getting the `max` from a list and removing that item from the list!

[[RyanBrushett/adventofcode2022]](https://github.com/RyanBrushett/adventofcode2022/tree/main/day1) ruby

> my advent of code 2019/2020 solutions were done in crystal, so its nice see a ruby solution
>
> input parsing is clean, and using the inline postfix `if` is clean
>
> ruby is just clean in my mind, i will admit, i am biased

[[joel1842/advent-of-code-2022]](https://github.com/joel1842/advent-of-code-2022/blob/main/day1/day1.py) python

> joel out here gold golfin' with the bulk of the logic in a one liner!
