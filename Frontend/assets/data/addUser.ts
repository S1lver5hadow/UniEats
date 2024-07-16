import { BACKEND_URL } from "@/src/constants/Backend";

function addUserAsync(username: string) {

  const submitUser = async () => {
    const endpoint = `${BACKEND_URL}/users/`;
 
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "name": username,
          "placed_orders": [],
          "delivering_orders": []
        })
      })

      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err)
    }
  }

  return submitUser()
}

export default addUserAsync;
