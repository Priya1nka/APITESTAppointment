import React, { useState } from "react";
import PropTypes from "prop-types";
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

  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const newDiagnosis = {
      resourceType: "DiagnosticReport",
      id: formData.DiagnosesName, // You can generate a unique ID here if necessary
      meta: {
        versionId: "1", // You can generate this dynamically or use a constant
        lastUpdated: new Date().toISOString(),
        source: "#sourceID", // Modify as necessary
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">${formData.DiagnosesName}</div><table class="hapiPropertyTable"><tbody><tr><td>Status</td><td>${formData.Status}</td></tr><tr><td>Issued</td><td>${formData.StartDate}</td></tr></tbody></table></div>`,
      },
      status: "registered",
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "24331-1", // You can modify this LOINC code if necessary
          },
        ],
      },
      subject: {
        reference: "https://fhir.udec.cl/baseR4/Patient/PAT-301", // Modify as necessary
      },
      issued: formData.StartDate, // Ensure it's in the correct ISO format
      performer: [
        {
          reference: "https://fhir.udec.cl/baseR4/Practitioner/PRA-301", // Modify as necessary
        },
      ],
    };

    if (editIndex !== null) {
      const updatedList = diagnosesList.map((diagnosis, index) =>
        index === editIndex ? newDiagnosis : diagnosis
      );
      setDiagnosesList(updatedList);
      setEditIndex(null); 
    } else {
      // Add new diagnosis
      setDiagnosesList([...diagnosesList, newDiagnosis]);
    }

    // Clear the form data after submit
    setFormData({
      DiagnosesName: "",
      StartDate: "",
      Status: "",
      AddedByDr: "",
      Sequence: "",
      file: "",
    });
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
        >
          {editIndex !== null ? "Update" : "Save"}&nbsp;
          Send
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
