import React, { useState } from "react";
import { TextField, Button } from "@mui/material";



/** 
Language
State
Hospital
Departmet
Doctor
Diagnosis
Date
Time
Reason 
Appointment Type - Routine, Walkin, Checkup, Follow Up, Emergency
Description**/
const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    appointment: "",
    state: "",
    Language: "",
    Hospital: "",
    Departmet: "",
    Doctor: "",
    Diagnosis: "",
    Date: "",
    Time: "",
    Reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>

      <TextField
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
        <TextField
        name="State"
        label="State"
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />


<TextField
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
        <TextField
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
        <TextField
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />



      
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
  
    </form >
  );
};

export default AppointmentForm;
