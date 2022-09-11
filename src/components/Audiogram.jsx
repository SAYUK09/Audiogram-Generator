import React from "react";
import { Player } from "@remotion/player";
import { AudiogramComposition } from "../remotion/Composition";
import "../remotion/style.css";
import "../App.css";

function Audiogram() {
  const fps = 30;
  const durationInFrames = 30 * fps;

  return (
    <div className="audiogramParent">
      <div className="audigramContainer">
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

export default Audiogram;
