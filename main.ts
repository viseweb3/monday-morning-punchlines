// Monday Morning Punchlines — make.fun entry (program/v1, node22)
//
// The program writes exactly one joke about Monday mornings to
// /output/entry.txt. The sealed gate requires UTF-8 text of 1 to 200
// characters, not only white space; the judge then compares the text
// against other entries two at a time, weighing Monday-ness, a punchline
// that lands, surprise, economy of words and freshness.
//
// The joke is a fixed string: fully deterministic (two runs produce the
// same output), no network, no clock, no randomness, no input data.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// The joke — 112 characters, 114 bytes. Setup: Monday as an unwanted early visitor.
// Turn: pretending to be out fails, because the intruder is official.
// Punchline: HR gave it a key — Monday is not a burglar, it is employed.
// The joke avoids the tired Monday cliches (snooze button, coffee,
// "I hate Mondays"): the twist is that Monday has institutional backing.
const JOKE =
  "Monday knocked on my door at 6 a.m. I pretended to be out. " +
  "It let itself in anyway — turns out HR gave it a key.";

// The gate counts characters, so enforce the 1–200 window here too.
// Array.from counts code points, matching the gate's character count.
const jokeLength = Array.from(JOKE).length;
if (jokeLength < 1 || jokeLength > 200 || JOKE.trim().length === 0) {
  throw new Error(
    `joke must be 1-200 non-blank characters, got ${jokeLength}`,
  );
}

mkdirSync("/output", { recursive: true });
// Write the joke exactly, with no trailing newline: the file's content
// is the entry the judge reads, byte for byte.
writeFileSync("/output/entry.txt", JOKE, "utf8");
// The grader collects /output as another user: leave the file readable.
chmodSync("/output/entry.txt", 0o644);

console.log(JOKE);
