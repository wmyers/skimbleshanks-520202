import { fetchNextDeliveryMessage } from '@/app/lib/data';
import DeliveryNotification from '@/app/ui/DeliveryNotification';
import { UUID } from 'crypto';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: UUID }> }) {
  const params = await props.params;
  const id = params.id;
  const data = await fetchNextDeliveryMessage(id);
  if (data.exception) {
    notFound();
  }
  console.log(data);
  return (
    <main className="@container">
      <div className="min-h-screen bg-gray-100 py-8">
        <DeliveryNotification data={data} />
      </div>
    </main>
  );
}
