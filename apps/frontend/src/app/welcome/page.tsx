import Image from 'next/image';

export default function Welcome() {
  return (
    <main>
      <div className="md:w-1/2 relative aspect-square">
        <Image
          src="/katkin-cat.png"
          alt="Cat with KatKin products"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}
