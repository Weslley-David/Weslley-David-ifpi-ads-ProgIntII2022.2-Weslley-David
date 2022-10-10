import React from 'react'
import FetchCountries from '../components/countries/FetchCountries'
import Navbar from '../components/navbar/Navbar'
export default function Countries() {
  return (
    <div>Countries
        <Navbar/>
        <FetchCountries/>
    </div>
  )
}
