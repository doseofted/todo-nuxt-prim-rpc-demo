import { z } from "zod";
import * as path from "node:path";
import * as fs from "node:fs/promises";

export const allowedPhotos = z.enum(["image/jpeg", "image/png", "image/gif"]);

export const uploadLocation = path.resolve("./public/uploads");

export async function uploadFile(file?: File) {
  const fileCanBeUploaded =
    file && file.size > 0 && allowedPhotos.parse(file.type) && file.name;
  if (!fileCanBeUploaded) {
    return;
  }
  // NOTE: this is only a demo, saving to a public folder is a bad idea
  const { name, ext } = path.parse(file.name);
  const fileName = [name, "-" + new Date().valueOf(), ext].join("");
  const filePath = path.resolve(uploadLocation, fileName);
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  return fileName;
}

export async function removeFile(file?: string | null) {
  if (!file) {
    return false;
  }
  const { name, ext } = path.parse(file);
  const fileName = [name, ext].join("");
  const photoLocation = path.resolve(uploadLocation, fileName);
  try {
    await fs.unlink(photoLocation);
  } catch (error) {}
}
