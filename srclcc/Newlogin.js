import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './styles/App.scss';
import Routes from './Routes';
import Newapp from './Newapp';


function Newlogin(props) {

    const history = useHistory();

    onsubmit = () => {
        props.history.push("/newapp");
    }
    
    return (
        <div>
        <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Sign In</h3>
                   
                </div>
                <div className="card-body">
                    <form onSubmit={onsubmit}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="username"/>
                            
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" placeholder="password"/>
                        </div>
                        <div className="row align-items-center remember">
                            <input type="checkbox"/>Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn"/>
                        </div>
                    </form>
                </div>
                
                </div>
            </div>
        </div>
    </div> 
     
    )
}

export default Newlogin;
