import React, {Component} from 'react';
import './newAccount.css';
import {VisibilityProvider, VisibilityContext} from "../../App";
import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import {inputTypes} from "../../components/UI/Input/inputTypes";
const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
//const passwordRegex = new RegExp('(?=.*\\d)(?=.*[a-zA-Z]).{8,}$');
const numberRegex = new RegExp('[0-9]+');
const lengthRegex = new RegExp('.{8,}');
const uppercaseRegex = new RegExp('[A-Z]+');

export class NewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailErrorState: false,
            passwordErrorState: false,
            passwordLengthError: true,
            numberInPasswordError: true,
            uppercaseInPasswordError: true,
            email:''

        }

        // this.inputRef=React.createRef();

    };

    validationEmail = (e) => {
        this.setState({email:e.target.value},()=>(console.log(this.state.email)));

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
                passwordErrorState:false,
                passwordLengthError: true,
                numberInPasswordError: true,
                uppercaseInPasswordError: true
            });
    }
    formValidation=(e)=>{
        e.preventDefault();
        if(this.state.email==='')
            this.setState({emailErrorState:true})
        if(this.state.numberInPasswordError===false&&this.state.emailErrorState===false&&this.state.email!==''&&this.state.uppercaseInPasswordError===false&&this.state.passwordLengthError===false)
         this.props.history.replace('/')
        else {
            this.setState({passwordErrorState:true})
        }

    }
    render() {
        return (
            <VisibilityProvider>
            <div className="container-fluid">
                <div className="row login-wrapper">
                    <div className="loginPane col-md-5 col-sm-12">
                        <h2 className="heading"> Create your personal account </h2>
                        <form onSubmit={this.formValidation} >
                            {/*<div className="form-group">*/}

                                {/*<label className="inline_label"> Username <p className="text-danger d-inline">*</p>*/}
                                {/*</label>*/}
                                <Input type={inputTypes.username.inputType}
                                       required="required"
                                       name={inputTypes.username.name}
                                       labelText="Username"
                                       labelClass={'inline_label'}
                                       classes={inputTypes.username.classes}
                                       autoFocus
                                       placeholder="Set username"

                                />
                            {/*</div>*/}

                            {/*/!*<div className="form-group">*!/*/}
                                {/*<label className="inline_label">*/}
                                    {/*{this.state.emailErrorState ?*/}
                                        {/*(<p className=" errorMsg">Email address</p>) :*/}
                                        {/*<div><p className="d-inline">Email address </p><p*/}
                                            {/*className="text-danger d-inline"></p>*/}
                                        {/*</div>*/}
                                    {/*}*/}
                                {/*</label>*/}
                                <Input type={inputTypes.accCreationEmail.inputType}
                                       classes={inputTypes.accCreationEmail.classes}
                                       required="required"
                                       formNoValidate
                                       name={inputTypes.accCreationEmail.name}
                                       labelText="Email Address"
                                       labelClass={this.state.emailErrorState? "errorMsg":"inline_label"}
                                       placeholder="Enter email"
                                       ref={inputTypes.accCreationEmail.inputRef}
                                       onchange={(e) => {
                                           this.validationEmail(e)
                                       }}
                                />
                                {this.state.emailErrorState ? (
                                    <p className=" errorMsg">Please enter valid email!</p>) : null}

                            {/*</div>*/}

                            {/*<div className="form-group rules">*/}
                                {/*<label className="inline_label"> Password <p className="text-danger d-inline">*</p>*/}
                                {/*</label>*/}
                                <Input type={inputTypes.accCreationPass.inputType}
                                       required="required"
                                       name={inputTypes.accCreationPass.name}
                                       labelText="Password"
                                       labelClass="inline_label"
                                       placeholder="Set password"
                                       classes={inputTypes.accCreationPass.classes}
                                       // ref={this.inputRef}
                                       onchange={(e) => {
                                           this.validationPassword(e)
                                       }}
                                />
                                {this.state.passwordErrorState ? (
                                    <p className=" errorMsg">Please enter valid password!</p>) : null}

                                <label className=" rules inline_label d-inline errorMsg">Make sure it contains
                                    {this.state.passwordLengthError ? (
                                            <p className="rules d-inline errorMsg"> at least 8 characters</p>) :
                                        <p className="rules text-white d-inline errorMsg"> at least 8 characters</p>}
                                    {this.state.numberInPasswordError ? (
                                        <p className="rules d-inline errorMsg"> including a number </p>) : (
                                        <p className="rules text-white d-inline errorMsg"> including a number </p>)} and
                                    {this.state.uppercaseInPasswordError ? (
                                        <p className="rules  d-inline errorMsg"> a uppercase letter.</p>) : (
                                        <p className="rules text-white d-inline errorMsg"> a uppercase letter</p>)}
                                </label>
                                <Button classes="newAcc login_btn " >
                                            Create an account
                                </Button>

                        </form>
                    </div>
                </div>
            </div>
            </VisibilityProvider>
        );
    }
}

export default NewAccount;