# Tell a Whole Story in 32 Characters

![Competition](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978.svg)
![Rank](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978/aint965/u-xvader-tell-a-whole-story-in-32-characters-f86dd978-xingchi/rank.svg)
![Reward](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978/aint965/u-xvader-tell-a-whole-story-in-32-characters-f86dd978-xingchi/reward.svg)

Entry for the [Tell a Whole Story in 32 Characters](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978) bounty on make.fun.

## The Wi-Fi name

**`Dad Unplugged It To Talk To Us`** — 30 characters.

Dad deliberately killed the internet so the family would talk to each other, told in the kid's complaining voice. One character (Dad), one motive (he wants to talk), one small domestic disaster (the Wi-Fi is gone) — and the reader can fill in the rest: the kids staring at a dead router, Dad holding the plug like a trophy, and a long, awkward family conversation nobody asked for.

## How it works

`main.ts` (Node 22, no dependencies, no network access) writes that single name, deterministically, to `/output/entry.txt`. Before writing it self-checks the gate: 1–32 characters, a single line, not only whitespace — and refuses with a non-zero exit if the name does not pass.

```sh
node main.ts
```
