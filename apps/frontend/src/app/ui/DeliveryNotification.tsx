import React from 'react';
import Image from 'next/image';
import styles from './DeliveryNotification.module.css';

const DeliveryNotification = () => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="rounded-lg bg-white shadow-lg">
        {/* Card Content Container */}
        <div className="flex flex-col text-center md:flex-row md:text-left">
          {/* Image Section */}
          <div className="relative hidden aspect-video md:block md:w-[45%]">
            <Image
              src="/katkin-cat.png"
              alt="Cat with KatKin products"
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="relative p-6 md:w-1/2">
            {/* Profile Image - Only visible on mobile */}
            <div className="relative z-10 mx-auto -mt-12 mb-4 h-16 w-16 md:hidden">
              <Image
                src="/katkin-cat.png"
                alt="Cat profile"
                fill
                className="rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>

            {/* Text Content */}
            <h2 className="mb-2 text-base font-bold text-green-700">
              Your next delivery for Dorian and Ocie
            </h2>
            <p className="mb-4 text-xs font-light text-gray-600">
              Hey Kayleigh! In two days&apos; time, we&apos;ll be charging you
              for your next order for Dorian and Ocie&apos;s fresh food.
            </p>
            <p className="mb-6 text-sm font-bold text-gray-800">
              Total price: £134.00
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-4">
              <button className={styles.buttonFill}>SEE DETAILS</button>
              <button className={styles.buttonOutline}>EDIT DELIVERY</button>
            </div>

            {/* Free Gift Badge */}
            <div className={styles.badge}>FREE GIFT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotification;
