"use client";

import { signOut } from "next-auth/react";

const page = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default page;
