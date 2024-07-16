import { BACKEND_URL } from "@/src/constants/Backend";

function EditOrderStatusAsync(id: number, status: string, courier: string) {
  const editOrderStatus = async () => {
    const endpoint = `${BACKEND_URL}/orders/${id}`;

    const requestBody = {
      status: status,
      ...(courier && { deliveredBy: courier })
    };

    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  return editOrderStatus();
}

export default EditOrderStatusAsync;
