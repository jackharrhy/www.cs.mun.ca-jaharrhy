export const pad = (num, amount = 2) => String(num).padStart(amount, "0");

const dayToName = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
};

const riley = {
  display: "nint8835/advent-of-code",
  link: "https://github.com/nint8835/advent-of-code/tree/main/2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/nint8835/advent-of-code/blob/main/2024/${pad(
      day
    )}/Day${day}.fsx`,
  language: "f#",
};

const mudkip = {
  display: "Mudkip/AdventOfCode",
  link: "https://github.com/Mudkip/AdventOfCode/",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/Mudkip/AdventOfCode/blob/main/2024/day${pad(
      day
    )}/${day}.exs`,
  language: "elixir",
};

const daniel = {
  display: "DanielPower/AdventOfCode",
  link: "https://github.com/DanielPower/AdventOfCode/2023",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/DanielPower/AdventOfCode/tree/main/2024/rust/${pad(
      day
    )}`,
  language: "rust",
};

const ethan = {
  display: "mynameisgump/advent-of-code",
  link: "https://github.com/mynameisgump/advent-of-code/tree/main/2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/mynameisgump/advent-of-code/tree/main/2024/${pad(day)}`,
  language: "python",
};

const sven = {
  display: "STollenaar/AdventOfCode",
  link: "https://github.com/STollenaar/AdventOfCode/",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/STollenaar/AdventOfCode/blob/main/2024/day${day}/main.go`,
  language: "golang",
};

const arafat = {
  display: "M-ArafatZaman/advent-of-code-2024",
  link: "https://github.com/M-ArafatZaman/advent-of-code-2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/M-ArafatZaman/advent-of-code-2024/blob/main/${day}/sol.go`,
  language: "golang",
};

const evan = {
  display: "evaan/AdventOfCode",
  link: "https://github.com/evaan/AdventOfCode/blob/main/2024/",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/evaan/AdventOfCode/blob/main/2024/${day}/main.go`,
  language: "golang",
};

const eric = {
  display: "ericthomasca/adventofcode2024",
  link: "https://github.com/ericthomasca/adventofcode2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/ericthomasca/adventofcode2024/blob/main/day${pad(
      day
    )}/solution.go`,
  language: "golang",
};

const djrideout = {
  display: "djrideout/advent2024",
  link: "https://github.com/djrideout/advent2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/djrideout/advent2024/blob/main/src/day${day}.rs`,
  language: "rust",
};

const zachVaters = {
  display: "zcvaters/adventofcode2024",
  link: "https://github.com/zcvaters/adventofcode2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/zcvaters/adventofcode2024/blob/main/adventofcode2024/day${pad(
      day
    )}/day${pad(day)}.swift`,
  language: "swift",
};

const natalie = {
  display: "ncashin/aoc2024",
  link: "https://github.com/ncashin/aoc2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/ncashin/aoc2024/blob/main/day${day}/day${day}.exs`,
  language: "elixir",
};

const josh = {
  display: "ranguli/advent-of-code",
  link: "https://github.com/ranguli/advent-of-code/tree/main/2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/ranguli/advent-of-code/blob/main/2024/${pad(
      day
    )}/Day${day}.cpp`,
  language: "cpp",
};

const shevinu = {
  display: "ShevinuM/Advent-of-Code-2024",
  link: "https://github.com/ShevinuM/Advent-of-Code-2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/ShevinuM/Advent-of-Code-2024/blob/main/Day${day}/Day${day}.go`,
  language: "golang",
};

const brianna = {
  display: "briannamcdonald/advent-of-code-2024",
  link: "https://github.com/briannamcdonald/advent-of-code-2024/",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/briannamcdonald/advent-of-code-2024/blob/main/day${pad(
      day
    )}`,
  language: "python",
};

const neiro = {
  display: "omega7379/Advent-of-Code",
  link: "https://github.com/omega7379/Advent-of-Code/tree/2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/omega7379/Advent-of-Code/tree/2024/day${day}`,
  language: "python",
};

const gravyBoat = {
  display: "ThatGravyBoat/Advent-of-Code-2024",
  link: "https://github.com/ThatGravyBoat/Advent-of-Code-2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/ThatGravyBoat/Advent-of-Code-2024/blob/main/src/days/${dayToName[day]}/mod.rs`,
  language: "rust",
};

const keenan = {
  display: "Keenan-Nicholson/AdventOfCode",
  link: "https://github.com/Keenan-Nicholson/AdventOfCode/tree/main/2024",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/Keenan-Nicholson/AdventOfCode/blob/main/2024/day${day}.go`,
  language: "golang",
};

const hamzahBaseUrl = "https://docs.google.com/spreadsheets/d/1gBxJZyg7Yz0zTW_zDOyB4UesNy0lJXY7bri7TJyEqnk/";

const hamzahSheets = {
  1: `${hamzahBaseUrl}/edit?gid=0`,
  2: `${hamzahBaseUrl}/edit?gid=704506467`,
  3: `${hamzahBaseUrl}/edit?gid=893505817`,
};

const hamzah = {
  display: "hkings google sheets",
  link: hamzahBaseUrl,
  days: [1, 2, 3],
  language: "sheets",
  dayLinkFunc: (day) => hamzahSheets[day],
};

const grey = {
  display: "GreyGrisGrey",
  link: "https://github.com/GreyGrisGrey/aoc2024day2",
  days: [2, 3],
  language: "python",
  dayLinkFunc: (day) =>
    `https://github.com/GreyGrisGrey/aoc2024day2/blob/main/day${day}.py`,
};

const alex = {
  display: "terales/advent-of-code",
  link: "https://github.com/terales/advent-of-code/",
  days: [1, 2, 3],
  language: "python",
  dayLinkFunc: (day) =>
    `https://github.com/terales/advent-of-code/blob/main/2024-${pad(day)}-2.py`,
};

export const people = {
  daniel,
  mudkip,
  keenan,
  natalie,
  ethan,
  arafat,
  sven,
  gravyBoat,
  hamzah,
  djrideout,
  grey,
  riley,
  josh,
  brianna,
  neiro,
  alex,
  zachVaters,
  evan,
  eric,
  shevinu,
};
