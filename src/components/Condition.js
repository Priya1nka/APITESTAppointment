import { TextField } from "@mui/material";
import React from "react";


const Condition = () => {
    const [formData,setFormData]={
        clinicalStatus:"",
        

    }


    return (
        <>
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
                <Grid>
                    <TextField
                    fullWidth
                    placeholder="Clinical Status"
                    label="Clinical Status"

                    />
                </Grid>
                </Box>
            </Box>
        </>
    )


}