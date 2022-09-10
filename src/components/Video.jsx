import React from "react";
import { Player } from "@remotion/player";
import { MyComp } from "../remotion/MyComp";
import { Composition } from "remotion";
import { AudiogramComposition } from "../remotion/Composition";
import "../remotion/style.css";

function Video() {
  const fps = 30;
  const durationInFrames = 30 * fps;

  return (
    <div>
      <h1>VIDEO</h1>

      <div>
        <h1>Hello There</h1>

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
      </div>
    </div>
  );
}

export default Video;
