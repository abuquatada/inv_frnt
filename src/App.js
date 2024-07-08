import React from 'react';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import Home from './NavPages/Home';
import Sales from './NavPages/Sales';
import Purchase from './NavPages/Purchase';
import Invoice from './NavPages/Invoice';
import Client from './NavPages/Client';
import InvoiceItem from './NavPages/InvoiceItem';
import Payment from './NavPages/Payment';
import Project from './NavPages/Project';
import Tax from './NavPages/Tax';
import PaymentMethod from './NavPages/PaymentMethod';
import Employee from './NavPages/Employee';
import Technology from './NavPages/Technology';
import TechnologyOption from './NavPages/TechnologyOption';


function App(props) {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Sales' element={<Sales/>} />
      {/* <Route path='/Item' element={<Item/>} /> */}
      <Route path='/Purchase' element={<Purchase/>} />
      <Route path='/Invoice' element={<Invoice/>} />
      <Route path='/Client' element={<Client/>} />
      <Route path='/InvoiceItem' element={<InvoiceItem/>} />
      <Route path='/Payment/*' element={<Payment/>}/>
      <Route path='/Project' element={<Project/>}/>
      <Route path='/Technology' element={<Technology/>}/>
      <Route path='/TechnologyOption' element={<TechnologyOption/>}/>
      <Route path='/Tax' element={<Tax/>}/>
      <Route path='/Payment/*' element={<Payment/>}/>
      <Route path='/PayMethod/*' element={<PaymentMethod/>}/>
      <Route path='/Employee/*' element={<Employee/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

export const routeNames = {
  HOME: '/',
  // SALES: '/Sales',
  // PURCHASE: '/Purchase',
  INVOICE: '/Invoice',
  CLIENT: '/Client',
  // INVOICE_ITEM: '/InvoiceItem',
  // PAYMENT: '/Payment',
  PROJECT: '/Project',
  // TAX: '/Tax',
  // PAYMENT_METHOD: '/PayMethod',
  // EMPLOYEE: '/Employee',
}







