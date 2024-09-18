import { getCurrentUser } from "@/lib/session";
import React from "react";
import Dashbaord from "@/components/dashboard";

async function page() {
  const user = await getCurrentUser();
  console.log("user", user);
  return (
    <div>
      <Dashbaord />
      
    </div>
  );
}

export default page;
