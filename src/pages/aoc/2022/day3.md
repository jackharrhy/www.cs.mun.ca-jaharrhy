---
layout: "@layouts/AdventOfCodeLayoutDay.astro"
title: day 3
pubDate: 2022-12-02
---

3rd night in a row up until 1:30am .-.

why do i make these choices

oh well this one was nice, got to pull out more functional programming goodies today,
and found reviewing others submissions a little more engaging than previous days, hopefully that continues!

---

<details>
<summary>click to view my solution</summary>

<br />

given the sample input:

```
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

assuming `input` is the above as one big string,

```elixir
rucksacks =
  input
  |> String.split("\n", trim: true)
  |> Enum.map(&String.split(&1, "", trim: true))
```

a pretty simple input parse today, just split on newlines, and then split each string into a list of characters

```
[
  ["v", "J", "r", "w", "p", "W", "t", "w", "J", "g", "W", "r", "h", "c", "s", "F", "M", "M", "f",
   "F", "F", "h", "F", "p"],
  ["j", "q", "H", "R", "N", "q", "R", "j", "q", "z", "j", "G", "D", "L", "G", "L", "r", "s", "F",
   "M", "f", "F", "Z", "S", "r", "L", "r", "F", "Z", "s", "S", "L"],
  ["P", "m", "m", "d", "z", "q", "P", "r", "V", "v", "P", "w", "w", "T", "W", "B", "w", "g"],
  ["w", "M", "q", "v", "L", "M", "Z", "H", "h", "H", "M", "v", "w", "L", "H", "j", "b", "v", "c",
   "j", "n", "n", "S", "B", "n", "v", "T", "Q", "F", "n"],
  ["t", "t", "g", "J", "t", "R", "G", "J", "Q", "c", "t", "T", "Z", "t", "Z", "T"],
  ["C", "r", "Z", "s", "J", "s", "P", "P", "Z", "s", "G", "z", "w", "w", "s", "L", "w", "L", "m",
   "p", "w", "M", "D", "w"]
]
```

another day, another list of lists

```elixir
defmodule Rucksack do
  def item_to_priority(item) do
    item |> String.to_charlist() |> Enum.at(0) |> item_number_to_priority
  end

  def item_number_to_priority(number) when number >= 97, do: number - 96
  def item_number_to_priority(number), do: number - 38
end
```

once we find the duplicate item in the rucksack(s), we'll need to map that to some priority number

here, i go from string -> charlist -> single char, and then use some sneaky guard clauses to do
math on the single char value which maps it from its value in ascii, to the priority number

### part 1

```elixir
rucksacks
|> Enum.map(fn rucksack ->
  rucksack
  |> Enum.split(round(length(rucksack) / 2))
  |> Tuple.to_list()
  |> Enum.map(&MapSet.new(&1))
  |> Enum.reduce(&MapSet.intersection(&1, &2))
  |> Enum.at(0)
  |> Rugsack.item_to_priority()
end)
|> Enum.sum() # -> 157
```

i do a lot here

first, i want to map over each rucksack, since for part one we are concerned about splitting
up a rucksack into two chunks, and finding a duplicate between each chunk

i use `Enum.split` to split the rucksack into two chunks, which gives me a tuple, so i use
`Tuple.to_list()` to turn it back into a list i can iterate over

i then, convert each list into a `MapSet`, since i want to perform a [[set operation]](https://en.wikipedia.org/wiki/Set_(mathematics)#Basic_operations) to find the duplicate

i then reduce my list of two items down to _one_, using a reducer that passes its values to `MapSet.intersection`, which will end up only reducing once, since the first item will be the accumulator, and the second item will be the only other value the reducer handles

after this operation i am left with a single `MapSet`, with only a single value within it, the duplicate

i use `Enum.at(0)` to pluck out the single item from the `MapSet`, passing it to my utility function to convert from item -> priority number

i do this for every rucksack, and compute the sum of the list of priorities

### part 2

```elixir
rucksacks
|> Enum.chunk_every(3)
|> Enum.map(fn rucksacks ->
  rucksacks
  |> Enum.map(&MapSet.new(&1))
  |> Enum.reduce(&MapSet.intersection(&1, &2))
  |> Enum.at(0)
  |> Rugsack.item_to_priority()
end)
|> Enum.sum() # -> 70
```

this is _similar_ to the above, however, i use `Enum.chunk_every(3)` to convert
my list of rucksacks into a list of lists of rucksacks, each nested list having
a length of 3

i iterate over this list of lists, and convert each rucksack in the list of 3
to a `MapSet`, like before, but since i'm not splitting it into two, i use
`Enum.reduce` with `MapSet.intersection` again, but this time i'm reducing 3 `MapSet`s to a single `MapSet`

then, i do the same as before, pluck out the answer, get the priority, and sum everything, ezdubz

<br />

</details>

---

### others

[[Mudkip/AdventOfCode]](https://github.com/Mudkip/AdventOfCode/blob/main/2022/day3/3.py) python

> a nice and compact solution
>
> ```py
> def part1():
>     input = open("3.in", "r").read().splitlines()
>     rucksacks = ((set(list(x[:len(x)//2])), set(list(x[len(x)//2:]))) for x in input)
>     prios = (ord((rucksack[0] & rucksack[1]).pop())-96 for rucksack in rucksacks)
>     normalize = (prio if prio > 0 else prio+58 for prio in prios)
>     return sum(normalize)
> 
> def part2():
>     input = open("3.in", "r").read().splitlines()
>     groups = [input[i:i+3] for i in range(0,len(input), 3)]
>     badges = [(set(group[0]) & set(group[1]) & set(group[2])) for group in groups]
>     prios = (ord(badge.pop())-96 for badge in badges)
>     normalize = (prio if prio > 0 else prio+58 for prio in prios)
>     return sum(normalize)
> ```
>
> so nice and compact i can comfortably include it inline within this page without it filling up much space
>
> a bit code golfy, but sometimes thats **the _vibe_**

[[krbarter/Advent-Of-Code-2022]](https://github.com/krbarter/Advent-Of-Code-2022/blob/main/Day3/day3.py) python

> some set operations, and being sneaky using a string to map the resulting duplicate to the value
>
> part 2 is heading into code golf territories, but i usually feel that whenever i see a complicated list comprehension statement that i haven't authored :)

[[nint8835/AdventOfCode2022]](https://github.com/nint8835/AdventOfCode2022/blob/main/Day3/Day3.fsx) f#

> feelin' a lot like my solution with regards to the mapping / usage of set intersections
>
> however the same string map trick kent used, is also used here, nice and compact!
>
> i prefer this implementation of the string map because i am a functional programming fiend

[[hamzahap/AdventOfCode2022]](https://docs.google.com/spreadsheets/d/1FV8KutkeZDnm8LlvTgG7Rb1NuVNWjU1JIc1fMJS6wBg/edit?usp=sharing) sheets

> opening up this sheet on my laptop makes it unhappy and loud initially
>
> but hamzah is out here still on that sheets grind
>
> however,
>
> > [3:38 AM] Hking: Motivation to stop doing Sheets is very high rn
>
> this statement from a _very up late_ hamzah might indicate the end of the sheets reign?
>
> time will tell

[[TheCrypticCanadian/advent-of-code-2022]](https://github.com/TheCrypticCanadian/advent-of-code-2022/tree/main/3) python

> input parsing looks to be more than whats needed, but still using set operations, so _clean_

[[STollenaar/AdventOfCode2022]](https://github.com/STollenaar/AdventOfCode2022/blob/main/cmd/day3/main.go) golang

> it seems sven have the same realization as myself and mudkip, but
>
> > [12:30 PM] Secure Cluster Nerd 5000: yuup I thought the same. but with GO there isn't really a nice quick buildin way to do that
>
> therefore his solution _looks_ like the solution of someone who has sets in their head, but not actually using sets
>
> its still compact so  _nice_

[[zcvaters/adventofcode2022]](https://github.com/zcvaters/adventofcode2022/blob/main/day03/day03.swift) swift

> zach had a pretty gnarly function to go from rucksack item -> priority, but by the time i am writing this, its much cleaner :)
>
> swift has sets!, which are being used here, although using [[intersection]](https://developer.apple.com/documentation/swift/set/intersection(_:)-1zh8f) would be cleaner imo

[[chadmroberts88/advent-of-code-2022]](https://github.com/chadmroberts88/advent-of-code-2022/blob/main/src/day3/solutions.ts) typescript

> clean little ts solution, _almost_ functional if that `forEach` usage could be a `reduce` instead :)

[[mathieuboudreau/advent]](https://github.com/mathieuboudreau/advent/tree/main/day-03) python notebook

> `set` and `ord`, the python tricks that make this solution clean
>
> but _whats this_, `&` usage to do intersections on the sets!
>
> now thats mathy

[[Keenan-Nicholson/AdventOfCode]](https://github.com/Keenan-Nicholson/AdventOfCode/blob/main/2022/day3/day3.ts) typescript

> > [12:31 PM] keeborg: As a mathematician I’m disappointed my first thought was not set intersection
>
> keenans solution does not use sets, and he's sad it doesn't use sets
>
> i still think its nice though <3

[[CameronSquires/AdventOfCode2022]](https://github.com/CameronSquires/AdventOfCode2022/blob/main/Day3.py) python

> a bitta [[indent hadouken]](https://old.reddit.com/r/ProgrammerHumor/comments/27yykv/indent_hadouken/) going on here

[[joel1842/advent-of-code-2022]](https://github.com/joel1842/advent-of-code-2022/blob/main/day3/day3.py) python

> joel keeps up the list comprehension grind yet again

[[ecumene/advent_of_code]](https://github.com/ecumene/advent_of_code/blob/main/2022/notebooks/day3.ipynb) python notebook

> mitch out here managing to be the first person on the muncs leaderboard to complete both part 1 nand 2, _nice_
>
> he has also blessed us with another ai image:
>
> > <img class="small-image" src="https://raw.githubusercontent.com/ecumene/advent_of_code/1b901efb90ef9647a6e8c0feda84f307ea091cd8/2022/notebooks/images/day3.jpeg" />
> >
> > prompt: an elf filling bags with supplies for a journey into the jungle
>
> **thank you mitchell, very cool**

[[canetoads.ca/day2.js.html]](https://canetoads.ca/day3.js.html) javascript

> interesting, constructing a map from item -> priority programmatically
>
> mixing arrow functions and full fat functions inline, tsk tsk
>
> but its still nice and compact, and set-intersectiony, so nice

[[apreynolds1989/AdventOfCode2022]](https://github.com/apreynolds1989/AdventOfCode2022/blob/main/src/Day3/index.ts) typescript

> another day that is so close to being functional! make those `forEach` statements reducers!
>
> a nice solution though, and catches the strict of char code conversion depending on if upper or lower case

[[lilmert/aoc]](https://github.com/lilmert/aoc/blob/main/src/years/y22/d3.rs)

> marty's aoc utils are :clean:
>
> rfind on the `ALPHABET` is :clean:
>
> 

[[RyanBrushett/adventofcode2022]](https://github.com/RyanBrushett/adventofcode2022/tree/main/day3)

> its ruby so im biased for the third day in the row, that this is _clean_
>
> i keep using the word clean quite a bit
>
> probably the neatest solution that prepares a priority map beforehand
>
> ```ruby
> letters = ('a'..'z').to_a.concat(('A'..'Z').to_a)
> priorities = letters.each_with_object({}).with_index do |(letter, hash), index|
>    hash[letter] = index + 1
> end
> ```
>
> _and_ uses `&` for set operations
>
> **_nice_**

[[ajhynes7/advent-of-code-2022]](https://github.com/ajhynes7/advent-of-code-2022/blob/main/days/03.jl)

> julia and ruby are def. the nicest here to skim through, probably because syntactically its similar to my own solution :)
>
> a _top level_ `intersect` function, interesting
>
> i like the top level `first` function usage too
>
> im gonna say it
>
> clean

---

if you want to have your repo added for me to make a note of / talk about here (or have you repo removed), reach out:

email -> `me@jackharrhy.com`

discord -> `<i>jack arthur null</i>#7539`
