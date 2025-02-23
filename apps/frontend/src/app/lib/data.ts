import { UUID } from 'crypto';
import { DeliveryMessageResponse } from './schemas/comms.schema';

export async function fetchNextDeliveryMessage(
  userId: UUID,
): Promise<DeliveryMessageResponse> {
  try {
    // NB server URL would normally be configured in an env file
    const response = await fetch(
      `http://localhost:3000/comms/your-next-delivery/${userId}`,
    );
    const isOK = response.ok;
    const status = response.status;
    const data = await response.json();
    // we can do additional error logging here if required
    if (!isOK) {
      console.error(
        `ERROR fetchNextDeliveryMessage ${status} ${data?.exception?.message || 'error'}`,
      );
    }
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error(`Failed to fetch next delivery message. ${error}`);
  }
}
