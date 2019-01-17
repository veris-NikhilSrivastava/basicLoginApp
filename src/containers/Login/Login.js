import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";
import {inputTypes} from "../../components/UI/Input/inputTypes";
import './Login.css';
import {VisibilityProvider, VisibilityContext} from "../../App";

const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errorState: false,
            justSignedUp: false,
            inputTypes:inputTypes
        }
    };

    //email Validation
    validation = (e) => {
        // console.log(e.target.value + "/" + this.state.errorState);
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
                                {/*<div className="form-group">*/}
                                    {/*<VisibilityContext.Consumer>*/}
                                        {/*{(value)=>*/}
                                            {/*<div className={value.state.visibility+" inline_label"}>Please login with your newly created*/}
                                            {/*account</div>*/}
                                        {/*}*/}

                                    {/*</VisibilityContext.Consumer>*/}
                                    {/*<label className="inline_label email-image">Email</label>*/}
                                    <Input type={inputTypes.email.inputType}
                                           classes={inputTypes.email.classes}
                                           autoFocus
                                           labelText="Email"
                                           name={inputTypes.email.name}
                                           labelClass={'inline_label email-image'}
                                           formNoValidate
                                           required="required"
                                           placeholder="Enter email"
                                           onchange={(e) => {

                                               this.validation(e)
                                           }}
                                    />
                                    {this.state.errorState ? (
                                        <p className="text-danger alertClass">Please enter valid email!</p>) : null}

                                {/*<div className="form-group">*/}
                                    {/*<label className="inline_label password-image">Password</label>*/}
                                    <Input classes={inputTypes.password.classes}
                                           type={inputTypes.password.inputType}
                                           labelText="Password"
                                           name={inputTypes.password.name}
                                           labelClass={'inline_label password-image'}
                                           required="required"
                                           placeholder="Enter password"
                                    />

                                    <Button classes=" login_btn " name="submit">
                                    Login
                                </Button>
                                <label className="newUSer">New to this?<Link className="newUSer text-dark" exact to={'/join'}> Create an account.</Link></label>
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