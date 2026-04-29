import { Client } from '@hono/client'
import { useState, useEffect } from 'react';

export type User = {
  id: number;
  puuid: string;
  gameName: string;
  tagLine: string;
  riotId: string;
};

export default function HonoClient() {
  const client = new Client('http://localhost:3000/')
  
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await client.get('/users').send()
      const json = await res.json()
      setData(json)
    }
    fetchUsers()
  }, [])

    return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          {user.gameName}#{user.tagLine}
        </div>
      ))}
    </div>
  )
}