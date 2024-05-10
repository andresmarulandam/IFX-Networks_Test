import React from 'react';

const ExpandedComponent = ({ data }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    }}
  >
    <div style={{ marginBottom: '10px', marginRight: '50px' }}>
      <strong>Email:</strong> {data.email}
    </div>
    <div style={{ marginBottom: '10px', marginRight: '50px' }}>
      <strong>Phone:</strong> {data.phone}
    </div>
    <div style={{ marginBottom: '10px', marginRight: '50px' }}>
      <strong>Address:</strong>
      <p>City: {data.address.city}</p>
      <p>Street: {data.address.street}</p>
      <p>Number: {data.address.number}</p>
      <p>ZipCode: {data.address.zipcode}</p>
    </div>
    <div style={{ marginBottom: '10px', marginRight: '50px' }}>
      <strong>Geolocation:</strong>
      <p>Latitude: {data.address.geolocation.lat}</p>
      <p>Longitude: {data.address.geolocation.long}</p>
    </div>
  </div>
);

export default ExpandedComponent;
