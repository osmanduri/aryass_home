import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
export default function ProfilHome() {
  //@ts-ignore
  const userRedux = useSelector(state => state.user.userInfo)
  console.log(userRedux.token)
  return (
    <h1 className='text-center mt-12'>Bienvenue chez ARYAS'S HOME 😊</h1>
  )
}
