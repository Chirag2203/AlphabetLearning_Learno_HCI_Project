"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Boxes } from "./ui/background-boxes";
import { ParticleHeader } from "./ParticleHeader";
import { FaArrowRight } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";

export function BoxBg() {
  return (
    <div className="text-white h-screen relative w-full overflow-hidden bg-neutral-900 flex flex-col items-center justify-start pt-32 rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-neutral-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1
        className={cn("md:text-8xl font-bold text-xl text-white relative z-20")}
      >
        Learno
      </h1>

      <p className="text-center mt-2 text-2xl text-purple-400 font-semibold  relative z-20">
        The only place you need to teach your child!
      </p>
      <div className="flex  mt-24 w-1/4 mx-auto justify-between items-center bg-gradient-to-r from-purple-400 to-purple-700 z-20 px-4 py-2 pl-3 rounded-full">
        <div className="bg-neutral-900 px-4 py-2 rounded-full flex gap-2 items-center">
           AI Inside <HiSparkles/> 
        </div>
        <Link to={"/parent"} className="flex gap-2 items-center font-medium">
            Get Started <FaArrowRight/>
        </Link>
      </div>
    </div>
  );
}
