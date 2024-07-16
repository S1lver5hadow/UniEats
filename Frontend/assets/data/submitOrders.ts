import { CartItem } from '../../src/constants/Types';
import { BACKEND_URL } from "@/src/constants/Backend";

function SubmitNewOrderAsync(total: number, items: CartItem[], customer: string, lat: number, long: number,
                             room: string, info: string) {

  // Simple placeholder algorithm to yield different delivery charges
  // Feel free to replace with something more sophisticated
  const calculateDeliveryCost = (total: number) => {
    if (total <= 10) {
      return 1;
    } else if (total > 100) {
      return 10;
    } else {
      return Math.round((total / 10) * 10) / 10; // Round to the nearest tenth
    }
  };

  const submitOrder = async () => {
    const endpoint = `${BACKEND_URL}/orders/`;
    const deliveryCost = calculateDeliveryCost(total);
    const restaurants = [...new Set(items.map(item => item.product.restaurant))];
 
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "totalFoodPrice": total,
          "deliveryCost": deliveryCost,
          "status": "OP",
          "items": JSON.stringify(items.map(item => ({ id: item.product_id, quantity: item.quantity }))),
          "latitude": lat,
          "longitude": long,
          "room": room,
          "extraInfo": info,
          "orderedBy": customer,
          "restaurants": "[" + restaurants.join(", ") + "]"
        })
      })

      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err)
    }
  }

  return submitOrder()
}

export default SubmitNewOrderAsync;
