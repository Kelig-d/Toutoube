import React from 'react'
import VideoPlayer from "./VideoPlayer";
import './App.css';

function App() {
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
        <div className="flex-1 shrink max-w-screen-lg">
            <VideoPlayer options={videoOptions} onReady={handlePlayerReady} />
        </div>
)
    ;
}

export default App;
