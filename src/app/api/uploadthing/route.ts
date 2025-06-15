import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

console.log("🔥 Uploadthing route file loaded");
console.log("📁 Router:", ourFileRouter);

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

console.log("✅ GET and POST handlers exported");
