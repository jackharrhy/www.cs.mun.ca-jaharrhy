type Person = {
  name: string;
  nickname?: string;
  githubUrl: string;
};

type Jam = {
  name: string;
  slug: string;
  theme: string;
  started: Date;
  finished: Date;
};

const imageTypes = ["during-showcase"] as const;
type ImageType = (typeof imageTypes)[number];

type Image = {
  type: ImageType;
  alt: string;
  meta: ImageMetadata;
};

type Game = {
  name: string;
  by: Person[];
  forJam?: Jam;
  images?: Image[];
};

export const people = [
  {
    name: "Jack",
    githubUrl: "https://github.com/jackharrhy",
  },
  {
    name: "Ethan",
    githubUrl: "https://github.com/mynameisgump",
  },
] as const satisfies Person[];

type PeopleNames = (typeof people)[number]["name"];

export const peopleByName = people.reduce(
  (acc, person) => {
    acc[person.name as any] = person;
    return acc;
  },
  {} as {
    [key in PeopleNames]: Extract<(typeof people)[number], { name: key }>;
  }
);

export const jams = (
  [
    {
      name: "growthjam",
      slug: "growthjam-feb2023",
      theme: "growth",
      started: new Date(2023, 1, 17),
      finished: new Date(2023, 1, 26),
    },
    {
      name: "gamblejam",
      slug: "gamblejam-aug2024",
      theme: "gambling",
      started: new Date(2024, 8, 30),
      finished: new Date(2024, 9, 8),
    },
  ] as const satisfies Jam[]
).sort((a, b) => b.started.getTime() - a.started.getTime());

type JamNames = (typeof jams)[number]["name"];

export const jamsByName = jams.reduce(
  (acc, jam) => {
    acc[jam.name as any] = jam;
    return acc;
  },
  {} as {
    [key in JamNames]: Extract<(typeof jams)[number], { name: key }>;
  }
);

import growthjamJackGame from "@images/gamedev/jams/growthjam/jack-game.jpg";
import gamblejamGumpGameTV from "@images/gamedev/jams/gamblejam/gump-game-tv.jpg";

export const games = [
  {
    name: "plant",
    by: [peopleByName.Jack],
    forJam: jamsByName.growthjam,
    images: [
      {
        type: "during-showcase",
        alt: "Jack showing off his game to the others",
        meta: growthjamJackGame,
      },
    ],
  },
  {
    name: "ETHAN GAME NAME",
    by: [peopleByName.Ethan],
    forJam: jamsByName.gamblejam,
    images: [
      {
        type: "during-showcase",
        alt: "Ethan showing off his game to the others",
        meta: gamblejamGumpGameTV,
      },
    ],
  },
] as const satisfies Game[];

type GameNames = (typeof games)[number]["name"];

export const gamesByJam = games.reduce((acc, game) => {
  const jamName = game.forJam.name;
  if (!acc[jamName]) {
    acc[jamName] = [];
  }
  acc[jamName].push(game as any);
  return acc;
}, {} as Record<JamNames, Game[]>);
