/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DeliveryNotification from './DeliveryNotification';
import { DeliveryMessageResponse } from '../lib/schemas/comms.schema';
import React from 'react';

describe('DeliveryNotification', () => {
  const nextDeliveryData: DeliveryMessageResponse = {
    title: 'Your next delivery for Dorian and Ocie',
    message:
      "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
    totalPrice: 123.45,
    freeGift: true,
  };
  it('renders the delivery message data', () => {
    render(<DeliveryNotification data={nextDeliveryData} />);

    expect(
      screen.getByText(nextDeliveryData.title as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(nextDeliveryData.message as string),
    ).toBeInTheDocument();
  });
  it('renders a currency-formatted total price', () => {
    const data: DeliveryMessageResponse = {
      ...nextDeliveryData,
      totalPrice: 100,
    };
    const formattedPrice = 'Total price: £100.00';
    render(<DeliveryNotification data={data} />);

    expect(screen.getByText(formattedPrice)).toBeInTheDocument();
  });
  it('shows the free gift badge', () => {
    render(<DeliveryNotification data={nextDeliveryData} />);
    expect(screen.getByText('FREE GIFT')).toBeInTheDocument();
  });
  it('hides the free gift badge', () => {
    const data: DeliveryMessageResponse = {
      ...nextDeliveryData,
      freeGift: false,
    };
    render(<DeliveryNotification data={data} />);
    expect(screen.queryByText('FREE GIFT')).not.toBeInTheDocument();
  });
});
