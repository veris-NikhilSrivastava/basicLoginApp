import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'
import Axios from 'axios';
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";
import {inputTypes} from "../../components/UI/Input/inputTypes";
import './Login.css';
import {VisibilityProvider, VisibilityContext} from "../../App";

const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const URL=`http://192.168.5.183:5000/login`;
const axios = Axios.create({
    headers: {
        'Content-Type':'application/json',}});
axios.defaults.headers.get['Content-Type'] = 'application/json';


const numberRegex = new RegExp('[0-9]+');



export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password:"",
            errorState: false,
            justSignedUp: false,
            inputTypes:inputTypes,
            isLoading:true,
            passwordErrorState:false,
            incorrectPasswordStatus:false,
            noUserAccount:false,

        }
    };

    componentDidMount() {
        setTimeout(()=>{this.setState({isLoading:false})},1000);
    }

    //email Validation
    validationEmail = (e) => {
        this.setState({email:e.target.value},()=>{
            this.setState({errorState:false,
                noUserAccount:false})
            if(this.state.email!=='')
                this.setState({errorState:false})
            if (emailRegex.test(this.state.email) !== true)
                this.setState({errorState: true});
            else
                this.setState({errorState: false});
            if (this.state.email === "")
                this.setState({
                    errorState: false,
                    noUserAccount:false
                })

        })
    };

    validationPassword= (e) => {
        this.setState({password:e.target.value},()=>{
            this.setState({
                passwordErrorState:false,
                incorrectPasswordStatus:false
            });
            if(this.state.password === "")
                this.setState({
                    passwordErrorState: false,
                    incorrectPasswordStatus:false});
        })

    };

    handleState = (e) => {
        this.setState({incorrectPasswordStatus:false})
        this.setState({noUserAccount:false})
debugger
        e.preventDefault();
        let email=this.state.email;
        let password=this.state.password;
        if(email!==''&&password!=='')
            this.handleLoginApi();
        else
        {
            if (email === ''&&password === '')
            {
                this.setState({errorState: true});
                this.setState({passwordErrorState: true});
            }
            else {
                if (password === '')
                    this.setState({passwordErrorState: true});
                else
                    this.setState({errorState: true})
            }
        }
    };

    handleLoginApi=()=>{
        const data={
            email:this.state.email,
            password:this.state.password
        };
        axios
            .post(URL,data)
            .then(res=> {
                switch (res.status) {
                    case 200:
                        console.log(res)
                        this.setState({isLoading: false});
                        // this.props.history.pushState(this.state.accountCreated,"passData",'/welcomeScreen');
                        this.props.history.replace('/welcomeScreen');
                        break;
                    default:
                        break;
                }
            })
            .catch(err=>{
                switch (err.response.status) {
                    case 404:
                        console.log("hey")
                        this.setState({noUserAccount:true})
                        break;
                    case 401:
                        this.setState({incorrectPasswordStatus:true})
                        break;
                    case 400:
                        this.setState({
                            passwordErrorState:true,
                            errorState:true
                        });
                        break;
                    default:
                        break;
                }
            })

    };
        handleMultipleFunctionality=(e)=>{
            if(numberRegex.test(target.value[0])==true)
        }


    render() {
        console.log(this.state.accountCreated);
        return (
            <VisibilityProvider>
            <div>
                <div className="container-fluid container-fluid-login">
                    {this.props.accountCreated?(<h3 className="fade text-info ">Account created successfully!</h3>):null}
                    <div className="row login-wrapper">
                        <div className="loginPane col-md-4 col-sm-12">
                            <form onSubmit={this.handleState}>
                                <input type="text" className="multiFunc" />
                                    <Input type={inputTypes.email.inputType}
                                           classes={inputTypes.email.classes}
                                           autofocus={true}
                                           labelText="Email"
                                           name={inputTypes.email.name}
                                           labelClass={'inline_label email-image'}
                                           formNoValidate
                                           required="required"
                                           placeholder="Enter email"
                                           onchange={(e) => {
                                               this.validationEmail(e)
                                           }}
                                    />
                                    {this.state.errorState ? (
                                        <p className="errorMsg">Please enter valid email!</p>) : null}
                                    {this.state.noUserAccount?(
                                        <p className="errorMsg">Couldn't find your account</p>) : null}



                                    <Input classes={inputTypes.password.classes}
                                           type={inputTypes.password.inputType}
                                           labelText="Password"
                                           name={inputTypes.password.name}
                                           labelClass={'inline_label password-image'}
                                           required="required"
                                           placeholder="Enter password"
                                           onchange={(e)=>{
                                               this.validationPassword(e)
                                           }}
                                    />
                                {this.state.passwordErrorState ? (
                                    <p className="  errorMsg">Please enter the password!</p>) : null}
                                {this.state.incorrectPasswordStatus ? (
                                    <p className=" errorMsg">Invalid Password!</p>) : null}

                                    <Button classes=" login_btn " >
                                    Login
                                </Button>
                                <label className="newUSer">New to this?<Link className="newUSer text-decoration-none text-dark" exact to={'/join'}> Create an account.</Link></label>
                            </form>
                        </div>
                    </div>
                    {this.state.isLoading ? (
                        <div className="preloader"></div>
                    ) : null}
                </div>
            </div>
            </VisibilityProvider>
        );
    }
}

export default Login;