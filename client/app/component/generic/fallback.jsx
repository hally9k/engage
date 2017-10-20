/* eslint-disable react/prop-types */
import React from 'react'
import { NavLink } from 'redux-first-router-link'

const Unauthorized = props => (
    <div className="fallback">
        <div className="info">
            <img
                className="icon"
                src="/icons/warning.svg"
                alt="An error has occurred."
            />
            {props.message && <h2 className="message">{props.message}</h2>}
            {props.info && <p className="message">{props.info}</p>}
            {props.link &&
                props.linkname && (
                    <NavLink to={props.link}>{props.linkname}</NavLink>
                )}
        </div>
    </div>
)

export default Unauthorized
