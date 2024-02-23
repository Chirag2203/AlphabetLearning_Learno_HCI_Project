import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { alphabetData } from "../../utils/data"; // Import the alphabet data

const ChildConsole = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % alphabetData.length); // Increment index and handle looping
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + alphabetData.length) % alphabetData.length); // Decrement index and handle looping
  };

  const { letter, word, image } = alphabetData[currentIndex]; // Get data for the current index

  // Function to speak the word attribute
  const speakWord = () => {
    // Check if the SpeechSynthesis API is supported
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(word); // Create a new SpeechSynthesisUtterance object with the word
      speech.lang = 'en-US'; // Set the language
      speech.rate = 1; // Set the speech rate (optional)
      window.speechSynthesis.speak(speech); // Speak the word
    } else {
      console.log('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div className="console">
      <div className="text-3xl font-semibold bg-gradient-to-r from-purple-600 py-2 rounded-md to-purple-300 px-4 flex justify-between">
        <p className="">Child Console</p>
        <div className="flex items-center gap-2">
          <Button onClick={speakWord} className="border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2">
            Speak <HiSpeakerphone />
          </Button>
          <Button onClick={handlePrevious} className="border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2">
            <FaArrowLeft /> Previous{" "}
          </Button>
          <Button onClick={handleNext} className="border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2">
            Next <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 my-4 ">
        <div className="bg-white w-1/2 h-40 flex items-center justify-center rounded-md">
          <p className="text-black text-7xl font-bold">{letter}</p>
        </div>
        <div className="bg-white w-1/2 h-40 flex items-center justify-center rounded-md">
          <img src={image} className="w-36" alt={letter} />
        </div>
      </div>
      <div className="w-full h-96 rounded-md border-dashed flex items-center border justify-center">
        <p>Write here</p>
      </div>
    </div>
  );
};

export default ChildConsole;
