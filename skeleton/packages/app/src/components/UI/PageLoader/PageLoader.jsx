import React from 'react'

import css from './PageLoader.module.scss'
import Logo from '../../../assets/logo.svg'

const PageLoader = () => (
  <div className={css.LoaderBkg}>
    <div className={css.Loader}></div>
    <img src={Logo} className={css.Logo} alt='Krateo' />
  </div>
)

export default PageLoader
