// Vercel compiles api/*.ts to .js, so the functions import siblings as
// "./x.js" (an "./x.ts" import crashed both functions in production with
// ERR_MODULE_NOT_FOUND from 2026-10-20). Node's type stripping runs the .ts
// sources directly and has no .js -> .ts mapping, so this hook supplies it for
// the test run only.
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      import { existsSync } from "node:fs";
      import { fileURLToPath } from "node:url";
      export async function resolve(specifier, context, next) {
        if (specifier.startsWith(".") && specifier.endsWith(".js") && context.parentURL) {
          const ts = new URL(specifier.slice(0, -3) + ".ts", context.parentURL);
          if (existsSync(fileURLToPath(ts))) return next(ts.href, context);
        }
        return next(specifier, context);
      }
    `),
);
