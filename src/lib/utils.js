import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import introJs from "intro.js";
import "intro.js/introjs.css";
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const speakOnLoad = (message) => {
     
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-UK";
  speech.pitch = 1.4; // Adjust the pitch (0 to 2, default 1)
  speech.rate = 0.9; // Adjust the rate (0.1 to 10, default 1)
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  
};

export const speakWord = (word) => {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    speech.pitch = 1.4; // Adjust the pitch (0 to 2, default 1)
    speech.rate = 0.9; 
    window.speechSynthesis.speak(speech);
  } else {
    console.log("Speech synthesis is not supported in this browser.");
  }
};


export const startIntro = () => {
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
