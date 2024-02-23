import React from "react";
import { BoxBg } from "./BoxBg";
import brain from "../assets/brain.png"

const Hero = () => {
  return (
    <div className="hero-bg min-h-screen">
        <div>
            <BoxBg/>
        </div>

      <section class="text-white body-font w-5/6 mx-auto">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-purple-400">
              What do we offer?
              {/* <br class="hidden lg:inline-block">readymade gluten</br> */}
            </h1>
            <p class="mb-8 leading-relaxed">
              We help your child become the best version of themselved by learning at an unmatched rate.
              We offer multiple learning paths and you can customise your own path for your child. Using AI we help you teach your child fast and better. They can learn to write and speak faster 10x faster
            </p>
            <div class="flex justify-center">
              <button class="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                Learn More
              </button>
              <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Start Now
              </button>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src={brain}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
