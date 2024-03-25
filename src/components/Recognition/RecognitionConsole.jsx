import "./style.css";
import ConfettiExplosion from "react-confetti-explosion";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { alphabetData } from "../../utils/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cheer from "../../assets/crowd-cheering.mp3";
import { speakOnLoad, speakWord } from "@/lib/utils";

const RecognitionConsole = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currLetter, setCurrLetter] = useState("");
  const [wrongLetter, setWrongLetter] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrongLetterWord, setWrongLetterWord] = useState("");
  const [statistics, setStatistics] = useState({
    correct: 0,
    wrong: 0,
    letter: "A"
  });

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
    const script = document.createElement("script");
    const script2 = document.createElement("script");
    script.src = "src/components/Recognition/letterRecognition.js";
    script2.src = "src/components/Recognition/weights.js";
    script.async = true;
    script2.async = true;

    document.body.appendChild(script);
    document.body.appendChild(script2);
    const checkButton = document.getElementById("check-button");
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
      if (checkButton) {
        checkButton.removeEventListener("click", handleCheck);
      }
    };
  }, []);

  const handleCheck = () => {
    const firstPredictionText = document
      .getElementById("prediction-0")
      .textContent.trim();

    const { letter } = alphabetData[currentIndex];

    if (firstPredictionText.toUpperCase() === currLetter.trim().toUpperCase()) {
      toast.success("Prediction matches the displayed letter!");
      clearCanvas();
      setCorrect(true);
      setWrongLetter(false);

      // Update local storage for correct writings
      const localStorageData = JSON.parse(localStorage.getItem("writingStats")) || { correct: 0, wrong: 0, letter:"A" };
      localStorageData.correct += 1;
      localStorage.setItem("writingStats", JSON.stringify(localStorageData));
    } else {
      setWrongLetter(true);
      setCorrect(false);
      setWrongLetterWord(firstPredictionText);
      toast.error("Prediction does not match the displayed letter.");

      // Update local storage for wrong writings
      const localStorageData = JSON.parse(localStorage.getItem("writingStats")) || { correct: 0, wrong: 0, letter:"A" };
      localStorageData.wrong += 1;
      localStorage.setItem("writingStats", JSON.stringify(localStorageData));
    }
    console.log(JSON.parse(localStorage.getItem("writingStats")));

  };

  useEffect(() => {
    const message = "Hello buddy! Please write in the specified area.";
    speakOnLoad(message);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

   const handleNext = () => {
    const nextIndex = (currentIndex + 1) % alphabetData.length;
    const nextLetter = alphabetData[nextIndex].letter;

    setCorrect(false)
    setCurrentIndex(nextIndex);
    setCurrLetter(nextLetter);

    // update the local storage
    const localStorageData = JSON.parse(localStorage.getItem("writingStats")) || { correct: 0, wrong: 0, letter:"A" };
    localStorageData.correct=0;
    localStorageData.wrong=0;
    localStorageData.letter=nextLetter;

    localStorage.setItem("writingStats", JSON.stringify(localStorageData));

    console.log("current letter set to ", nextLetter);
    clearCanvas();
  };

  const handlePrevious = () => {
    setCorrect(false)
    const prevIndex = (currentIndex - 1 + alphabetData.length) % alphabetData.length;
    setCurrentIndex(prevIndex);
    const prevLetter = alphabetData[prevIndex].letter;

    // update the local storage
    const localStorageData = JSON.parse(localStorage.getItem("writingStats")) || { correct: 0, wrong: 0, letter:"A" };
    localStorageData.correct=0;
    localStorageData.wrong=0;
    localStorageData.letter=prevLetter;
    localStorage.setItem("writingStats", JSON.stringify(localStorageData));

  };

  const { letter, word, image } = alphabetData[currentIndex];

  return (
    <div className="flex flex-col items-center gap-4">
      {correct && <ConfettiExplosion numberOfPieces={400} duration={6000} />}
      <ToastContainer />
      <h1 className="text-center text-4xl font-bold pt-24">
        Letter Auto Recognition
      </h1>
      <div className="utility-bar">
        <p className="">Child Console</p>
        <div className="flex flex-wrap items-center gap-2 sm:mt-0 mt-4">
          <Button
            onClick={()=>{speakWord(word)}}
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
          <Button
            onClick={handleCheck}
            id="check-button"
            className="check-button utility-btn"
          >
            Check
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 my-4 w-3/4 ">
        <div className="utility-display">
          <p className="text-black text-7xl font-bold">{currLetter}</p>
        </div>
        <div className="utility-display">
          <img src={image} className="w-36" alt={letter} />
        </div>
      </div>
      <h1>Write in the given area</h1>
      {wrongLetter && (
        <h1 className="text-2xl font-bold">
          Wrong letter, you have written {wrongLetterWord}{" "}
        </h1>
      )}
      {correct && <h1 className="text-2xl font-bold">You are correct 🎉🎉 </h1>}
      {correct && <ConfettiExplosion numberOfPieces={200} duration={6000} />}
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
          <div class="card-paneL canvas-paneL no-pad hoverable">
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
