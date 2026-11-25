import { mkdirSync, writeFileSync } from "node:fs";

// The Wi-Fi network name (30 characters):
// Dad deliberately killed the internet so the family would talk to each
// other — told in the kid's complaining voice. One character, one motive,
// one small domestic disaster, and the whole story is implied.
const NAME = "Dad Unplugged It To Talk To Us";

// Output directory: /output by default (the grader's mount). Overridable
// via OUTPUT_DIR only so the program can be verified against a scratch
// directory first; the written bytes are identical either way.
const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = `${outDir}/entry.txt`;

// Self-check before writing: 1-32 characters, a single line, not only
// whitespace. Refuse (non-zero exit) if the name does not pass.
if (NAME.length < 1 || NAME.length > 32) {
  console.error(`error: name is ${NAME.length} characters, must be 1-32`);
  process.exit(1);
}
if (NAME.includes("\n") || NAME.includes("\r")) {
  console.error("error: name must be a single line");
  process.exit(1);
}
if (NAME.trim().length === 0) {
  console.error("error: name must not be only whitespace");
  process.exit(1);
}

// Create the output directory only — never delete or remove it
// (the server output is a mount; a delete there fails).
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, NAME, "utf8");
console.log(`wrote ${NAME.length}-character entry to ${outFile}`);
