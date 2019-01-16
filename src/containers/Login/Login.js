import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import './Login.css';
import {VisibilityProvider, VisibilityContext} from "../../App";

const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errorState: false,
            justSignedUp: false
        }
    };

    //email Validation
    validation = (e) => {
        console.log(e.target.value + "/" + this.state.errorState);
        if (emailRegex.test(e.target.value) !== true)
            this.setState({errorState: true});
        else
            this.setState({errorState: false});
        if (e.target.value === "")
            this.setState({errorState: false});

    };

    handleState = () => {
        this.props.history.replace('/welcomeScreen');
    }



    render() {
        return (
            <VisibilityProvider>
            <div>
                <div className="container-fluid container-fluid-login">
                    <div className="row login-wrapper">
                        <div className="loginPane col-md-4 col-sm-12">
                            <form action="#" onSubmit={this.handleState}>
                                <div className="form-group">
                                    <VisibilityContext.Consumer>
                                        {(value)=>
                                            <div className={value.state.visibility+" inline_label"}>Please login with your newly created
                                            account</div>
                                        }

                                    </VisibilityContext.Consumer>
                                    <label className="inline_label email-image">Email</label>
                                    <input type="email"
                                           className="inputs form-control "
                                           autoFocus
                                           required="required"
                                           placeholder="Enter email"
                                           onChange={(e) => {
                                               this.validation(e)
                                           }}
                                    />
                                    {this.state.errorState ? (
                                        <p className="alert-danger alertClass">Please enter valid email!</p>) : null}
                                </div>

                                <div className="form-group">
                                    <label className="inline_label password-image">Password</label>
                                    <input className="form-control"
                                           type="password"
                                           required="required"
                                           placeholder="Enter password"
                                    />

                                <button className=" login_btn ">
                                    Login
                                </button>
                                <label className="newUSer">New to this?<Link className="newUSer text-dark" exact to={'/join'}> Create an account.</Link></label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </VisibilityProvider>
        );
    }
}

export default Login;