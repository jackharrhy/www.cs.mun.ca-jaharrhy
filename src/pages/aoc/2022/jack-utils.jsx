import { useState } from "react";
import { people } from "./data";

const personTemplate = (personKey, day) =>
  `
<Other person="${personKey}" day="${day}" />

>
`.trim();

const ShowPeople = ({ day }) =>
  Object.entries(people).map(([key, person]) => (
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

export default function JackUtils() {
  const [day, setDay] = useState(new Date().getDate());
  return (
    <>
      day:{" "}
      <input
        value={day}
        onChange={(event) => setDay(Number(event.target.value))}
      />
      <br />
      <br />
      <div>
        <pre>
          {Object.entries(people)
            .filter(([_personKey, person]) => person.days.includes(day))
            .map(
              ([personKey, _person]) => `${personTemplate(personKey, day)}\n\n`
            )}
        </pre>
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
      <ShowPeople day={day} />
    </>
  );
}
