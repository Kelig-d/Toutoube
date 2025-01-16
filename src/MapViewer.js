import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

function MapViewer(props){
    return(
        <div className="max-w-xl h-96 max-h-xl">
            <MapContainer center={[151.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.markers.map((marker,_) =>{
                    return(
                        <Marker position={[marker['lat'], marker['lng']]}>
                            <Popup>
                                {marker['label']}
                            </Popup>
                        </Marker>
                    );
                })}

            </MapContainer>
        </div>
    );
}
export default MapViewer;