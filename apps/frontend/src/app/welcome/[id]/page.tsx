import DeliveryNotification from '@/app/ui/DeliveryNotification';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  // ]);
  return (
    <main>
      <h1>Hi there Customer {id}</h1>
      <div className="min-h-screen bg-gray-100 py-8">
        <DeliveryNotification />
      </div>
    </main>
  );
}
