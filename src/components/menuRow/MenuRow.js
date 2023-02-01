import React from 'react';
import './menuRow.css';

function MenuRow({className, title, text}) {
    return (
        <div className={`${className} menuRow flex-row`}><h3>{title}</h3><p>{text}</p></div>
    );
}

export default MenuRow;