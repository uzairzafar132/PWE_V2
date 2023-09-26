import React, { Fragment, useState,useEffect } from "react";
import axios  from "axios";
const Login = (props) => {
 // console.log("props");
 // console.log(props);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>{
    console.log(inputs.email);
    console.log(inputs.password);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
    



  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch(
        "http://platinummedapp.com/jwtauth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

    
    

      const parseRes = await response.json();
     // console.log(parseRes);
      localStorage.setItem("token", parseRes.token);

      axios.post("http://platinummedapp.com/users/findbyemail/"+email).then(function (response) {
    
    
      
      //  console.log("Access Role");
      //  console.log(response.data);
        
      
        
          
   //   console.log(parseRes.token);

      if (parseRes.token) {
        localStorage.setItem("role", response.data[0].role);
      //  console.log("HERE");
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("email", email);
      //  console.log("boolean");
      //  console.log(localStorage.token);
        if(response.data[0].role==="Doctor"){
          window.location.href = "/dashboarddoctor/"+parseRes.token;
          props.setAuth(true);
      
        }else{
          window.location.href = "/dashboard/"+parseRes.token;
          props.setAuth(true);
      
        }

   
      
      } else {
        alert("User not found");
        props.setAuth(false);
  
      }
        
        
          })
         .catch(function (error) {
       //   console.log(error);
        
         });


  




    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
          <main className="page-login">
     <div className="container mt-5">
    <div className="row d-flex justify-content-center">
        <div className="col-md-6">
            <div className="card px-5 py-5" id="form1">


            <div className="success-data" v-else>
                    <div className="text-center d-flex flex-column"> <i className='bx bxs-badge-check'></i> <span className="text-center fs-1"> Platinum Medical Evaluations<br/>  </span> </div>
                </div>
                <br/>

                <form onSubmit={onSubmitForm}>
                <div className="form-group">
    <label for="exampleFormControlInput1">Email Address</label>
    <input type="email"  name="email" onChange={e => onChange(e)} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
  </div>
  <br/>
  <div className="form-group">
    <label for="exampleFormControlInput1">Password</label>
    <input type="password" name="password" onChange={e => onChange(e)} className="form-control" id="exampleFormControlInput1" placeholder="password"/>
  </div>
  <br/>
  <div className="mb-3"> <input type="submit" value="Login" className="btn btn-primary w-100"/> </div>
</form>
                


<label>
                  Don't have an account? contact <a href="mailto:michelle@housecallmd.com">michelle@housecallmd.com</a>
                </label>

            </div>
        </div>
    </div>
</div>
      </main>
    </Fragment>
  );
};

export default Login;

