import React from 'react';
import Image from 'next/image';

const DeliveryNotification = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Card Content Container */}
        <div className="flex flex-col md:flex-row text-center md:text-left">
          {/* Image Section */}
          <div className="hidden md:block md:w-[45%] relative aspect-video">
            <Image
              src="/katkin-cat.png"
              alt="Cat with KatKin products"
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 relative">
            {/* Profile Image - Only visible on mobile */}
            <div className="md:hidden w-16 h-16 mx-auto -mt-12 mb-4 relative z-10">
              <Image
                src="/katkin-cat.png"
                alt="Cat profile"
                fill
                className="rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            {/* Text Content */}
            <h2 className="text-green-700 text-base font-bold mb-2">
              Your next delivery for Dorian and Ocie
            </h2>
            <p className="text-gray-600 mb-4 text-xs font-light">
              Hey Kayleigh! In two days&apos; time, we&apos;ll be charging you
              for your next order for Dorian and Ocie&apos;s fresh food.
            </p>
            <p className="text-gray-800 text-sm font-bold mb-6">
              Total price: £134.00
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-4">
              <button className="bg-green-700 font-semibold text-xs text-white px-6 py-1 rounded-[4px] hover:bg-green-800 transition-colors flex-grow">
                SEE DETAILS
              </button>
              <button className="border border-green-700 font-semibold text-xs text-green-700 px-6 py-1 rounded-[4px] hover:bg-green-50 transition-colors flex-grow">
                EDIT DELIVERY
              </button>
            </div>

            {/* Free Gift Badge */}
            <div className="absolute -bottom-5 right-[50%] translate-x-1/2 md:translate-x-0 md:bottom-auto md:-top-3 md:-right-12 -rotate-[5deg] md:rotate-6 bg-pink-200 border-pink-300 border text-pink-700 px-3 py-[2px] text-sm font-bold">
              FREE GIFT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotification;
