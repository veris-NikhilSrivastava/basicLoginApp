import React from 'react';

const Button = (props) => (
    <button className={props.classes} onClick={props.clicked}>{props.children}</button>
);

export default Button;
