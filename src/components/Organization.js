import React, { useState } from "react";
import { Grid, TextField, Box, Button } from "@mui/material";

const Organization = () => {
  const [formData, setFormData] = useState({
    organization: "",
    location: "",
    facility: "",
    date: "",
    drname: "",
  });

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData); 
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 500,
      }}
    >
      <Box
        sx={{
          maxHeight: "80vh",
          overflow: "auto",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Enter Organization Name"
              label="Organization Name"
              value={formData.organization}
              onChange={handleChange("organization")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Enter location here"
              label="Please enter location"
              value={formData.location}
              onChange={handleChange("location")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Enter Facility"
              label="Facility Name"
              value={formData.facility}
              onChange={handleChange("facility")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Organization;
