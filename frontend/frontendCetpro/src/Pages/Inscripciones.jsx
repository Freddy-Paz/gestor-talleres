import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout";
import ListInscripcionesComponent from "../Components/ListInscripcionesComponent";
import AddInscripcionComponent from "../Components/AddInscripcionComponent"

const Inscripciones = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListInscripcionesComponent />} />
        <Route path="add" element={<AddInscripcionComponent />} />
      </Route>
    </Routes>
  
  );
};

export default Inscripciones;
