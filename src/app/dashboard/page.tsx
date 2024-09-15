import { getCurrentUser } from "@/lib/session";
import React from "react";

async function page() {
  const user = await getCurrentUser();
  console.log("user", user);
  return <div>hello</div>;
}

export default page;
