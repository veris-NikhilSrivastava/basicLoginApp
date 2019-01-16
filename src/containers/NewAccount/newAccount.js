import React, {Component} from 'react';
import './newAccount.css';
import {VisibilityProvider, VisibilityContext} from "../../App";

const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
//const passwordRegex = new RegExp('(?=.*\\d)(?=.*[a-zA-Z]).{8,}$');
const numberRegex = new RegExp('[0-9]+');
const lengthRegex = new RegExp('.{8,}');
const uppercaseRegex = new RegExp('[A-Z]+');

export class NewAccount extends Component {
    static contextType = VisibilityContext;

    constructor(props) {
        super(props);
        this.state = {
            emailErrorState: false,
            passwordErrorState: false,
            passwordLengthError: true,
            numberInPasswordError: true,
            uppercaseInPasswordError: true

        }
        this.inputRef=React.createRef();

    };

    validationEmail = (e) => {
        if (emailRegex.test(e.target.value) !== true)
            this.setState({emailErrorState: true});
        else
            this.setState({emailErrorState: false});
        if (e.target.value === "")
            this.setState({emailErrorState: false});

    };

    validationPassword = (e) => {
        if (lengthRegex.test(e.target.value) !== true)//if false
            this.setState({passwordLengthError: true});
        else
            this.setState({passwordLengthError: false});

        if (numberRegex.test(e.target.value) !== true)
            this.setState({numberInPasswordError: true});
        else
            this.setState({numberInPasswordError: false});

        if (uppercaseRegex.test(e.target.value) !== true)
            this.setState({uppercaseInPasswordError: true});
        else
            this.setState({uppercaseInPasswordError: false});

        if(lengthRegex.test(e.target.value) === true&&numberRegex.test(e.target.value) === true&&uppercaseRegex.test(e.target.value) === true)
            this.setState({passwordErrorState:false})

        if (e.target.value === "")
            this.setState({
                passwordLengthError: true,
                numberInPasswordError: true,
                uppercaseInPasswordError: true
            });
    }
    formValidation=(e)=>{
        e.preventDefault();
        if(this.state.numberInPasswordError===false&&this.state.uppercaseInPasswordError===false&&this.state.passwordLengthError===false)
            this.props.history.replace('/')
        else {
            this.setState({passwordErrorState:true})
           // console.log(this.input.value);
        }

    }
    render() {
        return (
            <VisibilityProvider>
            <div className="container-fluid">
                <div className="row login-wrapper">
                    <div className="loginPane col-md-5 col-sm-12">
                        <form  >
                            <div className="form-group">
                                <h2 className="heading"> Create your personal account </h2>
                                <label className="inline_label"> Username <p className="text-danger d-inline">*</p>
                                </label>
                                <input type="text"
                                       required="required"
                                       className=" form-control accCreationInput "
                                       autoFocus
                                       ref={this.inputRef}
                                />
                            </div>

                            <div className="form-group">
                                <label className="inline_label">
                                    {this.state.emailErrorState ?
                                        (<p className="text-danger errorMsg">Email address *</p>) :
                                        <div><p className="d-inline">Email address </p><p
                                            className="text-danger d-inline">*</p>
                                        </div>
                                    }
                                </label>
                                <input type="email"
                                       className="form-control accCreationInput"
                                       required="required"
                                       inputRef={(ref) => {this.input = ref}}
                                       // ref={this.inputRef}
                                       onChange={(e) => {
                                           this.validationEmail(e)
                                       }}
                                />
                                {this.state.emailErrorState ? (
                                    <p className="text-danger errorMsg">Please enter valid email!</p>) : null}

                            </div>

                            <div className="form-group rules">
                                <label className="inline_label"> Password <p className="text-danger d-inline">*</p>
                                </label>
                                <input type="password"
                                       required="required"
                                       className="form-control accCreationInput"
                                       ref={this.inputRef}
                                       onChange={(e) => {
                                           this.validationPassword(e)
                                       }}
                                />
                                {this.state.passwordErrorState ? (
                                    <p className="text-danger errorMsg">Please enter valid password!</p>) : null}

                                <label className="rules inline_label d-inline errorMsg">Make sure it contains
                                    {this.state.passwordLengthError ? (
                                            <p className="rules text-danger d-inline errorMsg"> at least 8 characters</p>) :
                                        <p className="rules text-white d-inline errorMsg"> at least 8 characters</p>}
                                    {this.state.numberInPasswordError ? (
                                        <p className="rules text-danger d-inline errorMsg"> including a number </p>) : (
                                        <p className="rules text-white d-inline errorMsg"> including a number </p>)} and
                                    {this.state.uppercaseInPasswordError ? (
                                        <p className="rules text-danger d-inline errorMsg"> a uppercase letter.</p>) : (
                                        <p className="rules text-white d-inline errorMsg"> a uppercase letter</p>)}
                                </label>
                                <button className=" newAcc login_btn " onClick={(e)=>this.formValidation(e)}>
                                            Create an account
                                        </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            </VisibilityProvider>
        );
    }
}

export default NewAccount;