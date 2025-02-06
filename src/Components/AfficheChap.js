import React, { useState } from "react";

function Fiches(props){
    const [toShow, setToShow] = useState(null)  
   
    function handleClick(url){
        if(toShow === url) setToShow(null)
        else setToShow(url)
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
          {(()=> {
              if(toShow) {
                  return (<iframe
                      width="560"
                      height="315"
                      src={toShow}
                      allowFullScreen
                      title="Contenu"
                  ></iframe>)
              }
          })()}

      </div>
    );
}

export default Fiches