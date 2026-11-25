// Charm the Commuter: Forecast a City That Isn't
// Writes one line of weather (at most 140 characters) for a city that does
// not exist to entry.txt, and validates the competition gate locally first.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "In Gloomsville, drizzle at 7am, umbrella sales up 400%, and the 8:15 bus is on time for once — miracles happen, commuters.";

const MAX_CHARS = 140;

function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // Must round-trip as valid UTF-8 text.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(ENTRY);
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length}-char entry to ${join(outDir, "entry.txt")}`);
console.log(ENTRY);
