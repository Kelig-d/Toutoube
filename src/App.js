import React, {useEffect, useState} from 'react'
import VideoPlayer from "./VideoPlayer";
import './App.css';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"



function App() {
    const playerRef = React.useRef(null)
    const [jsonData, setjsonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
                const response = await fetch('https://iai3-react-34db9d7c5920.herokuapp.com/backend');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des données');
                }
                const data = await response.json();
                setjsonData(data); // Met à jour les données JSON

        };

        fetchData();
    }, []);
    console.log(jsonData);
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
        React.createContext()
        return (
            <div>

                <div className="flex-1 shrink max-w-screen-lg">
                    <VideoPlayer options={videoOptions} onReady={handlePlayerReady}/>
                </div>
                <div className="max-w-xl h-96 max-h-xl">
                    <MapContainer center={[151.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>

            </div>

        );
}

export default App;
