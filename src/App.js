import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Layout';
import messages from './messages';
import Auth from './Security/Auth';
import { FiUsers } from 'react-icons/fi';
import {GiHeartKey} from 'react-icons/gi';
import "./Components/Login.css";

import axios from "axios";

import './styles/App.scss';

function App() {
  const [locale, setLocale] = useState('en');
  const [show, setShow] = useState(true);
  const [user, setUser] = useState();
  const [pwd, setpwd] = useState();
  const [resultSet, SetResult] = useState([]);
    
 const handleSubmit = (e) => {

  e.preventDefault();
   
  axios.post("http://localhost:3009/loginValidation", {
    userName  : user,
    userPwd : pwd,
   }).then((res) => {
     console.log("result set in login page: ", res.data);
     console.log("result set in login page length: ", res.data.length);

     if (res.data.length > 0){
      SetResult(res.data);
      afterSubmit(res.data);
     }else{
      alert("User Credentials Provided are not matching with the system records. Please provide proper details to login.");
      setUser("");
      setpwd("");
    }
       
   });
 
  
 
   console.log('test :');
  //setShow(!show);
 } 

 const afterSubmit = (dataSet) => {
    // localStorage.setItem('userName',JSON.stringify(dataSet[0].USER_NAME));
    // localStorage.setItem('userRole',JSON.stringify(dataSet[0].userrole));

    let activities = "";
    let userDetails = "";

  if (dataSet.length > 0) {

    for (var i = 0; i < dataSet.length; i++){
      activities = dataSet[i].ACTIVITY_NAME +","+ activities;
    }

    userDetails = {"userName" : dataSet[0].USER_NAME, "role": dataSet[0].userrole, activities}
    
    localStorage.setItem('userDetails',JSON.stringify(userDetails));

    console.log('activities - : ',activities);
    activateRoute();
    setShow(!show);
  }

 }
 
 const handleChange = (e) => {
  console.log('Change : ', e.target.value);
  let input = e.target.name;
 
  if (input == "user"){
    setUser(e.target.value);
  } else if (input == "pwd"){
    setpwd(e.target.value);
  }
 }

  const activateRoute = () => {
    Auth.login(() => {console.log('Protected Route Activated')});
    // setShow(!show);
  }
  
  const deActivateRoute = () => {
    Auth.logout(() => {console.log('Protected Route Deactivated')});
    // setShow(!show);
  }
    
  return (  <> <IntlProvider locale={locale} messages={messages[locale]}>

    {/* {!show && <button type="button" onClick={activateRoute}>Activate Route</button>}
    {show && <button type="button" onClick={deActivateRoute}>Deactivate Route</button>} */}
  
    {show && 
    <div className="body1">
   <div className="container8">
   
        <div className="d-flex justify-content-center h-100">
            <div style={{marginTop:'200px'}}>
            <div class="brand_logo_container">
            <img src="entema2.png" className="brand_logo" alt="Logo"/>
          </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"><FiUsers/></i></span>
                            </div>
                            <input type="text" className="form-control" id="user" name="user" placeholder="username" value={user} onChange={handleChange}/>
                            
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"><GiHeartKey/></i></span>
                            </div>
                            <input type="password" className="form-control" id="pwd" name="pwd" placeholder="password" value={pwd} onChange={handleChange}/>
                        </div>
                       
                        <div className="form-group">
                        <button type="submit" className="btn btn-primary1">Login</button>
                        </div>
                    </form>
                </div>
                
                </div>
            </div>
            </div>   </div>}
 
        {!show && <Layout/>}
            
      </IntlProvider>
    
  </>

  );
}

export default App;
