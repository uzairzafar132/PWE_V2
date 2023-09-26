import React, { useState,Fragment , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { render } from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Routes 
} from "react-router-dom";



// date formate, phone formate 3-3-4, default start time, show flex booker status,No SHow
// every time i update appointment its move my 9 hours 

// m-d-year

// action - calender


import UploadZip from "./components/uploadzipmaster"
import store from "./store";
import {Provider} from "react-redux"
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Zipdash from "./components/zip-master/dashzip";
import ClinicDash from "./components/clinic-master/dashclinicmaster";
import UsersDash from "./components/UserList/dashuser";
import Schedule from "./components/DoctorView/DoctorSchedule/Schedule";
import ScheduleDash from "./components/DoctorView/DoctorSchedule/ScheduleDash";
import DashSingleView from "./components/DoctorViewSIngle/DashSingleView";
import DashboardDoctor from "./components/Dashboard/DashboardDoctor";
import SingleViewDoctor from "./components/DoctorViewSIngle/SingleViewDoctor";
import Map from './components/zip-master/Map'
import Facility from "./components/zip-master/Fcilities";

function App() {


  const checkAuthenticated = async () => {
    console.log("sdfsdf");
    try {
      const res = await fetch("http://platinummedapp.com/jwtauth/verify", {
        method: "POST",
        headers: { token: localStorage.token }
      });



      const parseRes = await res.json();

      console.log("parseRes");
      console.log(parseRes);

      if(parseRes.msg==="Token is not valid"){
        console.log("2 parseRes");
      
      }else{
        isAuthenticated=true;
      }
   

      (parseRes == true) ? setIsAuthenticated(true) : setIsAuthenticated(false);



      console.log(isAuthenticated);

      console.log(isAuthenticated);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    console.log("boolean")
    console.log(boolean)
    setIsAuthenticated(boolean);
  };
  console.log(isAuthenticated);


  

  const rootElement = document.getElementById("root");


  return render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login setAuth={setAuth} />} />

          <Route exact path="/login" element={<Login setAuth={setAuth} />} />

          <Route
            path="/dashboard/:token"
            exact
            element={<Dashboard setAuth={setAuth} />}
          />

          <Route
            path="/zipmaster/:token"
            exact
            element={<Zipdash setAuth={setAuth} />}
          />

          <Route path="/map" exact element={<Map setAuth={setAuth} />} />
          <Route path="/facility" exact element={<Facility setAuth={setAuth} />} />

          <Route
            path="/clinicmaster/:token"
            exact
            element={<ClinicDash setAuth={setAuth} />}
          />
          <Route
            path="/uploadzip/:token"
            exact
            element={<UploadZip setAuth={setAuth} />}
          />
          <Route
            path="/usersall/:token"
            exact
            element={<UsersDash setAuth={setAuth} />}
          />

          <Route
            path="/appointmentslist/:token"
            exact
            element={<DashSingleView setAuth={setAuth} />}
          />

          <Route
            path="/doctorview/:token"
            exact
            element={<ScheduleDash setAuth={setAuth} />}
          />

          <Route
            path="/dashboarddoctor/:token"
            exact
            element={
              <div>
                <DashboardDoctor />
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>,
    rootElement
  );
}

export default App;
