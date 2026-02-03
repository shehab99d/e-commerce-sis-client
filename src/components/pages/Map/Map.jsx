import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
    return (
        <div className="h-[450px] w-full rounded-xl overflow-hidden">
            <MapContainer
                center={[23.475822, 91.161142]} // Cumilla center updated
                zoom={12}                        // শহর level zoom
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                {/* MAP Tiles */}
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Cumilla Marker */}
                <Marker position={[23.475822, 91.161142]}>
                    <Popup>
                        Cumilla, Bangladesh 🇧🇩 <br />
                        Our Service Area
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
};

export default Map;
