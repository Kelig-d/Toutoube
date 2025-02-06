import React, { useState, useEffect } from "react";
import Fiches from "./AfficheChap"

function TextChap(props) {
  const [dataToShow, setDataToShow] = useState(props.Keywords[0]);

  useEffect(() => {
    const player = props.playerRef?.current;

    if (!player) {
      console.error("playerRef.current est null");
      return;
    }

    const handleTimeUpdate = () => {
      const currentTime = Math.floor(player.currentTime());
      const dataget = props.Keywords.find(i => parseInt(i.pos) === currentTime);
      
      if (dataget) {
        setDataToShow(dataget);
      }
    };

    player.on("timeupdate", handleTimeUpdate);

  }, [props.playerRef, props.Keywords]);

  return (
    <div>
      <Fiches dataToShow={dataToShow} />

      
    </div>
  );
}




export default TextChap;

