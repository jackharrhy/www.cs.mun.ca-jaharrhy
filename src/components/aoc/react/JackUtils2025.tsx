import { useMemo } from "react";
import { useState } from "react";

import { people } from "@data/aoc/2025/data";
import { dayTemplate } from "@data/aoc/2025/day-template";

const personTemplate = (personKey, day) =>
  `
<Other person="${personKey}" day="${day}" />

>
`.trim();

const ShowPeople = ({ day }) =>
  Object.entries(people)
    .sort(() => Math.random() - 0.5)
    .map(([key, person]) => (
      <div key={key} className="person">
        <p>
          {key}:{" "}
          <a href={person.link}>
            [{person.display}] -&gt; {person.link}
          </a>
        </p>
        <p>language: {person.language}</p>
        <p>days:</p>
        <ul>
          {person.days?.map((day) => (
            <li key={day}>
              <a href={person.dayLinkFunc(day)}>
                [day {day}] -&gt; {person.dayLinkFunc(day)}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <pre>{personTemplate(key, day)}</pre>
        </div>
      </div>
    ));

export function JackUtils() {
  const [day, setDay] = useState(new Date().getDate());
  const [copied, setCopied] = useState(false);

  const allPeopleTemplate = useMemo(
    () =>
      Object.entries(people)
        .sort(() => Math.random() - 0.5)
        .filter(([_personKey, person]) => person.days.includes(day))
        .map(([personKey, _person]) => `${personTemplate(personKey, day)}\n\n`)
        .join(""),
    [day]
  );

  const fullTemplate = dayTemplate(day, allPeopleTemplate);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      day:{" "}
      <input
        value={day}
        onChange={(event) => setDay(Number(event.target.value))}
      />
      <br />
      <br />
      <p>
        full template{" "}
        <button onClick={copyToClipboard}>{copied ? "copied!" : "copy"}</button>
      </p>
      <div>
        <pre>{fullTemplate}</pre>
      </div>
      <p>just others</p>
      <div>
        <pre>{allPeopleTemplate}</pre>
      </div>
      <br />
      <ul>
        {Object.entries(people).map(([key, person]) => (
          <li>
            {key} -&gt; <a href={person.link}>[{person.display}]</a>
          </li>
        ))}
      </ul>
      <br />
      <ShowPeople people={people} day={day} />
    </>
  );
}
