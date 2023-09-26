
import React from "react";
import DashSingleView from "../DoctorViewSIngle/DashSingleView";

const DashboardDoctor =()=>{


const logout=()=>{   
   localStorage.setItem("token", false);
    window.location ='/';
  }




  return (
    <div>







<header id="header" className="header fixed-top d-flex align-items-center">
           
           <div className="d-flex align-items-center justify-content-between">
         
             
               <span className="d-none d-lg-block" style={{textDecoration: "none", fontSize:'18px'}}>Platinum Medical Evaluations</span>
         
    
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
                       <h4>{localStorage.getItem('email')}</h4>
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
               <button className="btn btn-outline-primary" onClick={logout}>
                       <i className="bi bi-box-arrow-right"></i>
                       <span>Sign Out</span>
                       </button>
               </li>
       
             </ul>
           </nav>
       
         </header>






        
   <DashSingleView/>
             </div>



  );


}


export default DashboardDoctor;
