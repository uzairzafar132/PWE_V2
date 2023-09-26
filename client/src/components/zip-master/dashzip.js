import '../assets/vendor/bootstrap-icons/bootstrap-icons.css'
import '../assets/vendor/bootstrap/css/bootstrap.min.css'
import { Link,useNavigate } from 'react-router-dom';
import ZipMaster from './zipmaster';
import React, { useState,useEffect } from "react";
import axios  from "axios";

var token ="";
const Zipdash =()=>{

const [active,setActive] = useState(false); 
const [viewConverted,setViewConverted] = useState(true); 


const navigate = useNavigate;



  
  useEffect(() => {
    let urlsloc = window.location.href;
  
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwY2Q3Y2QwYjVjY2I5NmZmNzVhZTc3IiwiaWF0IjoxNjYxOTUxODk3LCJleHAiOjE2OTM0ODc4OTd9.wT14X6DiLHTwpmyNFRejbr9LAAtHLUK7ha18pAlLBGY";

  token = urlsloc.split('/').pop();
  console.log("token");

  console.log(token);
  
  axios.defaults.headers.post['token'] = token;
  
  

  
  axios.post("http://platinummedapp.com/jwtauth/verify").then(function (response) {
  
  
    
  console.log("Access");
 
  
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





  

  
const dashboard= ()=>{


  navigate("/dashboard/"+token);
  

}


const zipfile= ()=>{


  navigate("/zipmaster/"+token);
  

}



const clinicmaster= ()=>{


  navigate("/clinicmaster/"+token);
  

}

const users= ()=>{


  navigate("/usersall/"+token);


}

  





const toggleSidebar = ()=>{

    console.log("Clicked");
    
    if(active){
      setActive(false);

    }else{
      setActive(true);
    }

}

const vbgFileView= ()=>{

    console.log("Clicked");
    
    setViewConverted(true);

}


const flexFileView= ()=>{

    setViewConverted(false);

}


const navigatDoctor= ()=>{


  navigate("/doctorview/"+token);
    

}

const logout=()=>{
    console.log("Clicked logout");
    localStorage.setItem("token", false);
    window.location ='/login';
  }




  return (
    <div>







<header id="header" className="header fixed-top d-flex align-items-center">
           
           <div className="d-flex align-items-center justify-content-between">
             <Link to="\dashboard" className="logo d-flex align-items-center" style={{textDecoration: "none"}}>
             
               <span className="d-none d-lg-block" style={{textDecoration: "none", fontSize:'18px'}}>Platinum Medical Evaluations</span>
             </Link>
             <i className="bi bi-list toggle-sidebar-btn"    onClick={toggleSidebar}></i>
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
               <button className="btn btn-outline-primary" onClick={logout}>
                       <i className="bi bi-box-arrow-right"></i>
                       <span>Sign Out</span>
                       </button>
               </li>
       
             </ul>
           </nav>
       
         </header>








<aside id="sidebar" className="sidebar" style={active ? {marginLeft:"-300px"}: {marginLeft:"3px"}} >
           
           <ul className="sidebar-nav" id="sidebar-nav">
       
             <li className="nav-item" onClick={vbgFileView}>
               <Link  onClick={dashboard} className= {`${viewConverted ? "nav-link collapsed" : "nav-link collapsed"}`} to={`/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwY2Q3Y2QwYjVjY2I5NmZmNzVhZTc3IiwiaWF0IjoxNjYxOTUyNTM4LCJleHAiOjE2OTM0ODg1Mzh9.RdtZ2IkKyq2Q0LK0K0zAmkwmKGqabDARdiaMESrNW2s`} >
                 <i className="bi bi-grid"></i>
                 <span>Upload VBG File</span>
               </Link>
             </li>




             
           
             {/* <li className="nav-heading">Calender</li> */}
             {/* <li className="nav-item" onClick={flexFileView}>
               <Link   className=  {`${viewConverted ? "nav-link collapsed" : "nav-link"}`}
        data-bs-target="#icons-nav" data-bs-toggle="collapse" to="#">
                 <i className="bi bi-list-task"></i><span>Flexbooker File</span>
               </Link>
             
             </li> */}


             <li  onClick={zipfile}  className="nav-link">
             <Link  to={`/zipmaster/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwY2Q3Y2QwYjVjY2I5NmZmNzVhZTc3IiwiaWF0IjoxNjYxOTUyNTM4LCJleHAiOjE2OTM0ODg1Mzh9.RdtZ2IkKyq2Q0LK0K0zAmkwmKGqabDARdiaMESrNW2s`}>
                     <i className="bi bi-server"></i><span>Zip Master </span>  
                   </Link>
             
             </li>
             {localStorage.getItem('role')==="Doctor"?     <li className=  "nav-item nav-link collapsed" onClick={navigatDoctor}>
                 <a href={`/appointmentslist/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwY2Q3Y2QwYjVjY2I5NmZmNzVhZTc3IiwiaWF0IjoxNjYxOTUxODk3LCJleHAiOjE2OTM0ODc4OTd9.wT14X6DiLHTwpmyNFRejbr9LAAtHLUK7ha18pAlLBGY`} >
                     <i className="bi bi-calendar"></i><span style={{color: '#012970'}}>Appointments </span>  
                   </a>
                 </li>:""}

             
             {localStorage.getItem('role')==="Admin"?     <li className=  "nav-item nav-link collapsed" onClick={navigatDoctor}>
                 <Link to={`/doctorview/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwY2Q3Y2QwYjVjY2I5NmZmNzVhZTc3IiwiaWF0IjoxNjYxOTUxODk3LCJleHAiOjE2OTM0ODc4OTd9.wT14X6DiLHTwpmyNFRejbr9LAAtHLUK7ha18pAlLBGY`} >
                     <i className="bi bi-calendar"></i><span style={{color: '#012970'}}>Doctor Schedule </span>  
                   </Link>
                 </li>:""}


    
       
      
             {localStorage.getItem('role')==="Admin"? <li className="nav-item">
               <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
                 <i className="bi bi-menu-button-wide"></i><span>Settings</span><i className="bi bi-chevron-down ms-auto"></i>
               </Link>
               <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
     
               <li  onClick={clinicmaster}>
                 <Link to={`/clinicmaster/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwY2Q3Y2QwYjVjY2I5NmZmNzVhZTc3IiwiaWF0IjoxNjYxOTUxODk3LCJleHAiOjE2OTM0ODc4OTd9.wT14X6DiLHTwpmyNFRejbr9LAAtHLUK7ha18pAlLBGY`} >
                     <i className="bi bi-circle"></i><span>Clinic Master </span>  
                   </Link>
                 </li>
                 <li onClick={users}>
                 <Link to={`/usersall/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwY2Q3Y2QwYjVjY2I5NmZmNzVhZTc3IiwiaWF0IjoxNjYxOTUxODk3LCJleHAiOjE2OTM0ODc4OTd9.wT14X6DiLHTwpmyNFRejbr9LAAtHLUK7ha18pAlLBGY`} >
                     <i className="bi bi-circle"></i><span>Users</span>  
                   </Link>
                 </li>
              
               
               </ul>
             </li>
       :""}
       
          
       
           </ul>
       
         </aside>


        
        

         <main id="main" className="main"  style={active ? {marginLeft:"0"}: {marginLeft:"300px"}}>
       <nav>
                   <ol className="breadcrumb">
                     <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                     <li className="breadcrumb-item active">Zip Master</li>
                   </ol>
                 </nav>
              
   <ZipMaster/>
           
             </main>
             </div>



  );


}


export default Zipdash;
