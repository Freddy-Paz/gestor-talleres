import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout";
import ListPagoComponent from "../Components/ListPagoComponent";
import AddPagoComponent from "../Components/AddPagoComponent";

const Pagos = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListPagoComponent/>} />
        <Route path="add" element={<AddPagoComponent />} />
      </Route>
    </Routes>
  
  );
};

export default Pagos;
