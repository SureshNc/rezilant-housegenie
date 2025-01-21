import React, { useState, useEffect } from 'react';
import locationPin from '../../../images/location-pin.svg';

const PropertyMap = ({ latitude, longitude }) => {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        // Dynamically load Google Maps API script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAVy6A-wSAyb4Exeo2GzSHPyfmOd0S9kM0&libraries=places`;
        script.async = true;
        script.onload = () => setMapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (mapLoaded) {
            initMap_AdvancedMarkerElement();
        }
    }, [mapLoaded]);

    const initMap_AdvancedMarkerElement = () => {
        const myLatLng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
        const map = new window.google.maps.Map(document.getElementById("AdvancedMarker_MAP"), {
            zoom: 16,
            center: myLatLng,
            disableDefaultUI: true,
            mapId: "DEMO_MAP_ID",
        });

        new window.google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: locationPin,
        });
    };

    return (
        <div id="AdvancedMarker_MAP" style={{ width: '100%', height: '300px' }}>
            {/* Map will be rendered here */}
        </div>
    );
};

export default PropertyMap;
