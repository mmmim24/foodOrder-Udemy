import React from 'react'
import ReactDom from 'react-dom'

export default function Modal({ children, onClose, open, className = '' }) {
    const dialog = React.useRef();
    React.useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }

        return () => {
            modal.close();
        }
    }, [open]);

    return ReactDom.createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose} >
            {children}
        </dialog>
        , document.getElementById('modal')
    )
}
