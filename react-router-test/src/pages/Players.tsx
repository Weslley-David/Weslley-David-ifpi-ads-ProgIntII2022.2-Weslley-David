import React from 'react'
import Navbar from '../components/navbar/Navbar'
import FetchPlayers from '../components/players/FetchPlayers'
export default function Players() {
  return (
    <div>Players
      <Navbar/>
      <FetchPlayers/>
    </div>
    
  )
}
