import React, {Component} from 'react';
import './welcomeScreen.css';

export class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            errorState:false,
            isLoading:true
        }
    };
    componentDidMount() {
        setTimeout(()=>{this.setState({isLoading:false})},500);
    }


    render() {

        return (
            <div className="container-fluid">
                <p className=" displayMessage">Hey! Congratulations you've completed your first Veris Assignment!</p>
                {this.state.isLoading ? (
                    <div className="preloader"></div>
                ) : null}
            </div>

        );
    }
}

export default WelcomeScreen;