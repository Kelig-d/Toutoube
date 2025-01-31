import React from 'react';
import VideoPlayer from "./VideoPlayer";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import Chat from "./WebSocket";


function Test(thing) {
     const playerRef = React.useRef(null);
    
        const videoOptions = {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
                src: 'https://ia800900.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4',
                type: 'video/mp4'
            }]
        };
    
        const handlePlayerReady = (player) => {
            playerRef.current = player;
    
        };
        React.createContext()   
    return (
    <div class="grid grid-col-3 h-screen">
        <div class="col-start-0 row-span-1 col-span-2 border-2">
            <div className="flex-1 shrink max-w-screen-lg">

            {loading ? (
                                <p>Chargement des données...</p>
                            ) : error ? (
                                <p>Erreur : {error}</p>
                            ) : (
                                <Chapitrage Chapters={jsonData.Chapters}  playerRef={playerRef}/>

                            )}


<div className="flex-1 shrink max-w-screen-lg">
                                    <VideoPlayer options={videoOptions} onReady={handlePlayerReady} />
                            </div>
                            {loading ? (
                                <p>Chargement des données...</p>
                            ) : error ? (
                                <p>Erreur : {error}</p>
                            ) : (
                                <TextChap Keywords={jsonData.Keywords} playerRef={playerRef}/>

                            )}

            </div>
        </div>
        <div class="col-start-3 row-span-0 border-2">                                 
            <Chat playerRef={playerRef}/>
         </div>
        <div class="row-start-2 col-start-3 border-2"> 
        {loading ? (
                                <p>Chargement des données...</p>
                            ) : error ? (
                                <p>Erreur : {error}</p>
                            ) : (
                                    <MapViewer markers={jsonData.Waypoints || []} playerRef={playerRef} />

                            )}
        </div>
        <div class="row-start-2 col-start-0 col-span-2 border-2"> 
        {loading ? (
                                <p>Chargement des données...</p>
                            ) : error ? (
                                <p>Erreur : {error}</p>
                            ) : (
                                <TextChap Keywords={jsonData.Keywords} playerRef={playerRef}/>

                            )}

        </div>
     

    </div>
  );
}

export default Test;

