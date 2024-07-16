import { useEffect, useState } from 'react';
import { BACKEND_URL } from "@/src/constants/Backend";

interface ProductsProps {
  query: string
}

function Products({ query }: ProductsProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    const endpoint = `${BACKEND_URL}/food/${query}`

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

  return data;
}

export default Products;
