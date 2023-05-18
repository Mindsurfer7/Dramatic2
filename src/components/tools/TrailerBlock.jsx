import YouTube from "react-youtube";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_Key } from "../Home";

const TrailerBlock = ({ trailerURL, isPlaying }) => {
  const opts = {
    playerVars: {
      autoplay: isPlaying ? true : false,
    },
  };

  return trailerURL && <YouTube videoId={trailerURL} opts={opts} />;
};
export default TrailerBlock;
