import React from 'react'
import ReactDom from 'react-dom'

export default function Modal({ children, open, className = '' }) {
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
        <dialog ref={dialog} className={`modal ${className}`}>
            {children}
        </dialog>
        , document.getElementById('modal')
    )
}
