
import React, {Component} from 'react';
import Login from './containers/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewAccount from './containers/NewAccount/newAccount'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './App.css';
import WelcomeScreen from "./containers/welcomeScreen/welcomeScreen";

export const VisibilityContext = React.createContext(false);

export class VisibilityProvider extends React.Component {
    constructor(props){
    super(props);
    this.state={
        visibility:false
    };
    };



     render() {
         return (
             <VisibilityContext.Provider value={{
                 state:this.state,
                 welcomeUser: (e)=>this.setState({visibility:true})
             }}>
                 {this.props.children}
             </VisibilityContext.Provider>
         )
     }
 }

 class App extends Component {
     constructor(props) {
         super(props);
     };

     render() {
         return (
             <div>
                 <Router basename={'/'}>
                     <div className="App">
                         <Route exact path="/" component={Login}/>
                         <Route path="/welcomeScreen" component={WelcomeScreen}/>
                         <Route path="/join" component={NewAccount}/>
                     </div>
                 </Router>
             </div>
         );
     }
 }

export default App;

