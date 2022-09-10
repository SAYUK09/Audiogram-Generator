// import parseSRT, { SubtitleItem } from "parse-srt";
import React, { useEffect, useMemo, useRef, useState } from "react";
import parseSRT from "parse-srt";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
  VideoConfig,
} from "remotion";
import { ensureFont } from "./ensure-font";

const useWindowedFrameSubs = (src, options = {}) => {
  const { windowStart = -Infinity, windowEnd = Infinity } = options;
  const config = useVideoConfig();
  const { fps } = config;

  return useMemo(() => {
    const subsWithSeconds = parseSRT(src);

    const subsWithFrameNumbers = subsWithSeconds.reduce((acc, item) => {
      const start = Math.floor(item.start * fps);
      const end = Math.floor(item.end * fps);

      if (start < windowStart || start > windowEnd) return acc;

      return [
        ...acc,
        {
          ...item,
          start,
          end,
        },
      ];
    }, []);
    return subsWithFrameNumbers;
  }, [fps, src, windowEnd, windowStart]);
};

export const Subtitles = ({
  startFrame,
  endFrame,
  src,
  renderSubtitleItem = (item) => <span>{item.text}</span>,
}) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const subtitles = useWindowedFrameSubs(src, {
    windowStart: startFrame,
    windowEnd: endFrame,
  });

  return (
    <>
      {subtitles.map((item) => (
        <React.Fragment key={item.id}>
          {renderSubtitleItem(item, frame, config)}
        </React.Fragment>
      ))}
    </>
  );
};

const ZOOM_MEASURER_SIZE = 10;
export const LINE_HEIGHT = 98;

export const PaginatedSubtitles = ({
  startFrame,
  endFrame,
  src,
  renderSubtitleItem = (item) => <span>{item.text}</span>,
  linesPerPage,
}) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const windowRef = useRef();
  const zoomMeasurer = useRef();
  const [handle] = useState(() => delayRender());
  const [fontHandle] = useState(() => delayRender());
  const [fontLoaded, setFontLoaded] = useState(false);
  const subtitles = useWindowedFrameSubs(src, {
    windowStart: startFrame,
    windowEnd: endFrame,
  });

  const [lineOffset, setLineOffset] = useState(0);

  const currentSubtitleItem = subtitles
    .slice()
    .reverse()
    .find((item) => item.start < frame);

  useEffect(() => {
    if (!fontLoaded) {
      return;
    }
    const zoom =
      zoomMeasurer.current?.getBoundingClientRect().height / ZOOM_MEASURER_SIZE;
    const linesRendered =
      windowRef.current?.getBoundingClientRect().height / (LINE_HEIGHT * zoom);
    const linesToOffset = Math.max(0, linesRendered - linesPerPage);
    setLineOffset(linesToOffset);
    continueRender(handle);
  }, [fontLoaded, frame, handle, linesPerPage]);

  useEffect(() => {
    ensureFont().then(() => {
      continueRender(fontHandle);
      setFontLoaded(true);
    });
  }, [fontHandle, fontLoaded]);

  const lineSubs = (() => {
    const finalLines = [];
    const lineIndex = 0;

    for (let i = 0; i < subtitles.length; i++) {
      const subtitleItem = subtitles[i];

      if (subtitleItem.start >= frame) continue;

      finalLines[lineIndex] = [...(finalLines[lineIndex] ?? []), subtitleItem];
    }

    return finalLines;
  })();

  const currentLineIndex = Math.max(
    0,
    lineSubs.findIndex((l) => l.includes(currentSubtitleItem))
  );

  const startLine = Math.max(0, currentLineIndex - (linesPerPage - 1));

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={windowRef}
        style={{
          transform: `translateY(-${lineOffset * LINE_HEIGHT}px)`,
        }}
      >
        {lineSubs
          .slice(startLine, startLine + linesPerPage)
          .reduce((subs, item) => [...subs, ...item], [])
          .map((item) => (
            <span key={item.id} id={String(item.id)}>
              {renderSubtitleItem(item, frame, config)}
            </span>
          ))}
      </div>
      <div
        ref={zoomMeasurer}
        style={{ height: ZOOM_MEASURER_SIZE, width: ZOOM_MEASURER_SIZE }}
      />
    </div>
  );
};
