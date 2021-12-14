import React from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '../../../assets/logo.svg'
import css from './Layout.module.scss'

const Layout = (props) => {
  return (
    <div className={css.Body}>
      <img src={Logo} alt='Krateo' className={css.Logo} />
      <ul className={css.UlNav}>
        <li>
          <NavLink
            to='/'
            exact
            className={css.Link}
            activeClassName={css.LinkActive}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/logs'
            exact
            className={css.Link}
            activeClassName={css.LinkActive}
          >
            logs
          </NavLink>
        </li>
      </ul>
      <div className={css.Content}>{props.children}</div>
    </div>
  )
}

export default Layout
