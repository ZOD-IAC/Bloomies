// Uses sharp already installed by Next.js; no additional application dependency.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
const mark = await readFile(
  new URL("../public/brand/mark.svg", import.meta.url),
);
await writeFile(new URL("../src/app/icon.svg", import.meta.url), mark);
await sharp(mark)
  .resize(180, 180)
  .png()
  .toFile(new URL("../src/app/apple-icon.png", import.meta.url).pathname);
await sharp(
  await readFile(
    new URL("../public/brand/social-preview.svg", import.meta.url),
  ),
)
  .png()
  .toFile(
    new URL("../public/brand/social-preview.png", import.meta.url).pathname,
  );
const sizes = [16, 32, 48];
const icons = await Promise.all(
  sizes.map((size) => sharp(mark).resize(size, size).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
icons.forEach((image, i) => {
  const n = 6 + i * 16;
  header[n] = sizes[i];
  header[n + 1] = sizes[i];
  header.writeUInt16LE(1, n + 4);
  header.writeUInt16LE(32, n + 6);
  header.writeUInt32LE(image.length, n + 8);
  header.writeUInt32LE(offset, n + 12);
  offset += image.length;
});
await writeFile(
  new URL("../src/app/favicon.ico", import.meta.url),
  Buffer.concat([header, ...icons]),
);
console.log(
  "Generated favicon.ico, icon.svg, apple-icon.png and social-preview.png",
);
