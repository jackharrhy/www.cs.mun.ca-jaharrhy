const breadEmojis = [
  "🍞",
  "🥖",
  "🥪",
  "🥯",
  "🥐",
];

export default function Bread() {
  return <span>{breadEmojis[Math.floor(Math.random() * breadEmojis.length)]}</span>;
}
