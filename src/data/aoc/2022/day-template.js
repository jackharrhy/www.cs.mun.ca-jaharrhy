import { pad } from "./data";

export const dayTemplate = (day, others) => `---
layout: "@layouts/AdventOfCodeLayoutDay.astro"
title: day ${day}
pubDate: 2022-12-${pad(day)}
---

import Other from "@components/aoc/2023/Other.astro";

TODO PREAMBLE

---

<details>
<summary>click to view my solution</summary>

<br />

given the sample input:

\`\`\`
TODO
\`\`\`

assuming \`input\` is the above as one big string,

the full solution can be found [[here]](https://github.com/jackharrhy/advent2022/blob/main/day${day}.livemd)

<br />

</details>

---

### others

${others}---

if you want to have your repo added for me to make a note of / talk about here (or have you repo removed), reach out:

email -> \`me@jackharrhy.com\`

discord -> \`<i>jack arthur null</i>#7539\`
`;
