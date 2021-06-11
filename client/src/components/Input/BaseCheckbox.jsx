import React from 'react'

export default function BaseCheckbox({id, name, selected, onChange, ...props}) {

    return (
        <label className={`check-container ${name}-${id}`}>
            <input
                type="checkbox"
                name={name}
                {...props}
            />
            <span className="checkmark"></span>
        </label>
    )
}  