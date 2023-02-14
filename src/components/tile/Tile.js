import './tile.css'
import React from 'react';

function Tile({children, className, type, flexCollumn}) {
    return (
        <div className={`${className} tile tile-${type} tile-${flexCollumn ? "flex-collumn" : "flex-row"}`}>
            {children}
            {type === 'picture' && <div className="shadow"></div>}
        </div>
    );
}

export default Tile;