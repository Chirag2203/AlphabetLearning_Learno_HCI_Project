import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { alphabetData } from "../../utils/data"; // Import the alphabet data
import * as handwriting from "handwriting";
import "intro.js/introjs.css";
import introJs from "intro.js";

const ChildConsole = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index
  const [isDrawing, setIsDrawing] = useState(false); // State to track drawing status
  const [penColor, setPenColor] = useState("#000000"); // State to track pen color
  const [penWidth, setPenWidth] = useState(5); // State to track pen width
  const [isLetterCorrect, setIsLetterCorrect] = useState(null); // State to track if the letter is drawn correctly
  const canvasRef = useRef(null); // Ref to the canvas element
  const letterImageRef = useRef(null); // Ref to the letter image

  const startIntro = () => {
    introJs()
      .setOptions({
        steps: [
          {
            title: "Welcome",
            intro: "Welcome to learno! Lets get started 👋",
            tooltipClass: "black-tooltip",
          },

          {
            element: document.querySelector(".clear-button"),
            intro: "This button clears the canvas.",
             tooltipClass: "black-tooltip",
          },
          {
            element: document.querySelector(".speak-button"),
            intro: "This button speaks the current word.",
             tooltipClass: "black-tooltip",
          },
          {
            element: document.querySelector(".previous-button"),
            intro: "This button shows the previous letter.",
             tooltipClass: "black-tooltip",
          },
          {
            element: document.querySelector(".next-button"),
            intro: "This button shows the next letter.",
             tooltipClass: "black-tooltip",
          },
          {
            element: document.querySelector("canvas-div"),
            intro: "This is the drawing area.",
             tooltipClass: "black-tooltip",
          },

          {
            element: document.querySelector(".color-input"),
            intro: "This input changes the pen color.",
             tooltipClass: "black-tooltip",
          },
          {
            element: document.querySelector(".width-input"),
            intro: "This input changes the pen width.",
             tooltipClass: "black-tooltip",
          },
        ],
      })
      .start();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawLetter(context); // Draw the lighter shade of the letter on the canvas
    setIsLetterCorrect(null); // Reset letter correctness
   
  }, [currentIndex]);
  useEffect(() => {
    startIntro();
  }, []);

  const drawLetter = (context) => {
    context.fillStyle = "rgba(0, 0, 0, 0.1)"; // Set the color to a lighter shade of black
    context.font = "250px Arial"; // Set the font size and family
    context.fillText(alphabetData[currentIndex].letter, 400, 260); // Draw the letter on the canvas
  };

  const speakWord = () => {
    // Check if the SpeechSynthesis API is supported
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(word); // Create a new SpeechSynthesisUtterance object with the word
      speech.lang = "en-US"; // Set the language
      speech.rate = 1; // Set the speech rate (optional)
      window.speechSynthesis.speak(speech); // Speak the word
    } else {
      console.log("Speech synthesis is not supported in this browser.");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % alphabetData.length); // Increment index and handle looping
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + alphabetData.length) % alphabetData.length
    ); // Decrement index and handle looping
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawLetter(context); // Draw the lighter shade of the letter on the canvas
    setIsLetterCorrect(null); // Reset letter correctness
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true); // Set drawing status to true
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.lineTo(x, y);
    context.strokeStyle = penColor; // Set pen color
    context.lineWidth = penWidth; // Set pen width
    context.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false); // Set drawing status to false
    checkLetter(); // Check if the letter is drawn correctly
  };
  const checkLetter = async () => {};

  const { letter, word, image } = alphabetData[currentIndex]; // Get data for the current index

  return (
    <div className="console">
      <div className="text-3xl font-semibold bg-gradient-to-r from-purple-600 py-2 rounded-md to-purple-300 px-4 flex sm:flex-row flex-col justify-between">
        <p className="">Child Console</p>
        <div className="flex flex-wrap items-center gap-2 sm:mt-0 mt-4">
          <Button
            onClick={handleClear}
            className="clear-button border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2"
          >
            Clear
          </Button>
          <Button
            onClick={speakWord}
            className="speak-button border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2"
          >
            Speak <HiSpeakerphone />
          </Button>
          <Button
            onClick={handlePrevious}
            className="previous-button border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2"
          >
            <FaArrowLeft /> Previous{" "}
          </Button>
          <Button
            onClick={handleNext}
            className="next-button border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2"
          >
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
      <div className="canvas-div w-full h-96 rounded-md border-dashed flex items-center border justify-center cursor-pointer">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
          width={1020}
          height={350}
          style={{
            border: "1px solid #000",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        />
      </div>
      <div className="flex items-center justify-center mt-4 gap-2">
        <p>Color</p>
        <label className="rounded-md bg-orange-50 p-1">
          <input
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
            className="color-input  "
          />
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={penWidth}
          className="width-input"
          onChange={(e) => setPenWidth(e.target.value)}
        />
        {isLetterCorrect !== null && (
          <p>{isLetterCorrect ? "Correct!" : "Incorrect!"}</p>
        )}
      </div>
    </div>
  );
};

export default ChildConsole;
