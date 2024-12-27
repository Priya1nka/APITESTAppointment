import React, { useState } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
import { Box, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const FamilyHistory = () => {

    const { height } = useWindowDimensions();
    const [value, setValue] = useState(dayjs('2022-04-17'));

    const [formData, setFormData] = useState({
        relation: "",
        gender: "",
        condition: "",


    })
    const handleChange = (name) => (event) => {
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
    };


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
                        <TextField placeholder="RelationShip"
                            label="RelationShip"
                            value={formData.relation}
                            onChange={handleChange("relation")}

                        />
                    </Grid>
                    <Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                                <DatePicker
                                    label="Controlled picker"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid>
                        <TextField
                        fullWidth
                        placeholder="Enter Mother Name"
                        label="enter mothername"

                        />
                    </Grid>
                </Box>

            </Box>
        </>
    )
}
export default FamilyHistory;
