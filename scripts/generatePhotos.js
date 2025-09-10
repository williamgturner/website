const { readdirSync, writeFileSync } = require("fs");
const path = require("path");

const photosDir = path.join(process.cwd(), "public/images/photos");
const files = readdirSync(photosDir).filter((f) =>
  /\.(jpg|jpeg|png|gif|webp)$/.test(f)
);

writeFileSync(path.join(process.cwd(), "photos.json"), JSON.stringify(files));
console.log("photos.json generated:", files.length, "files");
