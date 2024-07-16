import { useEffect, useState } from 'react';
import { BACKEND_URL } from "@/src/constants/Backend";

interface OrderProps {
  query: string,
}

function Orders({ query }: OrderProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    const endpoint = `${BACKEND_URL}/orders/${query}`

    try {
      const response = await fetch(endpoint, {
        method: 'GET'
      })

      const data = await response.json()
      setData(data);
    } catch (err) {
      console.error(err)
    }
  }

  return data;
}

export default Orders;
