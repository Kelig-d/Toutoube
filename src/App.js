import React, {useEffect, useState} from 'react';
import VideoPlayer from "./VideoPlayer";
import Chapitrage from "./chapitrage";
import TextChap from "./TextChap";
import Chat from "./WebSocket";
import './App.css';
import "leaflet/dist/leaflet.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapViewer from "./MapViewer";

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
                <Container>
                    <Row className='mt-5'>
                        <Col sm={8}>
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
                        </Col>
                        <Col sm={4}>
                            <div className="h-96 ">
                                <Chat playerRef={playerRef}/>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col>
                            {loading ? (
                                <p>Chargement des données...</p>
                            ) : error ? (
                                <p>Erreur : {error}</p>
                            ) : (
                                    <MapViewer markers={jsonData.Waypoints || []} playerRef={playerRef} />

                            )}
                        </Col>
                    </Row>
                </Container>
        </div>
    );
}

export default App;
