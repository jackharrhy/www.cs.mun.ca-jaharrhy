const steveQuotes = [
  "If you can't accept me at my worst, you don't deserve me at my best",
  "I am halfway in between the age of you and your Dad so I'm a good mediator",
  "When are we gonna find the next Jack Harrhy",
];

export const SteveQuotes = () => {
  return (
    <div>
      <h1>Steve Quotes</h1>
      <ul>
        {steveQuotes.map((quote, index) => {
          return <li key={index}>{quote}</li>;
        })}
      </ul>
    </div>
  );
};
