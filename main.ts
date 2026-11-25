import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

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

// Self-check before writing. Each rule is named so a failure says exactly
// which gate rule broke, instead of a generic message:
//   length: 1-32 characters (the gate counts characters)
//   bytes:  at most 32 UTF-8 bytes (keeps the Size column small, which is
//           the tie-break after win rate, and stays valid for any future
//           non-ASCII name, where bytes can exceed characters)
//   line:   a single line (no CR or LF)
//   blank:  not only whitespace
//   trim:   no leading or trailing whitespace (the written name must be
//           exactly the intended name, not a padded copy of it)
function validateName(name: string): string[] {
  const failures: string[] = [];
  if (name.length < 1 || name.length > 32) {
    failures.push(
      `length: name is ${name.length} characters, must be 1-32`,
    );
  }
  if (Buffer.byteLength(name, "utf8") > 32) {
    failures.push(
      `bytes: name is ${Buffer.byteLength(name, "utf8")} UTF-8 bytes, must be at most 32`,
    );
  }
  if (name.includes("\n") || name.includes("\r")) {
    failures.push("line: name must be a single line");
  }
  if (name.trim().length === 0) {
    failures.push("blank: name must not be only whitespace");
  }
  if (name !== name.trim()) {
    failures.push("trim: name has leading or trailing whitespace");
  }
  return failures;
}

const failures = validateName(NAME);
if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`error: ${failure}`);
  }
  process.exit(1);
}

// Create the output directory only — never delete or remove it
// (the server output is a mount; a delete there fails).
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, NAME, "utf8");

// Verify what was actually written: read it back and require the bytes
// to be exactly the intended name, so an encoding or write fault fails
// loudly instead of shipping a different entry.
const written = readFileSync(outFile, "utf8");
if (written !== NAME) {
  console.error(
    `error: written entry differs from the intended name (${written.length} characters read back)`,
  );
  process.exit(1);
}
console.log(`wrote ${NAME.length}-character entry to ${outFile}`);
