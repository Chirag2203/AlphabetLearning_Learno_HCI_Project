import { useEffect } from "react";
import "./style.css";

const RecognitionConsole = () => {
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

    // Append the script to the document
    document.body.appendChild(script);
    document.body.appendChild(script2);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-4xl font-bold pt-24">
        Letter Auto Recognition
      </h1>
      <h1>Write in the given area</h1>
      <div
        className="pt-24 min-h-screen"
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
