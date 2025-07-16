import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout";
import ListWorkshopComponent from "../Components/ListWorkshopComponent";
import AddWorkshopComponent from "../Components/AddWorkshopComponent";

const Talleres = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListWorkshopComponent />} />
        <Route path="add" element={<AddWorkshopComponent />} />
        <Route path="edit/:id" element={<AddWorkshopComponent />} />
      </Route>
    </Routes>
  );
};

export default Talleres;
