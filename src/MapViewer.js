import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';

function MapViewer(props) {
    const LeafIcon = new L.Icon({
        iconUrl: require('./img/pin.png'),
        iconSize: new L.Point(75, 75),
        iconAnchor: [37.5, 75],
        className: 'leaflet-div-icon',
    });

    return (
        <div className="w-full h-full">
            <MapContainer
                center={[props.markers[0]['lat'], props.markers[0]['lng']]}
                zoom={3}
                scrollWheelZoom={true}
                className="w-full h-[500px]" // Assurez-vous que la carte prend toute la largeur et une hauteur spécifique
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.markers.map((marker, _) => {
                    return (
                        <Marker
                            position={[marker['lat'], marker['lng']]}
                            icon={LeafIcon}
                            eventHandlers={{
                                click: () => {
                                    props.playerRef.current.currentTime(parseInt(marker['timestamp']));
                                },
                            }}
                        >
                            <Popup>{marker['label']}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default MapViewer;