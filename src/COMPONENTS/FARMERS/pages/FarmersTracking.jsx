import React, { useEffect, useState } from "react";
// import { startVehicleSimulation } from "../utils/VehicleSimulator";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom car icon
const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  iconSize: [32, 32],
});

const FarmersTracking = () => {
  const [vehicleLocation, setVehicleLocation] = useState(null);
  const [products, setProducts] = useState([]);

  const origin = {
    name: "Fwan Pickup Facility",
    lat: 9.8965,
    lng: 8.8583,
  };

  const destination = {
    name: "Tudun Wada street",
    lat: 9.93,
    lng: 8.87,
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "deliveries", "vehicle-001"),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setVehicleLocation(data.currentLocation);
          setProducts(data.items || []);
        }
      }
    );

    // useEffect(() => {
    //   const orderId = "ORD-25-01"; // or dynamic
    //   startVehicleSimulation(orderId);
    // }, []);
    return unsubscribe;
  }, []);

  const renderProgressBar = () => {
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; // Earth radius in km

      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // distance in km
    };

    const renderProgressBar = () => {
      if (!vehicleLocation) return null;

      const totalDistance = calculateDistance(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng
      );

      const distanceCovered = calculateDistance(
        origin.lat,
        origin.lng,
        vehicleLocation.lat,
        vehicleLocation.lng
      );

      const percent = Math.min(
        Math.max((distanceCovered / totalDistance) * 100, 0),
        100
      );

      return (
        <div className='w-full relative h-3 bg-gray-300 rounded-full mt-4 mb-2'>
          <div
            className='h-3 bg-green-600 rounded-full'
            style={{ width: `${percent}%` }}
          ></div>
          <div
            className='absolute -top-5 left-0'
            style={{ left: `calc(${percent}% - 16px)` }}
          >
            <img
              src='https://cdn-icons-png.flaticon.com/512/744/744465.png'
              alt='truck'
              className='w-6'
            />
          </div>
        </div>
      );
    };
  };

  return (
    <div className='p-4 space-y-6'>
      <h2 className='text-xl font-bold'>Tracking System</h2>

      <MapContainer
        center={[origin.lat, origin.lng]}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
        className='rounded-lg'
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[origin.lat, origin.lng]}>
          <Popup>Start: {origin.name}</Popup>
        </Marker>
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>Destination: {destination.name}</Popup>
        </Marker>
        {vehicleLocation && (
          <Marker
            position={[vehicleLocation.lat, vehicleLocation.lng]}
            icon={carIcon}
          >
            <Popup>Vehicle is here</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className='flex justify-between text-sm text-gray-600 px-1'>
        <span>
          Start
          <br />
          {origin.name}
        </span>
        <span className='text-right'>
          Your Destination
          <br />
          {destination.name}
        </span>
      </div>

      {renderProgressBar()}

      <div className='mt-4'>
        <h3 className='text-lg font-semibold mb-2'>Products In Transit</h3>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border'>
            <thead className='bg-green-100'>
              <tr>
                <th className='p-2'>Order ID</th>
                <th className='p-2'>Product</th>
                <th className='p-2'>Farmer</th>
                <th className='p-2'>Quantity</th>
                <th className='p-2'>Total Price</th>
                <th className='p-2'>Date</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, idx) => (
                <tr key={idx} className='border-t hover:bg-gray-50'>
                  <td className='p-2'>{prod.orderId}</td>
                  <td className='p-2'>{prod.product}</td>
                  <td className='p-2'>{prod.farmer}</td>
                  <td className='p-2'>{prod.quantity}</td>
                  <td className='p-2'>₦{prod.totalPrice}</td>
                  <td className='p-2'>{prod.date}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan='6' className='p-2 text-center text-gray-500'>
                    No products currently in transit
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmersTracking;
