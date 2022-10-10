import React, { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios';

interface Country {
    id: number
    name: string
    ranking: number
}

function FetchCountries() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchPlayersAxios = async () => {
            const URL = 'http://localhost:3000/countries'
            const config: AxiosRequestConfig = {
                headers: {
                    Accept: "application/json"
                }
            }
            setLoading(true)

            const response = await axios.get<Country[]>(URL, config)
            setCountries(response.data)
            setLoading(false)
        }
        fetchPlayersAxios()
    },[])

    return (
        <div className="App">

      {
        loading ? 
        (
          <h2>Loading...</h2>
        ) :
        (<ul>
          {countries.map(player => <li key={player.id}>{player.ranking} - {player.name} </li>)}
        </ul>)
      }
      
    </div>
    )
}

export default FetchCountries