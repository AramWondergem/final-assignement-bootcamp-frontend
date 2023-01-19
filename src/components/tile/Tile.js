import './tile.css'
import React from 'react';

function Tile({children,className, type}) {
    return (
        <div className={`${className} tile tile-${type}`}>
            {children}
            {type === 'picture' && <div className="shadow"></div>}
        </div>
    );
}

export default Tile;