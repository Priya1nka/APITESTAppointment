import React, { useState } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Box, Grid } from "@mui/material";

const Medications = () => {
  const { height } = useWindowDimensions();
  const [formData, setFormData] = useState({
    mname: "",
    lotNumber: "",
    strength: "",
    denominator: "",
  });

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const medicationResource = {
      resourceType: "Medication",
      code: {
        coding: [
          {
            display: formData.mname,
          },
        ],
      },
      batch: {
        lotNumber: formData.lotNumber,
        expirationDate: "2025-12-31",
      },  
      ingredient: [
        {
          itemCodeableConcept: {
            coding: [
              {
                display: `${formData.mname} ${formData.strength}`,
              },
            ],
          },
          strength: {
            numerator: {
              value: parseFloat(formData.strength) || 0,
              code: "mg",
            },
            denominator: {
              value: 1,
              code: "Tab",
            },
          },
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://hapi.fhir.org/baseR4/Medication",
        medicationResource,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 700,
      }}
    >
      <Box
        sx={{
          height: height - 176,
          maxHeight: height - 176,
          overflow: "auto",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField 
              fullWidth
              label="Enter Medications name"
              placeholder="Tylenol PM"
              value={formData.mname}
              onChange={handleChange("mname")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Denominator name"
              placeholder="Enter Denominator name"
              value={formData.denominator}
              onChange={handleChange("denominator")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter lot Number"
              placeholder="Lot Number 5"
              value={formData.lotNumber}
              onChange={handleChange("lotNumber")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter strength"
              placeholder="500 mg"
              value={formData.strength}
              onChange={handleChange("strength")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Medications;
