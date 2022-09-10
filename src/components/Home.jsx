import React, { useState, useRef } from "react";
import "../App.css";
import { useAudiogram } from "../contexts/audiogramContext";
import { AudiogramComposition } from "../remotion/Composition";
import { Player } from "@remotion/player";

function Home() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState();
  const [audio, setAudio] = useState();

  const fps = 30;
  const durationInFrames = 30 * fps;

  const { audigramDetails, setAudigramDetails } = useAudiogram();
  console.log(audigramDetails);
  const audioInput = useRef();
  const imageInput = useRef();

  function handleTitleInput(e) {
    setTitle(e.target.value);
  }

  function handleImgUpload() {}

  function handleAudioUpload() {}

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(imageInput.current.files[0]);
    console.log(audioInput.current.files[0]);

    const imgFile = new FormData();
    const audioFile = new FormData();

    imgFile.append("image", imageInput.current.files[0]);
    audioFile.append("audio", audioInput.current.files[0]);

    const imageResult = await fetch(
      "https://greenshrillboard.sayuk.repl.co/upload-image",

      {
        method: "POST",
        body: imgFile,
      }
    );

    const imgData = await imageResult.json();

    const audioResult = await fetch(
      "https://greenshrillboard.sayuk.repl.co/upload-audio",

      {
        method: "POST",
        body: audioFile,
      }
    );

    const audioData = await audioResult.json();

    console.log(audioData);

    setAudigramDetails({
      title: title,
      cover: imgData.url,
      audio:
        "https://res.cloudinary.com/sayuk/video/upload/v1662829192/clip_wiafmb.mp3",
      srtFile: "clip.mp3.srt",
    });

    console.log(audigramDetails);
  }

  return (
    <div>
      <div className="">
        <form className="formContainer" onSubmit={handleSubmit}>
          <input
            onChange={handleTitleInput}
            className="titleInput"
            type="text"
          />

          <label>
            Select Image:
            <input className="imgBtn" type={"file"} ref={imageInput} />
          </label>

          <label>
            Select Audio:
            <input className="audioInp" type={"file"} ref={audioInput} />
          </label>

          <button type="submit">Generate Audiogram</button>
        </form>
      </div>

      {audigramDetails.title && (
        <Player
          component={AudiogramComposition}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: 1280,
            height: 720,
          }}
          controls
        />
      )}
    </div>
  );
}

export default Home;
