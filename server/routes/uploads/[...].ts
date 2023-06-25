import serveStatic from "serve-static";
import { uploadLocation } from "../../../functions/uploads";
import * as path from "node:path";

// The Nuxt public folder is intended for static files available at build-time
// Uploads to the server are made at run-time, so we need another static file handler
export default defineEventHandler((event) => {
  const uploads = serveStatic(path.join(uploadLocation, ".."));
  const uploadsEventHandler = fromNodeMiddleware(uploads);
  return uploadsEventHandler(event);
});
