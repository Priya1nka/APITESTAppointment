import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";  
import {
  Box,
  Button,
  TextField,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import useWindowDimensions from "../utils/useWindowDimensions";

function AddDiagnosis(props) {
  const { height } = useWindowDimensions();
  const [formData, setFormData] = useState({
    DiagnosesName: "",
    StartDate: "",
    Status: "",
    AddedByDr: "",
    Sequence: "",
    file: "",
  });
  const [diagnosesList, setDiagnosesList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true); 

    const newDiagnosis = {
        resourceType: "DiagnosticReport",
        id: formData.DiagnosesName,
        meta: {
          versionId: "1",
          lastUpdated: new Date().toISOString(),
          source: "#sourceID",
        },
        text: {
          display: formData.DiagnosesName,
        },
        status: formData.Status, 
        code: {
          coding: [
            {
              sequence: formData.Sequence, 
            },
          ],
        },
        subject: {
          reference: formData.AddedByDr,
        },
        issued: formData.StartDate, 
      };
      

    try {
      const response = await axios.post("https://hapi.fhir.org/baseR4/DiagnosticReport", newDiagnosis, {
        headers: {
          "Content-Type": "application/fhir+json", 
        },
      });

      console.log("Response: ", response.data); 
      if (editIndex !== null) {
        const updatedList = diagnosesList.map((diagnosis, index) =>
          index === editIndex ? newDiagnosis : diagnosis
        );
        setDiagnosesList(updatedList);
        setEditIndex(null); 
      } else {
        setDiagnosesList([...diagnosesList, newDiagnosis]);
      }
      setFormData({
        DiagnosesName: "",
        StartDate: "",
        Status: "",
        AddedByDr: "",
        Sequence: "",
        file: "",
      });
    } catch (error) {
      console.error("Error submitting data: ", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(diagnosesList[index]);
  };

  const handleDelete = (index) => {
    const updatedList = diagnosesList.filter((_, i) => i !== index);
    setDiagnosesList(updatedList);
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
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              fullWidth
              label="Enter diagnosis name"
              placeholder="Pneumonia"
              value={formData.DiagnosesName}
              onChange={handleChange("DiagnosesName")}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Status"
              placeholder="Active"
              value={formData.Status}
              onChange={handleChange("Status")}
              select
            >
              {[
                "active",
                "recurrence",
                "relapse",
                "inactive",
                "remission",
                "resolved",
              ].map((option, index) => (
                <MenuItem key={option + "-" + index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Added by Dr"
              placeholder="Dr. Jay Prakash"
              value={formData.AddedByDr}
              onChange={handleChange("AddedByDr")}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Sequence"
              placeholder="Sequence information"
              value={formData.Sequence}
              onChange={handleChange("Sequence")}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              placeholder="YYYY-MM-DD"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.StartDate}
              onChange={handleChange("StartDate")}
            />
          </Grid>
          <Grid item sm={6}>
            <Button
              variant="contained"
              component="label"
              size="large"
              style={{ marginTop: 15, width: "100%" }}
            >
              Attach Report
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button type="button" variant="outlined" onClick={() => setFormData({
          DiagnosesName: "",
          StartDate: "",
          Status: "",
          AddedByDr: "",
          Sequence: "",
          file: "",
        })}>
          Discard
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={loading} 
        >
          {editIndex !== null ? "Update" : "Save"}&nbsp;
        
        </Button>
      </Box>

      {diagnosesList.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Diagnosis Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Added By</TableCell>
                <TableCell>Sequence</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diagnosesList.map((diagnosis, index) => (
                <TableRow key={diagnosis.id}>
                  <TableCell>{diagnosis.id}</TableCell>
                  <TableCell>{diagnosis.DiagnosesName}</TableCell>
                  <TableCell>{diagnosis.Status}</TableCell>
                  <TableCell>{diagnosis.StartDate}</TableCell>
                  <TableCell>{diagnosis.AddedByDr}</TableCell>
                  <TableCell>{diagnosis.Sequence}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleEdit(index)}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

AddDiagnosis.propTypes = {
  classes: PropTypes.object,
};

export default AddDiagnosis;
