// @flow
import "../style/LyricsModal.css";
import React from "react";

const songsJSON = require("../taylor-swift-lyrics/songs.json");

type LyricsModalProps = {
  song: string,
  album: string,
  display: boolean,
  handler: () => void,
};

export default function LyricsModal({
  song,
  album,
  display,
  handler,
}: LyricsModalProps): React$MixedElement {
  if (!display) return <></>;

  let rawLyrics = "";
  for (const albumKey in songsJSON) {
    if (songsJSON[albumKey][song] !== undefined) {
      rawLyrics = songsJSON[albumKey][song];
      break;
    }
  }

  const lines = rawLyrics.split("\n");

  return (
    <div className="LyricsModal-overlay" onClick={handler}>
      <div className="LyricsModal" onClick={(e) => e.stopPropagation()}>
        <button className="LyricsModal-close" onClick={handler} aria-label="Close">
          ✕
        </button>
        <h2 className="LyricsModal-title">{song}</h2>
        <p className="LyricsModal-album"><i>{album !== "NaN" ? album : ""}</i></p>
        <div className="LyricsModal-lyrics">
          {lines.map((line, i) => (
            <p key={i} className={line.startsWith("[") ? "LyricsModal-section" : "LyricsModal-line"}>
              {line === "" ? "\u00A0" : line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
