import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Medications from "./Medications";
import AddDiagnosis from "./DiagnosisForm";

const Router = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/medications">Medications</Link>
            </nav>

            <Routes>
                <Route path="/" element={<AddDiagnosis />} />
                <Route path="/medications" element={<Medications />} />
            </Routes>
        </Router>
    );
};

export default Router;
