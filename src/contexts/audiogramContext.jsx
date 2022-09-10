import React, { createContext, useState, useContext } from "react";

const AudigramContext = createContext();

export function AudiogramProvider({ children }) {
  const [audigramDetails, setAudigramDetails] = useState({
    title: "",
    cover: "",
    audio:
      "https://res.cloudinary.com/sayuk/video/upload/v1662829192/clip_wiafmb.mp3",
    srtFile: "clip.mp3.srt",
  });

  console.log(audigramDetails, "dee");

  return (
    <AudigramContext.Provider value={{ audigramDetails, setAudigramDetails }}>
      {children}
    </AudigramContext.Provider>
  );
}

export function useAudiogram() {
  return useContext(AudigramContext);
}
