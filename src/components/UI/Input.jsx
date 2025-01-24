import React from 'react'

export default function Input({ label, id, ...props }) {
    return (
        <React.Fragment>
            <p className='control'>
                <label htmlFor={id}>{label}</label>
                <input id={id} name={id} {...props} required />
            </p>
        </React.Fragment>
    )
}
