import React from 'react'
import { useContainer } from '../container'
import { Header } from '../../components';

export const Home = () => {
  
  const {
    state
  } = useContainer();

  return (
    <div>
      <Header />
    </div>
  )
}
