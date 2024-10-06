import { getCurrentUser } from "@/lib/session";
import React from "react";
import Dashbaord from "@/components/dashboard";

async function page() {
  const user = await getCurrentUser();

  return (
    <div>
      <Dashbaord />
    </div>
  );
}

export default page;
