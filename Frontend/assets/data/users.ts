import { useEffect, useState } from 'react';
import { BACKEND_URL } from "@/src/constants/Backend";

interface UserProps {
  query: string
}

function User({ query }: UserProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    const endpoint = `${BACKEND_URL}/users/${query}`

    try {
      const response = await fetch(endpoint, {
        method: 'GET'
      })

      const data = await response.json()
      setData(data)
    } catch (err) {
      console.log(err)
    }
  }

  return data[0];
}

export default User;
