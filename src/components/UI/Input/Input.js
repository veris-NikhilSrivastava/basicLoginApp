import React, {Component} from 'react';

export class Input extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let inputElement=null;
        switch (this.props.inputType) {
            case('email'):
                inputElement = <input
                    className={this.props.classes}
                    type={this.props.type}
                    autofocus
                    name={this.props.name}
                    formNoValidate
                    ref={this.props.ref}
                    onChange={this.props.onchange}
                    required="required"
                    placeholder={this.props.placeholder}
                />;
                break;
            case('password'):
                inputElement = <input
                    className={this.props.classes}
                    type={this.props.type}
                    name={this.props.name}

                    required="required"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onchange}
                />;
                break;
            case('text'):
                inputElement = <input
                    className={this.props.classes}
                    type={this.props.type}
                    name={this.props.name}

                    autoFocus
                    required="required"
                    placeholder={this.props.placeholder}
                />;
                break;
            default:
                inputElement = <input onChange={this.props.onchange}
                                      placeholder={this.props.placeholder}
                                      className={this.props.classes}
                                      type={this.props.type}
                />;
                break;

        }
        return (
            <div className={'form-group'}>
                <label className={this.props.labelClass} >{this.props.labelText}<p className="text-danger d-inline">*</p> </label>
                {inputElement}
            </div>
        );


    }}
    export default Input;
