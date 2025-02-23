import Image from 'next/image';

export default function Welcome() {
  return (
    <main>
      <div className="relative aspect-square md:w-1/2">
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
