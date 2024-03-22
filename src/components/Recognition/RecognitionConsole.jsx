import "./style.css";
import ConfettiExplosion from 'react-confetti-explosion';
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { alphabetData } from "../../utils/data"; // Import the alphabet data
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cheer from "../../assets/crowd-cheering.mp3"

const RecognitionConsole = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currLetter, setCurrLetter] = useState("");
  const [wrongLetter, setWrongLetter] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrongLetterWord, setWrongLetterWord] = useState("");
  // Update currLetter whenever currentIndex changes
  useEffect(() => {
    const { letter } = alphabetData[currentIndex];
    setCurrLetter(() => letter); // Using callback function syntax
  }, [currentIndex]);

  // play sound when correct is true for 3 sec
  useEffect(() => {
    if (correct) {
      const audio = new Audio(cheer);
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 6000);
    }
  }, [correct]);


  useEffect(() => {
    // Include your external JavaScript file
    const script = document.createElement("script");
    const script2 = document.createElement("script");
    script.src = "src/components/Recognition/letterRecognition.js";
    script2.src = "src/components/Recognition/weights.js"; // Replace with the actual path to your external script
    script.async = true;
    script2.async = true;

    // Attach an event listener to check when the script has loaded
    script.onload = () => {
      // Code to execute after the external script has loaded
    };
    //

    // Append the script to the document
    document.body.appendChild(script);
    document.body.appendChild(script2);
    const checkButton = document.getElementById("check-button");
    // if (checkButton) {
    //   checkButton.addEventListener("click", handleCheck);
    // } else {
    //   console.error("Check button not found!");
    // }

    // Cleanup
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
      // Remove event listener when component unmounts
      if (checkButton) {
        checkButton.removeEventListener("click", handleCheck);
      }
    };
  }, []);
  // Function to handle "Check" button click
  const handleCheck = () => {
    // Get the text content of the first prediction
    const firstPredictionText = document
      .getElementById("prediction-0")
      .textContent.trim();

    // Get the letter displayed in the child console directly from the alphabetData array
    const { letter } = alphabetData[currentIndex];
    console.log("letter", letter);
    console.log(
      "Prediction value:",
      firstPredictionText,
      "Current letter value:",
      currLetter
    );

    // Compare the first prediction with the displayed letter (convert both to uppercase for case-insensitive comparison)
    if (firstPredictionText.toUpperCase() === currLetter.trim().toUpperCase()) {
      // Display a success alert if they match
      toast.success("Prediction matches the displayed letter!");
      // alert("Prediction matches the displayed letter!");
      clearCanvas();
      setCorrect(true);
      setWrongLetter(false);
    } else {
      setWrongLetter(true);
      setCorrect(false);
      setWrongLetterWord(firstPredictionText);
      // Display a failure alert if they do not match
      toast.error("Prediction does not match the displayed letter.");
      // alert("Prediction does not match the displayed letter.");
    }
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
    const nextIndex = (currentIndex + 1) % alphabetData.length;
    const nextLetter = alphabetData[nextIndex].letter;

    setCurrentIndex(nextIndex);
    setCurrLetter(nextLetter);

    console.log("current letter set to ", nextLetter);
    clearCanvas();
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + alphabetData.length) % alphabetData.length
    ); // Decrement index and handle looping
  };

  const { letter, word, image } = alphabetData[currentIndex];

  return (
    <div className="flex flex-col items-center gap-4">
      {correct && <ConfettiExplosion numberOfPieces={400} duration={6000} />}
      <ToastContainer />
      <h1 className="text-center text-4xl font-bold pt-24">
        Letter Auto Recognition
      </h1>
      {/* this is used to display the text */}
      <div className="w-3/4 text-3xl font-semibold bg-gradient-to-r from-purple-600 py-2 rounded-md to-purple-300 px-4 flex sm:flex-row flex-col justify-between">
        <p className="">Child Console</p>
        <div className="flex flex-wrap items-center gap-2 sm:mt-0 mt-4">
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
          {/* this button should compare the current letter dislpayed with the model's first prediction */}
          <Button
            onClick={handleCheck}
            id="check-button"
            className="check-button border border-purple-500 hover:bg-white hover:text-black flex items-center gap-2"
          >
            Check
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 my-4 w-3/4 ">
        <div className="bg-white w-1/2 h-40 flex items-center justify-center rounded-md">
          <p className="text-black text-7xl font-bold">{currLetter}</p>
        </div>
        <div className="bg-white w-1/2 h-40 flex items-center justify-center rounded-md">
          <img src={image} className="w-36" alt={letter} />
        </div>
      </div>
      <h1>Write in the given area</h1>
      {wrongLetter && (
        <h1 className="text-2xl font-bold">
          Wrong letter, you have written {wrongLetterWord}{" "}
        </h1>
      )}
      {correct && <h1 className="text-2xl font-bold">You are correct 🎉🎉 </h1> }
      {correct && <ConfettiExplosion numberOfPieces={400} duration={4000} />}
      {/*here the text is written by the child and is recognised by the model */}
      <div
        className="pt-4 min-h-screen"
        dangerouslySetInnerHTML={{
          __html: `


  <div class="container">
    <div class="row ">
    <p>write here</p>
      <div class="draw-panel flex gap-1">
        <div class="col mr-56">
          <div class="card-panel canvas-panel no-pad hoverable">
            <canvas
              class="canvas elevation"
              id="canvas"
              width="280"
              height="280"
            ></canvas>
          </div>
        </div>
        <div class="card-panel hoverable col">
          <div id="pred" class="predictions">
            <div class="prediction-col" id="prediction-0">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">A</div>
            </div>
    
            <div class="prediction-col" id="prediction-1">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">B</div>
            </div>
    
            <div class="prediction-col" id="prediction-2">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">C</div>
            </div>
    
            <div class="prediction-col" id="prediction-3">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">D</div>
            </div>
    
            <div class="prediction-col" id="prediction-4">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">E</div>
            </div>
    
            <div class="prediction-col" id="prediction-5">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">F</div>
            </div>
    
            <div class="prediction-col" id="prediction-6">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">G</div>
            </div>
    
            <div class="prediction-col" id="prediction-7">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">H</div>
            </div>
    
            <div class="prediction-col" id="prediction-8">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">I</div>
            </div>
    
            <div class="prediction-col" id="prediction-9">
              <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
              </div>
              <div class="prediction-number rotated">J</div>
            </div>
          </div>
          <div class="button-pad center">
          <a id="clear-button" class="waves-effect waves-light btn text-pink-500">CLEAR</a>
        </div>
      </div>
      </div>
    </div>
  </div>

    `,
        }}
      />
    </div>
  );
};

export default RecognitionConsole;
