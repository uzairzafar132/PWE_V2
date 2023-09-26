
import { Link } from 'react-router-dom';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import React, { useState,useEffect } from "react";
import axios  from "axios";
import SingleViewDoctor from './SingleViewDoctor';
import PaidInvoice from '../DoctorView/DoctorSchedule/InvoiceView/paidInvoice';

var token ="";
const DashSingleView =()=>{



const [startDate, setStartDate]= useState(new Date().toISOString().slice(0, 10));
const [endDate, setEndDate]= useState(new Date().toISOString().slice(0, 10));
const [invoiceViewSelected,setInvoiceViewSelected] = useState(true);


useEffect(() => {
  let urlsloc = window.location.href;
  token = urlsloc.split('/').pop();

  
  axios.defaults.headers.post['token'] = token;
  
  
  
  
  axios.post("http://platinummedapp.com/jwtauth/verify").then(function (response) {
  
  if(!response.data===true){
  console.log("Not Autorisezed");
    window.location.href = "/";
  }
  

  
    })
   .catch(function (error) {
    console.log(error);
    window.location.href = "/";
   });
  
}, []);



  






const handleCallback=(start, end, label)=> {
  console.log(start, end, label);
  let date = start._d.getDate();
let month = start._d.getMonth() + 1;
let year = start._d.getFullYear();

console.log(date, month, year);


  setStartDate(year+"-"+month+"-"+date);


  let date1 = end._d.getDate();
  let month1 = end._d.getMonth() + 1;
  let year1 = end._d.getFullYear();
  

 setEndDate(year1+"-"+month1+"-"+date1);

}

const logout=()=>{
    console.log("Clicked logout");
    localStorage.setItem("token", false);
    window.location ='/login';
  }

  const invoiceView=()=>{
    console.log("Clicked logout");
    setInvoiceViewSelected(!invoiceViewSelected);
  //  window.location ='/invoiceViewDoctor/'+token;
  }
  



  return (
    <div>







<header id="header" className="header fixed-top d-flex align-items-center">
           
           <div className="d-flex align-items-center justify-content-between">
             <Link to="\dashboard" className="logo d-flex align-items-center" style={{textDecoration: "none"}}>
             
               <span className="d-none d-lg-block" style={{textDecoration: "none", fontSize:'18px'}}>Platinum Medical Evaluations</span>
             </Link>
          
           </div>
       
       
       
           <nav className="header-nav ms-auto">
             <ul className="d-flex align-items-center">
       
      
       
               <li className="nav-item dropdown">
       
                 <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                   <i className="bi bi-bell"></i>
                   <span className="badge bg-primary badge-number">1</span>
                 </a>
       
                 <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                   <li className="dropdown-header">
                     You have 1 new notifications
                   
                   </li>
                   <li>
                     <hr className="dropdown-divider"/>
                   </li>
       
                   <li className="notification-item">
                     <i className="bi bi-star text-warning"></i>
                     <div>
                       <h4>Welcome to Platinum Medical Evaluations</h4>
                      
                     </div>
                   </li>
       
                   <li>
                     <hr className="dropdown-divider"/>
                   </li>
       
       
       
               
       
                   <li>
                     <hr className="dropdown-divider"/>
                   </li>
                   <li className="dropdown-footer">
                     <a href="#">Show all notifications</a>
                   </li>
       
                 </ul>
       
               </li>
           
       
               <li className="nav-item dropdown pe-3">
              {invoiceViewSelected? <button className="btn btn-outline-primary" onClick={invoiceView}>
                       <i className="bi bi-invoice"></i>
                       <span>View Invoice</span>
                       </button> :   <button className="btn btn-outline-primary" onClick={invoiceView}>
                       <i className="bi bi-invoice"></i>
                       <span>Appointments</span>
                       </button>}
               </li>
       
               <li className="nav-item dropdown pe-3">
               <button className="btn btn-outline-primary" onClick={logout}>
                       <i className="bi bi-box-arrow-right"></i>
                       <span>Sign Out</span>
                       </button>
               </li>
       
             </ul>
           </nav>
       
         </header>








        
        

         <main id="main" className="main"  style={{marginLeft:"0"}}>
    

            {
              invoiceViewSelected?<SingleViewDoctor/>:
              <div>

              Invoice Date Range Filter
              
              <DateRangePicker
                      onCallback={handleCallback}
                       maxDate={new Date()}
                    >
                       <input type="text" className="form-control" />
                    </DateRangePicker>
              
          <PaidInvoice startDate={startDate} endDate={endDate} email={localStorage.getItem("email")}/>
              
              </div>
           
            }
              

           
             </main>
             </div>



  );


}


export default DashSingleView;
