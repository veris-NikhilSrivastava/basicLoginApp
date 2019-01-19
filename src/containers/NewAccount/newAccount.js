import React, {Component} from 'react';
import Axios from 'axios';
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
const signupURL=`http://192.168.5.183:5000/join`;
const getUsersURL=`http://192.168.5.183:5000/getusers`;

const axios = Axios.create({});


export class NewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailErrorState: false,
            passwordErrorState: false,
            passwordLengthError: true,
            numberInPasswordError: true,
            uppercaseInPasswordError: true,
            email:"",
            username:"",
            usernameExist:false,
            dataSet:[]

        }
    };


    componentDidMount() {
        axios
            .get(getUsersURL)
            .then(res=>{
                switch (res.status) {
                    case 200:
                        this.setState({dataSet:res.data});
                        break;
                    default:
                        break;

                }
            })
    };

    handleSignupAPI=()=>
    {
        const data={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        };

        axios
            .post(signupURL,data)
            .then(res=>{
                switch (res.status) {
                    case 201:
                        this.setState({isLoading:false});
                        this.props.history.replace('/login');
                        break;
                    default:
                        break;
                }
            })
            .catch(err=>{
                switch (err.response.status) {
                    case 409:
                        this.setState({usernameExist:true})
                        break;
                    case 500:
                        this.setState({internalServerError:true})
                        break;
                    default:
                        break;
                }
            })
    }

    validationEmail = (e) => {
        this.setState({email:e.target.value},()=> {
            if (emailRegex.test(this.state.email) !== true)
                this.setState({emailErrorState: true});
            else
                this.setState({emailErrorState: false});
            if (this.state.email === "")
                this.setState({emailErrorState: false});
        })
    };

    validationPassword = (e) => {
        this.setState({password: e.target.value}, () => {
            this.setState({
                passwordErrorState:false
            })
            if (lengthRegex.test(this.state.password) !== true)//if false
                this.setState({passwordLengthError: true});
            else
                this.setState({passwordLengthError: false});

            if (numberRegex.test(this.state.password) !== true)
                this.setState({numberInPasswordError: true});
            else
                this.setState({numberInPasswordError: false});

            if (uppercaseRegex.test(this.state.password) !== true)
                this.setState({uppercaseInPasswordError: true});
            else
                this.setState({uppercaseInPasswordError: false});

            if (lengthRegex.test(this.state.password)=== true && numberRegex.test(this.state.password) === true && uppercaseRegex.test(this.state.password) === true)
                this.setState({passwordErrorState: false})

            if (this.state.password === "")
                this.setState({
                    passwordErrorState: false,
                    passwordLengthError: true,
                    numberInPasswordError: true,
                    uppercaseInPasswordError: true
                });
        })
    };

    handleUsername=(e)=>{
        this.setState({username:e.target.value},()=>{
            this.setState({
                usernameError:false,
                usernameExist:false
            })
            if(this.state.username==="")
                this.setState({
                    usernameError:false,
                    usernameExist:false
                })
            this.state.dataSet.usernames.map((item)=> {
                if(this.state.username === item)
                    this.setState({usernameExist: true})
            })
        });
    };

    formValidation=(e)=>{
        e.preventDefault();
        if(this.state.email==='')
            this.setState({emailErrorState:true})
        if(this.state.username==='')
            this.setState({usernameError:true});
        if(this.state.numberInPasswordError===false&&this.state.emailErrorState===false&&this.state.email!==''&&this.state.uppercaseInPasswordError===false&&this.state.passwordLengthError===false)
         this.handleSignupAPI();
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
                                <Input type={inputTypes.username.inputType}
                                       required="required"
                                       name={inputTypes.username.name}
                                       labelText="Username"
                                       labelClass={'inline_label'}
                                       classes={inputTypes.username.classes}
                                       autofocus
                                       onchange={(e)=>{
                                           this.handleUsername(e)
                                       }}
                                       placeholder="Set username"
                                />
                            {this.state.usernameExist?
                                (<div className="usernameSearchLoader d-inline"></div>):null}
                            {this.state.usernameError ? (
                                <p className=" errorMsg">Please enter a username!</p>) : null}
                            {this.state.usernameExist ? (
                                <p className=" errorMsg">Username already exists</p>) : null}

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
                            {this.state.emailErrorState? (
                                <p className=" errorMsg">Please enter a valid email!</p>) : null}
                                <Input type={inputTypes.accCreationPass.inputType}
                                       required="required"
                                       name={inputTypes.accCreationPass.name}
                                       labelText="Password"
                                       labelClass="inline_label"
                                       placeholder="Set password"
                                       classes={inputTypes.accCreationPass.classes}
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