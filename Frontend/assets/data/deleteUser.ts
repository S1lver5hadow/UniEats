import { BACKEND_URL } from "@/src/constants/Backend";

export const deleteUserAsync = async (query: string) => {
  const endpoint = `${BACKEND_URL}/users/${query}`

  try {
    console.log(endpoint);
    const response = await fetch(endpoint, {
      method: 'DELETE'
    })

    const data = await response.text()
    console.log(data);
    return data
  } catch (err) {
    console.error(err)
  }
}

