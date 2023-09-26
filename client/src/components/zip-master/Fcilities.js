import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const FacilityForm = () => {
   const [facilityData, setFacilityData] = useState({
     facilityName: "",
     address: "",
     city: "",
     state: "",
     zipCode: "",
     assignedPhysician: "",
   });
   
  const [facilities, setFacilities] = useState([]);

   const handleInputChange = (event) => {
     const { name, value } = event.target;
     setFacilityData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };

   const handleSubmit = async (event) => {
     event.preventDefault();
     try {
       // Make a POST request to the server API
       const response = await axios.post(
         "http://localhost:5000/api/facilities",
         facilityData
       );
       console.log("Response:", response.data);
       // Reset the form after successful submission
       setFacilityData({
         facilityName: "",
         address: "",
         city: "",
         state: "",
         zipCode: "",
         assignedPhysician: "",
       });
     } catch (error) {
       console.error("Error submitting data:", error);
     }
   };

   const fetchFacilitiesData = async () => {
     try {
       const response = await axios.get("http://localhost:5000/api/facilities");
       setFacilities(response.data);
     } catch (error) {
       console.error("Error fetching facilities data:", error);
     }
   };

   useEffect(() => {
     fetchFacilitiesData();
   }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Facility Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Facility Name"
          name="facilityName"
          value={facilityData.facilityName}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          name="address"
          value={facilityData.address}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="City"
          name="city"
          value={facilityData.city}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="State"
          name="state"
          value={facilityData.state}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          value={facilityData.zipCode}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Assigned Physician"
          name="assignedPhysician"
          value={facilityData.assignedPhysician}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Facility Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Assigned Physician</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility) => (
              <TableRow key={facility._id}>
                <TableCell>{facility.facilityName}</TableCell>
                <TableCell>{facility.address}</TableCell>
                <TableCell>{facility.city}</TableCell>
                <TableCell>{facility.state}</TableCell>
                <TableCell>{facility.zip}</TableCell>
                <TableCell>{facility.assignedPhysician}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FacilityForm;
