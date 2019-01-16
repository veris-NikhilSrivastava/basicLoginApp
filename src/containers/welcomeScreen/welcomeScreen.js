import React, {Component} from 'react';
import './welcomeScreen.css';

export class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            errorState:false
        }
    };


    render() {
        return (
            <div className="container-fluid">
                <p className=" displayMessage">Hey! Congratulations you've completed your first Veris Assignment!</p>
            </div>
        );
    }
}

export default WelcomeScreen;