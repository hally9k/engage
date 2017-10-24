/* eslint-disable react/prop-types */
import React from 'react'
import { NavLink } from 'redux-first-router-link'
import warningIcon from 'icon/warning.svg'
import fallback from '../../style/page/fallback.scss'

const css = {
    ...fallback
}

const Unauthorized = props => (
    <div className={css.fallback}>
        <div className={css.info}>
            <img
                className={css.icon}
                src={warningIcon}
                alt="An error has occurred."
            />
            {props.message && <h2 className={css.message}>{props.message}</h2>}
            {props.info && <p className={css.message}>{props.info}</p>}
            {props.link &&
                props.linkname && (
                    <NavLink to={props.link}>{props.linkname}</NavLink>
                )}
        </div>
    </div>
)

export default Unauthorized
