import path from "node:path";
import { promisify } from "node:util";
import { exec } from "node:child_process";
import sanitizeFilename from "sanitize-filename";

const execAsync = promisify(exec);

const OUTPUT_FOLDER = path.join(process.cwd(), "reports");

const URLS = ["https://www.google.com/"];

async function main() {
  for await (const url of URLS) {
    const outputFilename = sanitizeFilename(url) + ".html";

    const outputPath = path.join(OUTPUT_FOLDER, outputFilename);

    const command = `npx lighthouse "${url}" --output html --output-path "${outputPath}" --port "8080"`;

    try {
      const result = await execAsync(command);

      console.log("stderr:", result.stderr || "not defined");
      console.log("stdout:", result.stdout);
    } catch (error) {
      console.error(error);
    }
  }
}

main();
