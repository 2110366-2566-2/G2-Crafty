'use client';

import React, { FC } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2';

interface Props {
  type: 'Topup' | 'Buy' | 'Sell';
  amount: number;
  timestamp: Date;
}

const TransactionComponent: FC<Props> = ({ type, amount, timestamp }) => {
  const formatDate = (unix: Date) => {
    const date = new Date(unix);

    return date.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok', // Specify the timezone
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (type === 'Topup')
    return (
      <div className="relative flex w-full items-center gap-x-3 rounded-xl bg-white px-4 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="absolute right-3 top-3 flex flex-col items-end">
          <p className="font-medium text-ct_pos">+{amount.toFixed(2)} ฿</p>
        </div>
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-ct_gray-200">
          <FaPlus color="white" className="h-8 w-8" />
        </div>
        <div className="flex flex-1 flex-col gap-y-1 py-1">
          <p className="font-bold text-ct_brown-500">เติมเงิน</p>
          <p className="text-sm text-ct_gray-400">{formatDate(timestamp)}</p>
        </div>
      </div>
    );
  else if (type === 'Buy')
    return (
      <div className="relative flex w-full items-center gap-x-3 rounded-xl bg-white px-4 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <p className="absolute right-3 top-3 text-sm text-ct_gray-400">{formatDate(timestamp)}</p>
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-ct_gray-200">
          <HiMiniArrowRightOnRectangle color="white" className="h-8 w-8" />
        </div>
        <div className="flex flex-1 flex-col gap-y-1 py-1">
          <p className="font-bold text-ct_brown-500">ซื้อสินค้า</p>
          <p className="font-medium text-ct_neg">-{amount.toFixed(2)} ฿</p>
        </div>
      </div>
    );
  else if (type === 'Sell')
    return (
      <div className="relative flex w-full items-center gap-x-3 rounded-xl bg-white px-4 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <p className="absolute right-3 top-3 text-sm text-ct_gray-400">{formatDate(timestamp)}</p>
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-ct_gray-200">
          <p className="select-none text-center text-4xl font-normal text-white">฿</p>
        </div>
        <div className="flex flex-1 flex-col gap-y-1 py-1">
          <p className="font-bold text-ct_brown-500">ขายสินค้า</p>
          <p className="font-medium text-ct_pos">+{amount.toFixed(2)} ฿</p>
        </div>
      </div>
    );
};

export default TransactionComponent;
