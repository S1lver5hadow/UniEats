import { BACKEND_URL } from "@/src/constants/Backend";

interface OrderProps {
  query: string,
  setExternalState: (newState: any[]) => void,
}

function Orders({ query, setExternalState }: OrderProps) {
  const fetchData = async() => {
    const endpoint = `${BACKEND_URL}/orders/${query}`

    try {
      const response = await fetch(endpoint, {
        method: 'GET'
      })

      const data = await response.json()
      setExternalState(data);
    } catch (err) {
      console.error(err)
    }
  }

  fetchData();
}

export default Orders;
