import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout";
import ListAlumnosComponent from "../Components/ListAlumnosComponent";
import AddAlumnoComponent from "../Components/AddAlumnoComponent";

const Alumnos = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListAlumnosComponent />} />
        <Route path="add" element={<AddAlumnoComponent />} />
        <Route path="edit/:id" element={<AddAlumnoComponent />} />
      </Route>
    </Routes>
  );
};

export default Alumnos;