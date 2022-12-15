export const pad = (num, amount = 2) => String(num).padStart(amount, "0");

const eric = {
  display: "ericthomasca/adventofcode2022",
  link: "https://github.com/ericthomasca/adventofcode2022/",
  days: [1, 2, 3, 4],
  dayLinkFunc: (day) =>
    `https://github.com/ericthomasca/adventofcode2022/blob/main/day${pad(
      day
    )}/src/main.rs`,
  language: "rust",
};

const riley = {
  display: "nint8835/AdventOfCode2022",
  link: "https://github.com/nint8835/AdventOfCode2022/",
  days: [1, 2, 3, 4, 5, 6, 7, 8],
  dayLinkFunc: (day) => {
    let prefix = "fsx";

    if (day >= 7) {
      prefix = "py";
    }

    return `https://github.com/nint8835/AdventOfCode2022/blob/main/Day${day}/Day${day}.${prefix}`;
  },
  language: "f# & python",
};

const mat = {
  display: "maegpi-nl/advent_of_code",
  days: [],
  link: "https://github.com/maegpi-nl/advent_of_code",
  dayLinkFunc: () => mat.link,
};

const mudkip = {
  display: "Mudkip/AdventOfCode",
  link: "https://github.com/Mudkip/AdventOfCode/",
  days: [1, 2, 3, 4, 5, 6],
  language: "python",
  dayLinkFunc: (day) =>
    `https://github.com/Mudkip/AdventOfCode/blob/main/2022/day${pad(
      day
    )}/${day}.py`,
};

const brianna = {
  display: "briannamcdonald/advent-of-code-2022",
  link: "https://github.com/briannamcdonald/advent-of-code-2022/",
  days: [1, 2, 3, 4, 5, 6, 7],
  language: "python",
  dayLinkFunc: (day) =>
    `https://github.com/briannamcdonald/advent-of-code-2022/tree/main/day${pad(
      day
    )}`,
};

const daniel = {
  display: "DanielPower/AdventOfCode2022",
  link: "https://github.com/DanielPower/AdventOfCode2022/",
  days: [1, 2, 3, 4, 5, 6],
  dayLinkFunc: (day) =>
    `https://github.com/DanielPower/AdventOfCode2022/blob/master/src/Day${day}.hs`,
  language: "haskell",
};

const emily = {
  display: "emilydormody/advent-of-code",
  link: "https://github.com/emilydormody/advent-of-code",
  days: [1, 2, 3, 4, 5, 6, 7],
  dayLinkFunc: (day) =>
    `https://github.com/emilydormody/advent-of-code/tree/main/day${day}`,
};

const mitch = {
  display: "ecumene/advent_of_code",
  link: "https://github.com/ecumene/advent_of_code/tree/main/2022/",
  days: [1, 2, 3, 4, 5, 6, 7],
  dayLinkFunc: (day) =>
    `https://github.com/ecumene/advent_of_code/blob/main/2022/notebooks/day${day}.ipynb`,
  language: "python notebook",
};

const zach = {
  display: "zcvaters/adventofcode2022",
  link: "https://github.com/zcvaters/adventofcode2022/",
  days: [1, 2, 3, 4, 5, 6],
  dayLinkFunc: (day) =>
    `https://github.com/zcvaters/adventofcode2022/blob/main/day${pad(
      day
    )}/day${pad(day)}.swift`,
  language: "swift",
};

const chad = {
  display: "chadmroberts88/advent-of-code-2022",
  link: "https://github.com/chadmroberts88/advent-of-code-2022/",
  days: [1, 2, 3, 4, 5, 6],
  dayLinkFunc: (day) =>
    `https://github.com/chadmroberts88/advent-of-code-2022/blob/main/src/day${day}/solutions.ts`,
  language: "typescript",
};

const steve = {
  display: "SteveParson/AOC2022",
  link: "https://github.com/SteveParson/AOC2022",
  days: [1, 2, 3, 4, 5],
  dayLinkFunc: () => steve.link,
  language: "c, python, & java",
};

const keenan = {
  display: "Keenan-Nicholson/AdventOfCode",
  link: "https://github.com/Keenan-Nicholson/AdventOfCode/",
  days: [1, 2, 3, 4, 6],
  dayLinkFunc: (day) =>
    `https://github.com/Keenan-Nicholson/AdventOfCode/blob/main/2022/day${day}/day${day}.ts`,
  language: "typescript",
};

const cameron = {
  display: "CameronSquires/AdventOfCode2022",
  link: "https://github.com/CameronSquires/AdventOfCode2022/",
  days: [1, 2, 3, 4],
  dayLinkFunc: (day) =>
    `https://github.com/CameronSquires/AdventOfCode2022/blob/main/Day${day}.py`,
  language: "python",
};

const scott = {
  display: "skanes17/Advent2022",
  link: "https://github.com/skanes17/Advent2022",
  dayLinkFunc: (day) =>
    `https://github.com/skanes17/Advent2022/tree/main/Advent2022/src/day${pad(
      day
    )}`,
  language: "javascript",
  days: [1, 2, 3, 4],
};

const sheldon = {
  display: "SheldonT/AdventOfCode2022",
  link: "https://github.com/SheldonT/AdventOfCode2022/",
  dayLinkFunc: (day) =>
    `https://github.com/SheldonT/AdventOfCode2022/tree/main/Day%2${pad(day)}`,
  language: "java",
  days: [1, 2, 3, 4, 5, 6],
};

const joel = {
  display: "joel1842/advent-of-code-2022",
  link: "https://github.com/joel1842/advent-of-code-2022/",
  days: [1, 2, 3, 4, 5, 6],
  dayLinkFunc: (day) =>
    `https://github.com/joel1842/advent-of-code-2022/blob/main/day${day}/day${day}.py`,
  language: "python",
};

const andrewReynolds = {
  display: "apreynolds1989/AdventOfCode2022",
  link: "https://github.com/apreynolds1989/AdventOfCode2022/",
  days: [1, 2, 3, 4, 5, 6],
  dayLinkFunc: (day) =>
    `https://github.com/apreynolds1989/AdventOfCode2022/blob/main/src/Day${day}/index.ts`,
  language: "typescript",
};

const davidSolutions =
  "https://github.com/davidtgillard/advent-of-code/blob/main/AdventOfCode/Solutions.fs";

const david = {
  display: "davidtgillard/advent-of-code",
  link: "https://github.com/davidtgillard/advent-of-code",
  language: "f#",
  dayLinkFunc: () => davidSolutions,
  days: [1, 2, 3, 4, 5, 6],
};

const alexis = {
  display: "github.com/acumpstone",
  link: "https://github.com/acumpstone/advent-of-code-2022/",
  language: "python",
  dayLinkFunc: (day) =>
    `https://github.com/acumpstone/advent-of-code-2022/tree/main/day${day}`,
  days: [1, 2, 3, 4],
};

const leah = {
  display: "leahmarg/Advent-of-Code-2022",
  link: "https://github.com/leahmarg/Advent-of-Code-2022",
  language: "python",
  dayLinkFunc: (day) =>
    `https://github.com/leahmarg/Advent-of-Code-2022/tree/main/Day%20${day}`,
  days: [1],
};

const paul = {
  display: "zapme/AoC2022",
  link: "https://github.com/zapme/AoC2022",
  language: "python",
  dayLinkFunc: () => paul.link,
  days: [1, 2, 3, 4, 5, 6, 7],
};

/* --- */

const kent = {
  display: "krbarter/Advent-Of-Code-2022",
  link: "https://github.com/krbarter/Advent-Of-Code-2022/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  dayLinkFunc: (day) =>
    `https://github.com/krbarter/Advent-Of-Code-2022/blob/main/${pad(day)}/`,
  language: "python",
};

const hamzahSheets = {
  1: "https://docs.google.com/spreadsheets/d/1ZR69KuO6MWHJGjoglgsRJs4t9Tm2CC874XAW3645LIk/edit?usp=sharing",
  2: "https://docs.google.com/spreadsheets/d/14X_347m2Yjt-7KavMA145m2vRu2luDlzrg73sLIsmOU/edit?usp=sharing",
  3: "https://docs.google.com/spreadsheets/d/1FV8KutkeZDnm8LlvTgG7Rb1NuVNWjU1JIc1fMJS6wBg/edit?usp=sharing",
  4: "https://docs.google.com/spreadsheets/d/1DrNkj8CXQdt0c1wrDx-_GY-QbFqmk4PDYVoNLu4ygrg/edit?usp=sharing",
  5: "https://docs.google.com/spreadsheets/d/1cm3eHcVdDfwCe8LzPNEG1P6JpGCirheEVzDTvuJaQCc/edit?usp=sharing",
  6: "https://docs.google.com/spreadsheets/d/1eyY1ODF3OrgybsZZT2201H-DXLkVoabTXw3ui-zvr8A/edit?usp=sharing",
  7: "https://docs.google.com/spreadsheets/d/1fz0lEYQE2z-NDzNiQt9brlnP_hU9sj-HlHs4gtDJNuY/edit?usp=sharing",
  8: "https://docs.google.com/spreadsheets/d/1ol0NmMJT3wx94ceK2uPYVawnq4y8Z8HWT_DC6z0jKgY/edit?usp=sharing",
  9: "https://docs.google.com/spreadsheets/d/124ybRKP8Hod49pjosdn1Ypah8sa1s1iZzvTOHVHzK-Y/edit?usp=sharing",
  10: "https://docs.google.com/spreadsheets/d/1MUIHjNgFfxucj-SRVnmdQ-NqZuhGmZkQl4LB4tFUuNU/edit?usp=sharing",
};

const hamzah = {
  display: "hamzahap/AdventOfCode2022",
  link: "https://github.com/hamzahap/AdventOfCode2022",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  language: "sheets",
  dayLinkFunc: (day) => hamzahSheets[day],
};

const ethan = {
  display: "TheCrypticCanadian/advent-of-code-2022",
  link: "https://github.com/TheCrypticCanadian/advent-of-code-2022/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  dayLinkFunc: (day) =>
    `https://github.com/TheCrypticCanadian/advent-of-code-2022/tree/main/${pad(
      day
    )}/day-${day}.ipynb`,
  language: "python",
};

const sven = {
  display: "STollenaar/AdventOfCode2022",
  link: "https://github.com/STollenaar/AdventOfCode2022/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  dayLinkFunc: (day) =>
    `https://github.com/STollenaar/AdventOfCode2022/blob/main/cmd/day${day}/main.go`,
  language: "golang",
};

const devin = {
  display: "devthedevel/advent_of_code",
  link: "https://github.com/devthedevel/advent_of_code/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  dayLinkFunc: (day) =>
    `https://github.com/devthedevel/advent_of_code/blob/master/2022/${day}/index.ts`,
  language: "typescript",
};

const mathieu = {
  display: "mathieuboudreau/advent",
  link: "https://github.com/mathieuboudreau/advent/",
  days: [1, 2, 3, 4, 5, 6, 7],
  dayLinkFunc: (day) =>
    `https://github.com/mathieuboudreau/advent/tree/main/day-${pad(day)}`,
  language: "python notebook",
};

const andrewHynes = {
  display: "ajhynes7/advent-of-code-2022",
  link: "https://github.com/ajhynes7/advent-of-code-2022/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  dayLinkFunc: (day) =>
    `https://github.com/ajhynes7/advent-of-code-2022/blob/main/days/${pad(
      day
    )}.jl`,
  language: "julia",
};

const ryan = {
  display: "RyanBrushett/adventofcode2022",
  link: "https://github.com/RyanBrushett/adventofcode2022/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  dayLinkFunc: (day) =>
    `https://github.com/RyanBrushett/adventofcode2022/tree/main/day${day}`,
  language: "ruby",
};

const nathan = {
  display: "canetoads.ca",
  link: "https://canetoads.ca/",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  dayLinkFunc: (day) => `https://canetoads.ca/day${day}.js.html`,
  language: "javascript",
};

const ethanDenny = {
  display: "EthanDenny/AdventOfCode2022",
  link: "https://github.com/EthanDenny/AdventOfCode2022",
  language: "c++",
  dayLinkFunc: (day) =>
    `https://github.com/EthanDenny/AdventOfCode2022/tree/main/day${day}`,
  days: [1, 2, 3, 4, 5, 6, 7, 9, 10],
};

const marty = {
  display: "lilmert/aoc",
  link: "https://github.com/lilmert/aoc/",
  language: "rust",
  dayLinkFunc: (day) =>
    `https://github.com/lilmert/aoc/blob/main/src/years/y22/d${day}.rs`,
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

const brandon = {
  display: "bjbemister19/AdventOfCode",
  link: "https://github.com/bjbemister19/AdventOfCode",
  language: "rust",
  dayLinkFunc: (day) =>
    `https://github.com/bjbemister19/AdventOfCode/blob/master/2022/day_${day}/src/main.rs`,
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

const mohammadArafatZaman = {
  display: "M-ArafatZaman/AdventOfCode",
  link: "https://github.com/M-ArafatZaman/AdventOfCode",
  dayLinkFunc: (day) =>
    `https://github.com/M-ArafatZaman/AdventOfCode/tree/main/day_${day}`,
  language: "python & c++",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};

const jeremy = {
  display: "jthetzel/aoc-2022",
  link: "https://github.com/jthetzel/aoc-2022",
  dayLinkFunc: () => jeremy.link,
  language: "python",
  days: [7, 8, 10],
};

const ben = {
  display: "MadMaritimer/adventOfCode2022",
  link: "https://github.com/MadMaritimer/adventOfCode2022",
  dayLinkFunc: (day) =>
    `https://github.com/MadMaritimer/adventOfCode2022/blob/master/src/day${day}.R`,
  language: "r",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

const robert = {
  display: "foggynight/advent-of-code",
  link: "https://github.com/foggynight/advent-of-code/tree/master/2022",
  dayLinkFunc: (day) =>
    `https://github.com/foggynight/advent-of-code/tree/master/2022/${pad(day)}`,
  language: "python",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};

const dayToDayWord = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  11: "Eleven",
  12: "Twelve",
  13: "Thirteen",
  14: "Fourteen",
  15: "Fifteen",
  16: "Sixteen",
  17: "Seventeen",
  18: "Eighteen",
  19: "Nineteen",
  20: "Twenty",
};

const brady = {
  display: "ThatGravyBoat/Advent-of-Code-2022",
  link: "https://github.com/ThatGravyBoat/Advent-of-Code-2022",
  dayLinkFunc: (day) =>
    `https://github.com/ThatGravyBoat/Advent-of-Code-2022/blob/master/src/main/java/tech/thatgravyboat/aoc/days/${dayToDayWord[day]}.java`,
  language: "java",
  days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};

export const people = {
  mudkip,
  mat,
  brianna,
  kent,
  riley,
  hamzah,
  ethan,
  sven,
  daniel,
  emily,
  mitch,
  zach,
  chad,
  devin,
  mathieu,
  steve,
  andrewHynes,
  eric,
  keenan,
  cameron,
  ryan,
  joel,
  nathan,
  andrewReynolds,
  david,
  ethanDenny,
  alexis,
  leah,
  marty,
  brandon,
  mohammadArafatZaman,
  scott,
  sheldon,
  ben,
  paul,
  robert,
  brady,
};
