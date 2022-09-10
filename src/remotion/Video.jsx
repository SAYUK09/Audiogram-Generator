import React from "react";
import { Composition } from "remotion";
import { AudiogramComposition } from "./Composition";
import { MyComp } from "./MyComp";
import "./style.css";

export const MyVideo = () => {
  const fps = 30;
  const durationInFrames = 30 * fps;
  return (
    <>
      <Composition
        component={MyComp}
        durationInFrames={120}
        width={1920}
        height={1080}
        fps={30}
        id="my-commmmp"
        defaultProps={{ text: "World" }}
      />

      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1080}
      />
    </>
  );
};
