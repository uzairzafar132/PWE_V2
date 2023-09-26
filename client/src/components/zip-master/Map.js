// import React, { useState, useEffect } from "react";
// import Geocode from "react-geocode";

// const MyComponent = () => {
//   const [zipCode, setZipCode] = useState("");
//   const [nearestLocation, setNearestLocation] = useState("");
//    const [facilities, setFacilities] = useState([]);

//   const referenceLocations = [
//     { name: "New York", location: { lat: 40.7128, lng: -74.006 } },
//     { name: "New Mexico", location: { lat: 34.5199, lng: -105.8701 } },
    
//     { name: "Utah", location: { lat: 39.32098, lng: -111.09373 } },
//     { name: "California", location: { lat: 36.7783, lng: -119.4179 } },
//     { name: "Los Angeles", location: { lat: 34.0522, lng: -118.2437 } },
//     { name: "New Jersey", location: { lat: 40.0583, lng: -74.4057 } },
//   ];

  // const calculateDistance = (pointA, pointB) => {
  //   const earthRadius = 6371; // Radius of the Earth in kilometers
  //   const latDiff = toRadians(pointB.lat - pointA.lat);
  //   const lngDiff = toRadians(pointB.lng - pointA.lng);

  //   const a =
  //     Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
  //     Math.cos(toRadians(pointA.lat)) *
  //       Math.cos(toRadians(pointB.lat)) *
  //       Math.sin(lngDiff / 2) *
  //       Math.sin(lngDiff / 2);

  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = earthRadius * c;

  //   return distance;
  // };

  // const toRadians = (angle) => {
  //   return (angle * Math.PI) / 180;
  // };

//   const findNearestLocation = async () => {
//     try {
//       const response = await Geocode.fromAddress(zipCode);

//       const userLocation = {
//         lat: response.results[0].geometry.location.lat,
//         lng: response.results[0].geometry.location.lng,
//       };

//       let nearestLocation = "";
//       let minDistance = Number.MAX_VALUE;

//       referenceLocations.forEach((location) => {
//         const distance = calculateDistance(userLocation, location.location);

//         if (distance < minDistance) {
//           minDistance = distance;
//           nearestLocation = location.name;
//         }
//       });

//       setNearestLocation(nearestLocation);
//     } catch (error) {
//       console.error("Error finding nearest location:", error);
//     }
//   };

//   useEffect(() => {
//     // Set your Geocode API key
//     Geocode.setApiKey("AIzaSyDihjlsQBhobL-yjSh0RTSSnNpCSk4SSnA");

//     if (zipCode !== "") {
//       findNearestLocation();
//     }
//   }, [zipCode]);

//   const handleZipCodeChange = (event) => {
//     setZipCode(event.target.value);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // Trigger search for nearest location
//     if (zipCode !== "") {
//       findNearestLocation();
//     }
//   };


   

    // useEffect(() => {
    //   // Function to fetch data from the server
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch("http://localhost:5000/api/facilities"); // Replace with your server URL
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       const data = await response.json();
    //       setFacilities(data);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };

    //   fetchData();
    // }, []);

    // console.log(facilities);

//   return (
//     <div>
//       <h1>Find Nearest Location</h1>
//       <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           value={zipCode}
//           onChange={handleZipCodeChange}
//           placeholder="Enter ZIP code"
//         />
//         <button type="submit">Search</button>
//       </form>
//       {nearestLocation && <p>Nearest Location: {nearestLocation}</p>}
//     </div>
//   );
// };

// export default MyComponent;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Geocode from "react-geocode"; // Make sure to install 'react-geocode' package

// ... Other Material-UI imports ...
import { Container, Typography, TextField, Button } from "@mui/material";

// ... Your existing calculateDistance and toRadians functions ...

const App = () => {
  const [zipCode, setZipCode] = useState("");
  const [nearestLocation, setNearestLocation] = useState("");
  const [facilities, setFacilities] = useState([]);



  const findNearestPhysicianCity = async (userLocation) => {
    let nearestCity = "";
    let minDistance = Number.MAX_VALUE;

    for (const facility of facilities) {
      if (!facility.zip) continue;

      try {
        const response = await Geocode.fromAddress(facility.zip);

        const facilityLocation = {
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
        };

        const distance = calculateDistance(userLocation, facilityLocation);

        if (distance < minDistance) {
          minDistance = distance;
          nearestCity = facility.facilityName;
        }
      } catch (error) {
        console.error(
          `Error geocoding facility with zip code ${facility.zip}:`,
          error
        );
      }
    }

    return nearestCity;
  };

  const findNearestLocation = async () => {
    try {
      const response = await Geocode.fromAddress(zipCode);

      const userLocation = {
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng,
      };

      const nearestPhysicianCity = await findNearestPhysicianCity(userLocation);
      setNearestLocation(nearestPhysicianCity);
    } catch (error) {
      console.error("Error finding nearest location:", error);
    }
  };

  useEffect(() => {
    // Set your Geocode API key AIzaSyDihjlsQBhobL-yjSh0RTSSnNpCSk4SSnA
    Geocode.setApiKey("");

    if (zipCode !== "") {
      findNearestLocation();
    }
  }, [zipCode]);

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Trigger search for the nearest physician city
    if (zipCode !== "") {
      findNearestLocation();
    }
  };

      useEffect(() => {
        // Function to fetch data from the server
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://localhost:5000/api/facilities"
            ); // Replace with your server URL
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setFacilities(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();
      }, []);

      console.log(facilities);

        const calculateDistance = (pointA, pointB) => {
          const earthRadius = 6371; // Radius of the Earth in kilometers
          const latDiff = toRadians(pointB.lat - pointA.lat);
          const lngDiff = toRadians(pointB.lng - pointA.lng);

          const a =
            Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
            Math.cos(toRadians(pointA.lat)) *
              Math.cos(toRadians(pointB.lat)) *
              Math.sin(lngDiff / 2) *
              Math.sin(lngDiff / 2);

          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = earthRadius * c;

          return distance;
        };

        const toRadians = (angle) => {
          return (angle * Math.PI) / 180;
        };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Find Nearest Physician City
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Enter Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
          variant="outlined"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Find Nearest Physician City
        </Button>
      </form>
      {nearestLocation && (
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Nearest Physician City: {nearestLocation}
        </Typography>
      )}
    </Container>
  );
};

export default App;
