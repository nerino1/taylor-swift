// @flow
import "../style/SongLyric.css";
import { boldQueries } from "./utils.js";
import LyricsModal from "./LyricsModal.js";
import React, { useState } from "react";

type SongLyricProps = {
  album: string,
  song: string,
  prev: string,
  lyric: string,
  next: string,
  queries: Array<string>,
};

export default function SongLyric({
  album,
  song,
  prev,
  lyric,
  next,
  queries,
}: SongLyricProps): React$MixedElement {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="SongLyric">
      <LyricsModal
        song={song}
        album={album}
        display={showModal}
        handler={() => setShowModal(false)}
      />
      <p>
        {prev}
        {prev.length > 0 ? <br /> : ""}
        <span
          className="lyric"
          dangerouslySetInnerHTML={{
            __html: boldQueries(lyric, queries),
          }}
        />
        {next.length > 0 ? <br /> : ""}
        {next}
      </p>
      <button
        className="SongLyric-songlink"
        onClick={() => setShowModal(true)}
      >
        {song}
      </button>
      {album !== "NaN" ? "," : ""} <i>{album !== "NaN" ? album : ""}</i>
      <hr></hr>
    </div>
  );
}
