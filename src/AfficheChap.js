import React, { useState, useEffect } from "react";

function Fiches(props){
    const [toShow, setToShow] = useState(null)  
   
    function handleClick(url){
        setToShow(url)
    }

    return (
      <div>
        {props.dataToShow.data.map((Data, index) => (
          <button
            key={index}
            className="space-x-1"
            onClick={() => handleClick(Data.url)}
            >
            {Data.title}
          </button>
        ))}
  
        <iframe
            width="560"
            height="315"
            src={toShow}
            frameBorder="0"
            allowFullScreen
            title="Contenu"
          ></iframe>
      </div>
    );
  }

export default Fiches