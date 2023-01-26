import React from 'react';
import './modal.css'
import Tile from "../tile/Tile";

function Modal({showModal, children, classNameModal, classNameContent}) {
    return (
        <>
            {showModal && <><div className={`${classNameModal} modal-overlay`}>
                <div className="modal-content">
                    <Tile  className={classNameContent} type="text">
                        {children}
                    </Tile>
                </div>
            </div></>}
        </>
    );
}

export default Modal;