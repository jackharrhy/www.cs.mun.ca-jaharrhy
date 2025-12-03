export const pad = (num, amount = 2) => String(num).padStart(amount, "0");

const riley = {
  display: "nint8835/advent-of-code",
  link: "https://github.com/nint8835/advent-of-code/tree/main/2025",
  days: [1, 2, 3],
  dayLinkFunc: (day) =>
    `https://github.com/nint8835/advent-of-code/blob/main/2025/${pad(
      day
    )}/Day${day}.fs`,
  language: "f#",
};

const mudkip = {
  display: "Mudkip/AdventOfCode",
  link: "https://github.com/Mudkip/AdventOfCode/",
  days: [1, 2, 3],
  dayLinkFunc: (day) =>
    `https://github.com/Mudkip/AdventOfCode/blob/main/2025/day${pad(
      day
    )}/${day}.exs`,
  language: "elixir",
};

const ethan = {
  display: "mynameisgump/advent-of-code",
  link: "https://github.com/mynameisgump/advent-of-code/tree/main/2025",
  days: [1],
  dayLinkFunc: (day) =>
    `https://github.com/mynameisgump/advent-of-code/tree/main/2025/${pad(
      day
    )}.py`,
  language: "python",
};

const sven = {
  display: "STollenaar/AdventOfCode",
  link: "https://github.com/STollenaar/AdventOfCode/",
  days: [1, 2, 3],
  dayLinkFunc: (day) => {
    if (day === 3) {
      return "https://github.com/STollenaar/AdventOfCode/blob/main/2025/day3/Day3.java";
    }
    return `https://github.com/STollenaar/AdventOfCode/blob/main/2025/day${day}/main.py`;
  },
  language: "go & java",
};

const evan = {
  display: "evaan/AdventOfCode",
  link: "https://github.com/evaan/AdventOfCode/blob/main/2025/",
  days: [1, 2, 3],
  dayLinkFunc: (day) =>
    `https://github.com/evaan/AdventOfCode/blob/main/2025/${day}/Day${day}.py`,
  language: "python",
};

const djrideout = {
  display: "djrideout/advent2025",
  link: "https://github.com/djrideout/advent2025",
  days: [1, 2, 3],
  dayLinkFunc: (day) =>
    `https://github.com/djrideout/advent2025/blob/main/src/day${day}.rs`,
  language: "rust",
};

const natalie = {
  display: "ncashin/aoc2025",
  link: "https://github.com/ncashin/Advent-Of-Code",
  days: [1],
  dayLinkFunc: (day) => {
    if (day === 1) {
      return "https://github.com/ncashin/Advent-Of-Code/blob/main/2025/day1.rb";
    }
    return `https://github.com/ncashin/Advent-Of-Code/blob/main/2025/day${day}.exs`;
  },
  language: "elixir",
};

const keenan = {
  display: "Keenan-Nicholson/AdventOfCode",
  link: "https://github.com/Keenan-Nicholson/AdventOfCode/tree/main/2025",
  days: [1, 2],
  dayLinkFunc: (day) =>
    `https://github.com/Keenan-Nicholson/AdventOfCode/blob/main/2025/Day${day}/day${day}.py`,
  language: "python",
};

/*
const marty = {
  display: "mwln/aoc",
  link: "https://github.com/mwln/aoc/blob/main/2025/",
  dayLinkFunc: (day) =>
    `https://github.com/mwln/aoc/blob/main/2024/${day}-2.lua`,
  days: [],
};
*/

const alex = {
  display: "terales/aoc-elixir",
  link: "https://github.com/terales/aoc-elixir/tree/main/2025",
  days: [1, 2, 3],
  dayLinkFunc: (day) =>
    `https://github.com/terales/aoc-elixir/blob/main/2025/d${day}/solution.exs`,
  language: "elixir",
};

const oscar = {
  display: "OscarFKE/aoc2025",
  link: "https://github.com/OscarFKE/aoc2025",
  days: [1, 2, 3],
  dayLinkFunc: (day) => {
    const dayStr = day.toString().padStart(2, "0");
    return `https://github.com/OscarFKE/aoc2025/blob/main/days/${dayStr}.janet`;
  },
  language: "janet",
};

const ripu = {
  display: "singhripudaman/AOC_2025",
  link: "https://github.com/singhripudaman/AOC_2025",
  days: [3],
  dayLinkFunc: (day) =>
    `https://github.com/singhripudaman/AOC_2025/blob/main/day_${day}/solution.py`,
  language: "python",
};

const hking = {
  display: "hamzahap/AdventOfCode2025",
  link: "https://github.com/hamzahap/AdventOfCode2025",
  days: [3],
  dayLinkFunc: (day) =>
    `https://github.com/hamzahap/AdventOfCode2025/blob/main/Day${day}/day${day}.py`,
  language: "python",
};

export const people = {
  mudkip,
  keenan,
  ethan,
  sven,
  djrideout,
  natalie,
  riley,
  evan,
  alex,
  oscar,
  ripu,
  hking,
};
