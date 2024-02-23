import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Input } from "./ui/input";


export function JoinUs() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-purple-200 to-purple-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-purple-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            We are launching soon. Join the waitlist to get early access and
            exclusive offers.

        </p>
        <Input
          type="email"
          placeholder="example@gmail.com"
          className="text-white z-20 bg-black"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
