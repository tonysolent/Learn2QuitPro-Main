import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

const SmokingCentersMap = ({ centers }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null); 
  const dropdownRef = useRef(null); 
  const mapRef = useRef(null); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  
  const handleCenterChange = (event) => {
    const center = centers.find(c => c.name === event.target.value);
    setSelectedCenter(center);
    if (mapRef.current && center) {
      mapRef.current.setView([center.lat, center.lng], mapRef.current.getZoom());
    }
  };


  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; 
    return d.toFixed(1);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  
  const handleClick = (e) => {
    e.stopPropagation();
  };

  
  const noSmokingMarkerIcon = L.divIcon({
    className: 'no-smoking-marker-icon',
    html: '🚭',
  });

  return (
    <div style={{ position: 'relative' }}> 
      <select
        ref={dropdownRef}
        onChange={handleCenterChange}
        value={selectedCenter ? selectedCenter.name : ''}
        style={{
          position: 'absolute',
          zIndex: 1000,
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff',
          right: '20px', 
          top: '20px' 
        }}
      >
        <option value="">Select a center</option>
        {centers.map((center, index) => (
          <option key={index} value={center.name}>{center.name}</option>
        ))}
      </select>
      {typeof window !== 'undefined' && (
        <MapContainer
          center={userLocation || [51.505, -0.09]}
          zoom={13}
          style={{ height: 'calc(100vh - 40px)', width: '100%' }}
          ref={mapRef} 
          onClick={handleClick} 
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {centers.map((center, index) => {
            const distance = userLocation ? calculateDistance(userLocation[0], userLocation[1], center.lat, center.lng) : '';
            return (
              <Marker key={index} position={[center.lat, center.lng]} icon={noSmokingMarkerIcon}>
                {selectedCenter && selectedCenter.name === center.name && (
                  <Popup>
                    <div>
                      <h3>{center.name}</h3>
                      <p>{distance ? `Distance: ${distance} miles away` : ''}</p>
                      <p>{center.address}</p>
                    </div>
                  </Popup>
                )}
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default SmokingCentersMap;
