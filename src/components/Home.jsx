import React, { useRef } from "react";
import "../App.css";
import { useAudiogram } from "../contexts/audiogramContext";
import { Link } from "react-router-dom";

function Home() {
  const { audigramDetails, setAudigramDetails } = useAudiogram();

  const audioInput = useRef();
  const imageInput = useRef();
  const titleInput = useRef();
  const srtFileInput = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    // get the uploaded image url
    const imgFile = new FormData();
    imgFile.append("image", imageInput.current.files[0]);

    const imageResult = await fetch(
      "https://greenshrillboard.sayuk.repl.co/upload-image",

      {
        method: "POST",
        body: imgFile,
      }
    );

    const imgData = await imageResult.json();

    // get the uploaded audio url
    const audioFile = new FormData();
    audioFile.append("audio", audioInput.current.files[0]);

    const audioResult = await fetch(
      "https://greenshrillboard.sayuk.repl.co/upload-audio",

      {
        method: "POST",
        body: audioFile,
      }
    );
    const audioData = await audioResult.json();

    // get the uploaded srt url
    const srtFile = new FormData();
    srtFile.append("srt", srtFileInput.current.files[0]);

    const srtResult = await fetch(
      "https://greenshrillboard.sayuk.repl.co/upload-srt",

      {
        method: "POST",
        body: srtFile,
      }
    );
    const srtData = await srtResult.json();

    // update the context data
    setAudigramDetails({
      title: titleInput.current.value,
      cover: imgData.url,
      audio: audioData.url,
      srtFile: srtData.url,
    });
  }

  return (
    <div className="homeParent">
      <div className="formParentContainer">
        <h1>Audiogram Generator</h1>
        <form className="formContainer" onSubmit={handleSubmit}>
          <label>
            Enter title:
            <input ref={titleInput} className="titleInput" type="text" />
          </label>

          <label>
            Select Image:
            <input
              className=" imgBtn"
              accept="image/*"
              type={"file"}
              ref={imageInput}
            />
          </label>

          <label>
            Select Audio:
            <input
              className=" audioInp"
              accept="audio/*"
              type={"file"}
              ref={audioInput}
            />
          </label>

          <label>
            Select SRT File:
            <input className=" audioInp" type={"file"} ref={srtFileInput} />
          </label>

          <div className="submitBtnContainer">
            <button className=" submitBtn" type="submit">
              Generate Audiogram
            </button>
          </div>
        </form>

        <div className="redirectBtnContainer">
          {audigramDetails.audio && (
            <Link to="/audiogram">
              <button className="redirectBtn">Go to Audiogram Player</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
