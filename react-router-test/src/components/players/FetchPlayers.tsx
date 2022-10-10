import React, { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios';

interface Player {
    id: number
    name: string
    rating: number
}

function FetchPlayers() {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchPlayersAxios = async () => {
            const URL = 'http://localhost:3000/players'
            const config: AxiosRequestConfig = {
                headers: {
                    Accept: "application/json"
                }
            }
            setLoading(true)

            const response = await axios.get<Player[]>(URL, config)
            setPlayers(response.data)
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
          {players.map(player => <li key={player.id}>{player.name} {player.rating}</li>)}
        </ul>)
      }
      
    </div>
    )
}

export default FetchPlayers