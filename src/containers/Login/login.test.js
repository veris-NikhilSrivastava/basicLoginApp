import React from 'react';
import {expect} from 'chai';
import {configure, shallow} from 'enzyme';
import {Login} from "./Login";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

describe('Login component tests',()=>{
    let wrapper;



it('tests email is valid',()=>{
    const event = {
        target: {
            value: 'dummy@gmail.com'
        }
    };
    wrapper.instance().validationEmail();
    expect(wrapper.state().errorState).to.equal(true);
});

it('test submit button',()=>{
    wrapper.find('button').simulate('submit', {preventDefault(){}});

})


});
