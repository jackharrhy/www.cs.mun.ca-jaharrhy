export const pad = (num, amount = 2) => String(num).padStart(amount, "0");

const riley = {
  display: "nint8835/advent-of-code",
  link: "https://github.com/nint8835/advent-of-code",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  dayLinkFunc: (day) =>
    `https://github.com/nint8835/advent-of-code/blob/main/2023/${pad(
      day
    )}/Day${day}.fsx`,
  language: "f#",
};

const mudkip = {
  display: "Mudkip/AdventOfCode",
  link: "https://github.com/Mudkip/AdventOfCode/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  dayLinkFunc: (day) =>
    `https://github.com/Mudkip/AdventOfCode/blob/main/2023/day${pad(
      day
    )}/${day}.py`,
  language: "python",
};

const daniel = {
  display: "DanielPower/AdventOfCode",
  link: "https://github.com/DanielPower/AdventOfCode/2023",
  days: [1, 2, 3, 4, 5, 6],
  dayLinkFunc: (day) =>
    `https://github.com/DanielPower/AdventOfCode/tree/main/2023/typescript/${pad(
      day
    )}`,
  language: "typescript",
};

const mitch = {
  display: "ecumene/advent_of_code",
  link: "https://github.com/ecumene/advent_of_code/tree/main/2023/",
  days: [1, 2, 3, 4],
  dayLinkFunc: (day) =>
    `https://github.com/ecumene/advent_of_code/blob/main/2023/src/day${pad(
      day
    )}.rs`,
  language: "rust",
};

const ethan = {
  display: "mynameisgump/advent-of-code",
  link: "https://github.com/mynameisgump/advent-of-code/tree/main/2023",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  dayLinkFunc: (day) =>
    `https://github.com/mynameisgump/advent-of-code/tree/main/2023/${pad(day)}`,
  language: "python",
};

const sven = {
  display: "STollenaar/AdventOfCode",
  link: "https://github.com/STollenaar/AdventOfCode/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  dayLinkFunc: (day) =>
    `https://github.com/STollenaar/AdventOfCode/blob/main/2023/day${day}/main.go`,
  language: "golang",
};

const ryan = {
  display: "RyanBrushett/adventofcode2023",
  link: "https://github.com/RyanBrushett/adventofcode2023",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/RyanBrushett/adventofcode2023/tree/main/day${day}`,
  language: "ruby",
};

const ethanDenny = {
  display: "EthanDenny/advent-of-code-2023",
  link: "https://github.com/EthanDenny/advent-of-code-2023",
  days: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11],
  dayLinkFunc: (day) =>
    `https://github.com/EthanDenny/advent-of-code-2023/blob/main/src/day${day}.rs`,
  language: "rust",
};

const marty = {
  display: "mwln/aoc",
  link: "https://github.com/mwln/aoc/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  dayLinkFunc: (day) => "https://github.com/mwln/aoc/blob/main/2023/",
  language: "lua",
};

const tim = {
  display: "MitMaro/advent-of-code-2023",
  link: "https://github.com/MitMaro/advent-of-code-2023/",
  days: [1, 2, 3, 4],
  dayLinkFunc: (day) =>
    `https://github.com/MitMaro/advent-of-code-2023/blob/master/src/day${day}.rs`,
  language: "rust",
};

const shawn = {
  display: "shawnchendev/aoc-2023",
  link: "https://github.com/shawnchendev/aoc-2023/",
  days: [1, 2, 3, 4, 5],
  dayLinkFunc: (day) =>
    `https://github.com/shawnchendev/aoc-2023/blob/main/day${day}/src/main.rs`,
  language: "rust",
};

export const people = {
  riley,
  mudkip,
  daniel,
  mitch,
  ethan,
  sven,
  ryan,
  ethanDenny,
  marty,
  tim,
  shawn,
};
