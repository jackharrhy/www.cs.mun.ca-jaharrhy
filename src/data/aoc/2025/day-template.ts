import { pad } from "./data";

export const dayTemplate = (day, others) => `---
layout: "@layouts/AdventOfCodeLayoutDay.astro"
title: day ${day}
pubDate: 2025-12-${pad(day)}
---

import Other from "@components/aoc/Other2025.astro";

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

the full solution can be found [[here]](https://github.com/jackharrhy/advent2025/blob/main/day${day}.livemd)

<br />

</details>

---

### others

${others}---

any thoughts about any of the above?

reach out:

import Letterbird from "@components/Letterbird.astro";

<Letterbird />
`;
