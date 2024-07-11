import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./NavPages/Home";
import Sales from "./NavPages/Sales";
import Purchase from "./NavPages/Purchase";
import Invoice from "./NavPages/Invoice";
import Client from "./NavPages/Client";
import InvoiceItem from "./NavPages/InvoiceItem";
import Payment from "./NavPages/Payment";
import Project from "./NavPages/Project";
import Tax from "./NavPages/Tax";
import PaymentMethod from "./NavPages/PaymentMethod";
import Employee from "./NavPages/Employee";
import Technology from "./NavPages/Technology";
import TechnologyOption from "./NavPages/TechnologyOption";
import ProtectedRoutes from "./ProtectedRoutes";

function Base(props) {
  return (
    <main>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route
          path="/Sales"
          element={
            <ProtectedRoutes>
              <Sales />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Purchase"
          element={
            <ProtectedRoutes>
              <Purchase />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Invoice"
          element={
            <ProtectedRoutes>
              <Invoice />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Client"
          element={
            <ProtectedRoutes>
              <Client />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/InvoiceItem"
          element={
            <ProtectedRoutes>
              <InvoiceItem />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Payment/*"
          element={
            <ProtectedRoutes>
              <Payment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Project"
          element={
            <ProtectedRoutes>
              <Project />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Technology"
          element={
            <ProtectedRoutes>
              <Technology />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/TechnologyOption"
          element={
            <ProtectedRoutes>
              <TechnologyOption />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Tax"
          element={
            <ProtectedRoutes>
              <Tax />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Payment/*"
          element={
            <ProtectedRoutes>
              <Payment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/PayMethod/*"
          element={
            <ProtectedRoutes>
              <PaymentMethod />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Employee/*"
          element={
            <ProtectedRoutes>
              <Employee />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </main>
  );
}

export default Base;

export const routeNames = {
  HOME: "/",
  INVOICE: "/Invoice",
  CLIENT: "/Client",
  PROJECT: "/Project",
};
