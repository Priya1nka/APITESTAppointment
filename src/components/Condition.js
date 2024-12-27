import { TextField, Box, Grid } from "@mui/material";
import React, { useState } from "react";

const Condition = () => {
   const [formData, setFormData] = useState({
      condition: "",
      clinicalStatus: "",
      organization: "",
      resource: ""
   });

   // Handle change for each field
   const handleChange = (field) => (event) => {
      setFormData({
         ...formData,
         [field]: event.target.value
      });
   };

   // Handle form submission (log data to console)
   const handleSubmit = (event) => {
      event.preventDefault(); // Prevent default form behavior
      console.log("Form Data Submitted: ", formData);
   };

   return (
      <form onSubmit={handleSubmit}>
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
                  height: "100%", // Adjust the height as needed
                  maxHeight: "100%",
                  overflow: "auto",
                  alignItems: "center",
                  alignContent: "center",
               }}
            >
               <Grid>
                  <TextField
                     fullWidth
                     placeholder="Clinical Status"
                     label="Clinical Status"
                     value={formData.clinicalStatus}
                     onChange={handleChange("clinicalStatus")}
                  />
               </Grid>
               <Grid>
                  <TextField
                     fullWidth
                     placeholder="Condition"
                     label="Condition"
                     value={formData.condition}
                     onChange={handleChange("condition")}
                  />
               </Grid>
               <Grid>
                  <TextField
                     fullWidth
                     placeholder="Organization"
                     label="Organization"
                     value={formData.organization}
                     onChange={handleChange("organization")}
                  />
               </Grid>
               <Grid>
                  <TextField
                     fullWidth
                     placeholder="Resource"
                     label="Resource"
                     value={formData.resource}
                     onChange={handleChange("resource")}
                  />
               </Grid>
            </Box>
         </Box>
         <button type="submit">Submit</button>
      </form>
   );
};

export default Condition;
