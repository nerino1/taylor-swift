// @flow
import "../style/LyricsModal.css";
import React from "react";

const lyricsJSON = require("../taylor-swift-lyrics/lyrics.json");

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

  // Find the raw album key by searching lyricsJSON for the song
  let rawAlbum = album;
  let songLines = [];
  for (const albumKey in lyricsJSON) {
    if (lyricsJSON[albumKey][song] !== undefined) {
      rawAlbum = albumKey;
      songLines = lyricsJSON[albumKey][song];
      break;
    }
  }

  // Reconstruct ordered lyrics from the linked-list structure
  // Each line has: lyric, prev, next
  const buildLyricsList = (lines) => {
    // Find the first line (prev === "")
    const first = lines.find((l) => l.prev === "");
    if (!first) return lines.map((l) => l.lyric);

    const ordered = [];
    let current = first;
    const visited = new Set();

    while (current && !visited.has(current.lyric)) {
      visited.add(current.lyric);
      ordered.push(current.lyric);
      if (!current.next || current.next === "") break;
      const nextLine = lines.find((l) => l.lyric === current.next && !visited.has(l.lyric));
      if (!nextLine) break;
      current = nextLine;
    }

    return ordered;
  };

  const orderedLyrics = buildLyricsList(songLines);

  return (
    <div className="LyricsModal-overlay" onClick={handler}>
      <div
        className="LyricsModal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="LyricsModal-close" onClick={handler} aria-label="Close">
          ✕
        </button>
        <h2 className="LyricsModal-title">{song}</h2>
        <p className="LyricsModal-album"><i>{rawAlbum !== "NaN" ? rawAlbum : ""}</i></p>
        <div className="LyricsModal-lyrics">
          {orderedLyrics.map((line, i) => (
            <p key={i} className={line === "" ? "LyricsModal-break" : "LyricsModal-line"}>
              {line === "" ? "\u00A0" : line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
