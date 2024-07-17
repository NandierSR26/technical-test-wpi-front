import React, { useEffect, useRef } from 'react'
import style from './Modal.module.css'

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

export const TransactionModal = ({ children, isOpen }: Props) => {

  return (
    <div className={`${isOpen ? style['modal-backdrop'] : style['modal-backdrop-hidden']}`}>
      <div className={style['modal-container']}>
        { children }
      </div>
    </div>
  )
}
