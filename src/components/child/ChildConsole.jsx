import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { alphabetData } from "../../utils/data"; 
import * as handwriting from "handwriting";


import { speakWord, startIntro } from "@/lib/utils";

const ChildConsole = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [currLetterIndex, setCurrLetterIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false); 
  const [penColor, setPenColor] = useState("#000000"); 
  const [penWidth, setPenWidth] = useState(5); 
  const canvasRef = useRef(null);
  const letterImageRef = useRef(null); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); 
    drawLetter(context); 
    const randomIndex = Math.floor(Math.random() * alphabetData[currentIndex].word.length);
    setCurrLetterIndex(randomIndex);
  }, [currentIndex]);
  useEffect(() => {
    startIntro();
  }, []);

  // draw the lighter shade on canvas
  const drawLetter = (context) => {
    context.fillStyle = "rgba(0, 0, 0, 0.1)"; 
    context.font = "250px Arial"; 
    context.fillText(alphabetData[currentIndex].letter, 400, 260); 
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % alphabetData.length); 
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + alphabetData.length) % alphabetData.length
    ); 
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLetter(context); 
  };

  // canvas functions
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
    context.strokeStyle = penColor; 
    context.lineWidth = penWidth; 
    context.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false); 
    checkLetter(); 
  };

  // get the data for corresponding index
  const { letter, word, image } = alphabetData[currentIndex];

  return (
    <div className="console">
      <div className="utility-bar-2">
        <p className="">Child Console</p>
        <div className="flex flex-wrap items-center gap-2 sm:mt-0 mt-4">
          <Button
            onClick={handleClear}
            className="clear-button utility-btn"
          >
            Clear
          </Button>
          <Button
            onClick={()=>{speakWord(word[currLetterIndex])}}
            className="speak-button utility-btn"
          >
            Speak <HiSpeakerphone />
          </Button>
          <Button
            onClick={handlePrevious}
            className="previous-button utility-btn"
          >
            <FaArrowLeft /> Previous{" "}
          </Button>
          <Button
            onClick={handleNext}
            className="next-button utility-btn"
          >
            Next <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 my-4 ">
        <div className="utility-display">
          <p className="text-black text-9xl font-bold">{letter}</p>
        </div>
        <div className="utility-display">
          <img src={image[currLetterIndex]} className="w-32" alt={letter} />
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
        
      </div>
    </div>
  );
};

export default ChildConsole;
