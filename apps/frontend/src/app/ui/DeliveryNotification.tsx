import React from 'react';
import Image from 'next/image';
import styles from './DeliveryNotification.module.css';
import { DeliveryMessageResponse } from '../lib/schemas/comms.schema';
import { formatCurrency } from '../lib/utils/formatCurrency';

const DeliveryNotification = ({ data }: { data: DeliveryMessageResponse }) => {
  if (!data.title || !data.message) {
    return null;
  }
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
              {data.title}
            </h2>
            <p className="mb-4 text-xs font-light text-gray-600">
              {data.message}
            </p>
            <strong className="mb-6 block text-sm font-bold text-gray-800">
              {`Total price: ${formatCurrency(data.totalPrice || 0)}`}
            </strong>

            {/* Buttons */}
            <div className="flex flex-row gap-4">
              <button className={styles.buttonFill}>SEE DETAILS</button>
              <button className={styles.buttonOutline}>EDIT DELIVERY</button>
            </div>

            {/* Free Gift Badge */}
            {data.freeGift && (
              <div
                className={styles.badge}
                aria-label="You have a free gift with this order"
              >
                FREE GIFT
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotification;
