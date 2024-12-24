import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    language: "",
    hospital: "",
    department: "",
    doctor: "",
    diagnosis: "",
    date: "",
    time: "",
    reason: "",
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
        fullWidth
      />
      <TextField
        name="state"
        label="State"
        variant="outlined"
        margin="normal"
        value={formData.state}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="language"
        label="Language"
        variant="outlined"
        margin="normal"
        value={formData.language}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="hospital"
        label="Hospital"
        variant="outlined"
        margin="normal"
        value={formData.hospital}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="department"
        label="Department"
        variant="outlined"
        margin="normal"
        value={formData.department}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="doctor"
        label="Doctor"
        variant="outlined"
        margin="normal"
        value={formData.doctor}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="diagnosis"
        label="Diagnosis"
        variant="outlined"
        margin="normal"
        value={formData.diagnosis}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="date"
        label="Date"
        type="date"
        variant="outlined"
        margin="normal"
        value={formData.date}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
      <TextField
        name="time"
        label="Time"
        type="time"
        variant="outlined"
        margin="normal"
        value={formData.time}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
      <TextField
        name="reason"
        label="Reason"
        variant="outlined"
        margin="normal"
        value={formData.reason}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AppointmentForm;
