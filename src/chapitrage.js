import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

function chapitrage(props) {
   
    console.log("Verif" + props)

    return (
        <div class="grid grid-cols-4 gap-4">
        {props.Chapters.map((Chapters,_) =>{
                        return(
                            <div>
                                <button class="space-x-1" onClick={()=>{  props.playerRef.current.currentTime(parseInt(Chapters['pos']))}}>
                      {Chapters.title}</button>
                            </div>
                        );
                    })}
              
                </div>
    );
}

export default chapitrage;