import React from 'react';
import Image from 'next/image';
import { Exception } from '@/app/lib/schemas/comms.schema';

// Annoyingly this component doesn't accept any props
// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
export default function NotFound(exception: Exception) {
  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="rounded-lg bg-white shadow-lg">
        <div className="flex flex-col text-center">
          <div className="relative z-10 mx-auto mb-4 mt-12 h-40 w-40">
            <Image
              src="/sad-cat.jpg"
              alt="Cat looking sad"
              fill
              className="rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
          <h2 className="text-md font-semibold text-red-800">Not Found</h2>
        </div>
      </div>
    </main>
  );
}
