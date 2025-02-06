import React, {useEffect, useState} from 'react';
import VideoPlayer from "./Components/VideoPlayer";
import Chapitrage from "./Components/chapitrage";
import TextChap from "./Components/TextChap";
import Chat from "./Components/WebSocket";
import './App.css';
import "leaflet/dist/leaflet.css";
import MapViewer from "./Components/MapViewer";

function App() {
    const playerRef = React.useRef(null);
    const [jsonData, setjsonData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://iai3-react-34db9d7c5920.herokuapp.com/backend');
                const data = await response.json();
                setjsonData(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const videoOptions = {
        autoplay: false,
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
        return (
            <div>
                {loading ? (
                    <p>Chargement des données...</p>
                ) : error ? (
                    <p>Erreur : {error}</p>
                ) : (
                    <div className="grid grid-col-3 h-screen">
                        <div
                            className="col-start-0 row-span-1 col-span-2 border-2 bg-white shadow-md rounded-lg p-4 m-2 flex flex-col items-center justify-start">
                            {/* Chapitrage centré et limité en taille */}
                            <div className="w-full max-w-3xl text-center overflow-hidden">
                                <Chapitrage Chapters={jsonData.Chapters} playerRef={playerRef}/>
                            </div>

                            {/* VideoPlayer centré et limité en taille */}
                            <div className="w-full max-w-3xl flex justify-center mt-4 min-h-[300px]">
                                <div className="flex justify-center items-center w-full h-full">
                                    <VideoPlayer options={videoOptions} onReady={handlePlayerReady}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-start-3 row-span-0 border-2 bg-white shadow-md rounded-lg p-4 m-2">
                            <Chat playerRef={playerRef}/>
                        </div>
                        <div
                            className="row-start-2 col-start-3 border-2 bg-white shadow-md rounded-lg p-4 m-2 flex justify-center items-center h-full">
                            <MapViewer markers={jsonData.Waypoints || []} playerRef={playerRef}/>
                        </div>


                        <div
                            className="row-start-2 col-start-0 col-span-2 border-2 bg-white shadow-md rounded-lg p-4 m-2">
                            <TextChap Keywords={jsonData.Keywords} playerRef={playerRef}/>

                        </div>
                    </div>
                )}
            </div>
        );
}

export default App;
