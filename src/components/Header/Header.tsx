import React from 'react'
import style from './Header.module.css'

export const Header = () => {
  return (
    <header className={style.header} >
      <div className={style["header-container"]}>
        <figure className={style.logo}>
          <i className="fa-solid fa-basket-shopping"></i>
          <span className={style['logo-text']}>Shopping</span>
        </figure>

      </div>
    </header >
  )
}
