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
    const onSearchMock = jest.fn();
    const event = {
        preventDefault() {},
        target: { value: 'the-value' }
    };
    wrapper=shallow(<Login validation={onSearchMock} />);
});

it('renders without crashing',()=>{
    const div=document.createElement('div');
    ReactDOM.render(<Router><Login/></Router>,div);
});

// it('tests email is valid',()=>{
//     const event = {
//         target: {
//             value: 'dummy@gmail.com'
//         }
//     };
//     wrapper.instance().validation(event);
//     expect(wrapper.state().errorState).to.equal(false);
// });

it('should call onChange prop', () => {
        const onSearchMock = jest.fn();
        const event = {
            preventDefault() {},
            target: { value: 'the-value' }
        };
        const wrapper = shallow(<Login validation={onSearchMock} />).dive();
    //     const container = wrapper.find(styles.container)
    //  expect(container.length).to.equal(1)
    // container.simulate('keyup', {keyCode: 27});
        wrapper.find('Button').simulate('change', event);
        //expect(onSearchMock).toBeCalledWith('the-value');
    });


it('test submit button',()=>{
    wrapper.find('.login_btn').simulate('submit', {preventDefault(){}});

});

});
