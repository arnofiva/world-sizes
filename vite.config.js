/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import MarkdownIt from "markdown-it";

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    base: "./",
    plugins: [
      react(),
      mdToHtmlPlugin({
        markdownItOptions: {
          // Optionally pass any markdown-it options here.
          html: true,
          linkify: true,
          typographer: true,
        },
      }),
    ],
  };
});

function mdToHtmlPlugin(options = {}) {
  const md = new MarkdownIt(options.markdownItOptions || {});

  return {
    name: "md-to-html",
    transform(src, id) {
      // Check if the file is a Markdown file.
      if (id.endsWith(".md")) {
        // Convert the raw Markdown source to HTML.
        const html = md.render(src);

        // Return a JS module that exports the HTML string.
        return {
          code: `export default ${JSON.stringify(html)};`,
          map: null,
        };
      }
    },
  };
}
