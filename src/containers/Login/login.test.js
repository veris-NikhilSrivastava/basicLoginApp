import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {configure, shallow} from 'enzyme';
import Login from "./Login";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

describe('Login component tests',()=>{
    let wrapper;


beforeEach(()=>{
    wrapper=shallow(<Router><Login/></Router>).dive();
});

it('renders without crashing',()=>{
    const div=document.createElement('div');
    ReactDOM.render(<Router><Login/></Router>,div);
})
it('tests email is valid',()=>{
    const event = {
        target: {
            value: 'dummy@gmail.com'
        }
    };
    wrapper.instance().validation(event);
    expect(wrapper.state().errorState).to.equal(false);
});

it('test submit button',()=>{
    wrapper.find('.login_btn').simulate('submit', {preventDefault(){}});

})


});
