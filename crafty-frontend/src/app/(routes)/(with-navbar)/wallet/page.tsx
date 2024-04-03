'use client';

import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2';
import TransactionComponent from './_component/transactionComponent';
import { IoClose } from 'react-icons/io5';
import { BsFillTelephoneFill } from 'react-icons/bs';
import Image from 'next/image';

import Wallet from '@public/wallet.svg';
import { apiClient } from '@/configs/axiosConfig';
import useSWR, { Fetcher } from 'swr';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

import { useDisableSearchOnNavbar } from '../_hooks/searchOnNavbar/enableSearchOnNavbar';

interface IMesssageProps {
  txid: string;
  type: 'Topup' | 'Buy' | 'Sell';
  amount: number;
  timestamp: number;
}

const Page = () => {
  // const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);
  useDisableSearchOnNavbar();

  const fetcher1 = async () =>
    await apiClient.get('wallet/balance').then((res: any) => {
      // console.log(res.data);
      return res.data;
    });

  const fetcher2 = async () =>
    await apiClient.get('wallet/transactions').then((res: any) => {
      const transaction = res.data
        .map((t: any) => {
          return { amount: t.amount, txid: t.txid, timestamp: t.timestamp, type: t.type };
        })
        .sort(
          (a: IMesssageProps, b: IMesssageProps) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      // console.log(transaction);
      return transaction;
    });

  const option = {
    revalidateOnFocus: true,
    refreshInterval: 5000,
  };

  const {
    data: amount,
    error: amountError,
    isLoading: amountLoading,
  } = useSWR('/wallet/balance', fetcher1, option);
  const {
    data: transactions,
    error: transactionError,
    isLoading: transLoading,
  } = useSWR('/wallet/transactions', fetcher2, option);
  // const { transactions, error2 } = useSWR('/wallet/transactions', fetcher2);

  // const [amount, setAmount] = useState(100.0);
  // const [transactions, setTransactions] = useState<
  //   { id: string; type: 'Topup' | 'Purchase' | 'Withdraw'; amount: number; timestamp: string }[]
  // >([]);

  const [openTopupModal, setOpenTopupModal] = useState(false);
  const [openWithDrawModal, setOpenWithDrawModal] = useState(false);
  const [state, setState] = useState(0);
  const [topupAmount, setTopupAmount] = useState(0.0);
  const [topupAmountDisplay, setTopupAmountDisplay] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(0.0);
  const [withdrawAmountDisplay, setWithdrawAmountDisplay] = useState('');
  const [qr, setQr] = useState('');

  // useEffect(() => {
  //   apiClient.get('wallet/balance').then((res: any) => {
  //     console.log(res.data);
  //     // setAmount(res.data);
  //   });

  //   apiClient.get('wallet/transactions').then((res: any) => {
  //     console.log(res.data);
  //     const transaction = res.data
  //       .map((t: any) => {
  //         return { amount: t.amount, id: t.txid, timestamp: t.timestamp, type: t.type };
  //       })
  //       .sort(
  //         (a: IMesssageProps, b: IMesssageProps) =>
  //           new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  //       );
  //     // setTransactions(transaction);
  //   });
  // }, []);

  const topupInputHandler = (ip: string) => {
    if (ip.length === 0) {
      setTopupAmount(0);
      setTopupAmountDisplay('');
      return;
    }
    const cleanInput = ip.replace(/[^0-9.]/g, '');
    const dotCount = cleanInput.split('.').length - 1;
    if (dotCount >= 2) return;
    setTopupAmount(parseFloat(cleanInput));
    setTopupAmountDisplay(cleanInput);
  };

  const withdrawInputHandler = (ip: string) => {
    if (ip.length === 0) {
      setWithdrawAmount(0);
      setWithdrawAmountDisplay('');
      return;
    }
    const cleanInput = ip.replace(/[^0-9.]/g, '');
    const dotCount = cleanInput.split('.').length - 1;
    if (dotCount >= 2) return;
    setWithdrawAmount(parseFloat(cleanInput));
    setWithdrawAmountDisplay(cleanInput);
  };

  const disableConfirm = () => {
    if (state === 1) {
      return topupAmount <= 0;
    }
    if (state === 2) {
      return withdrawAmount <= 0 || amount < withdrawAmount;
    } else return true;
  };

  const topupSubmit = async () => {
    if (topupAmount <= 0) return;
    setOpenTopupModal(false);
    const res = await apiClient.get(`wallet/payment/qr?amount=${topupAmount}`);
    const base64: string = 'data:image/png;base64,' + res.data;
    setQr(base64);
  };

  const topupDone = () => {
    setState(0);
    setTopupAmount(0);
    setTopupAmountDisplay('');
    setQr('');
  };

  return (
    <>
      {!amountLoading && !transLoading && (
        <div className="flex max-h-screen w-full flex-1 flex-col items-center bg-ct_brown-100 pt-9">
          <div className="relative flex h-full w-full max-w-[450px] flex-col gap-y-3 overflow-x-hidden rounded-t-[36px] bg-white pt-10">
            <div className="flex flex-col gap-y-4 px-8">
              <div className="flex flex-col gap-y-6 rounded-2xl border-2 border-solid border-ct_brown-500 px-6 py-4">
                <div className="flex flex-row items-center gap-x-3">
                  <Wallet />
                  <p className="text-2xl text-ct_brown-500">จำนวนเงิน</p>
                </div>
                <div className="flex flex-row items-center gap-x-3">
                  <p className="text-4xl font-bold text-ct_brown-500">{amount.toFixed(2)}</p>
                  <p className="text-4xl font-light text-ct_brown-500"> ฿</p>
                  <div className="ml-auto flex flex-row items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <div
                        className={`flex h-12 w-12 flex-col items-center justify-center rounded-full ${state !== 1 ? 'cursor-pointer bg-ct_brown-500 hover:bg-ct_brown-600 active:scale-90' : 'bg-ct_gray-300'} transition-all`}
                        onClick={() => {
                          setState(1);
                        }}>
                        <FaPlus color="white" className="h-8 w-8" />
                      </div>
                      {/* <p className="text-lg font-bold text-ct_brown-500">เติมเงิน</p> */}
                    </div>

                    {/* <div className="ml-auto flex flex-col items-center justify-center gap-y-2">
                      <div
                        className={`flex h-12 w-12 flex-col items-center justify-center rounded-full ${state !== 2 ? 'cursor-pointer bg-ct_brown-500 hover:bg-ct_brown-600 active:scale-90' : 'bg-ct_gray-300'} transition-all`}
                        onClick={() => {
                          setState(2);
                        }}>
                        <HiMiniArrowRightOnRectangle color="white" className="h-8 w-8" />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex h-0 w-full flex-1 flex-col gap-y-2 rounded-t-[36px] bg-ct_gray-100 pt-6">
              {state === 0 ? (
                <>
                  <p className="px-6 text-2xl font-bold text-ct_brown-500">การทำรายการ</p>
                  <div className="hideScrollbar flex h-full w-full flex-col items-center gap-y-2 overflow-visible overflow-y-scroll px-6 pb-6 pt-2">
                    {transactions.map((transaction: any) => {
                      return (
                        <TransactionComponent
                          key={transaction.txid}
                          type={transaction.type}
                          amount={transaction.amount}
                          timestamp={new Date(transaction.timestamp)}
                        />
                      );
                    })}
                  </div>
                </>
              ) : state === 1 ? (
                <>
                  <IoClose
                    className="ml-6 h-8 w-8 cursor-pointer text-ct_brown-500 hover:text-ct_brown-600 active:scale-90"
                    onClick={topupDone}
                  />
                  {qr ? (
                    <div className="flex h-full w-full flex-col items-center justify-between gap-y-4 px-10 pb-12">
                      <p className="text-2xl font-bold text-ct_brown-500">
                        แสกน QR Code เพื่อเติมเงิน
                      </p>
                      <Image src={qr} width={250} height={250} alt="" />
                      <div
                        className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-xl ${!disableConfirm() ? 'cursor-pointer bg-ct_brown-500 hover:bg-ct_brown-600 active:scale-95' : 'bg-ct_gray-400'} text-lg font-bold text-white transition-all`}
                        onClick={topupDone}>
                        เสร็จสิ้น
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex h-full flex-col px-10 pb-12">
                        <p className="text-2xl font-bold text-ct_brown-500">เติมเงิน</p>
                        <label className="form-control mb-4 w-full">
                          <div className="label">
                            <span className="label-text text-ct_brown-500">
                              กรอกจำนวนเงินที่ต้องการเติม
                            </span>
                          </div>
                          <div
                            className={`hover: hover:bg-ss_gray-100 flex items-center rounded-xl border-2 border-solid border-ct_brown-500 bg-white transition-colors hover:border-ct_brown-500`}
                            id="box">
                            <input
                              id="text-field"
                              type="tel"
                              className="input flex flex-grow border-none bg-transparent outline-none focus:outline-none active:outline-none"
                              onChange={(e) => topupInputHandler(e.target.value)}
                              value={topupAmountDisplay}
                            />
                          </div>
                        </label>
                        <div className="flex flex-row items-center justify-between">
                          <div
                            className="flex h-12 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-ct_brown-500 bg-white px-4 text-lg font-bold text-ct_brown-500 transition-all hover:bg-ct_gray-100 active:scale-90"
                            onClick={() => {
                              setTopupAmount(topupAmount + 100);
                              setTopupAmountDisplay((topupAmount + 100).toString());
                            }}>
                            <p>+100</p>
                          </div>
                          <div
                            className="flex h-12 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-ct_brown-500 bg-white px-4 text-lg font-bold text-ct_brown-500 transition-all hover:bg-ct_gray-100 active:scale-90"
                            onClick={() => {
                              setTopupAmount(topupAmount + 300);
                              setTopupAmountDisplay((topupAmount + 300).toString());
                            }}>
                            <p>+300</p>
                          </div>
                          <div
                            className="flex h-12 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-ct_brown-500 bg-white px-4 text-lg font-bold text-ct_brown-500 transition-all hover:bg-ct_gray-100 active:scale-90"
                            onClick={() => {
                              setTopupAmount(topupAmount + 500);
                              setTopupAmountDisplay((topupAmount + 500).toString());
                            }}>
                            <p>+500</p>
                          </div>
                          <div
                            className="flex h-12 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-ct_brown-500 bg-white px-4 text-lg font-bold text-ct_brown-500 transition-all hover:bg-ct_gray-100 active:scale-90"
                            onClick={() => {
                              setTopupAmount(topupAmount + 1000);
                              setTopupAmountDisplay((topupAmount + 1000).toString());
                            }}>
                            <p>+1000</p>
                          </div>
                        </div>
                        <div
                          className={`mt-auto flex h-12 w-full cursor-pointer items-center justify-center rounded-xl ${!disableConfirm() ? 'cursor-pointer bg-ct_brown-500 hover:bg-ct_brown-600 active:scale-95' : 'bg-ct_gray-400'} text-lg font-bold text-white transition-all`}
                          onClick={topupSubmit}>
                          ยืนยัน
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* topup */}
                  <IoClose
                    className="ml-6 h-8 w-8 cursor-pointer text-ct_brown-500 hover:text-ct_brown-600 active:scale-90"
                    onClick={() => {
                      setState(0);
                    }}
                  />
                  <div className="flex h-full flex-col px-10 pb-12">
                    <p className="text-2xl font-bold text-ct_brown-500">ถอนเงิน</p>
                    <label className="form-control mb-4 w-full">
                      <div className="label">
                        <span className="label-text text-ct_brown-500">กรอกจำนวนเงินที่ถอน</span>
                      </div>
                      <div
                        className={`hover: hover:bg-ss_gray-100 flex items-center rounded-xl border-2 border-solid border-ct_brown-500 bg-white transition-colors hover:border-ct_brown-500`}
                        id="box">
                        <input
                          id="text-field"
                          type="tel"
                          className="input flex flex-grow border-none bg-transparent outline-none focus:outline-none active:outline-none"
                          onChange={(e) => withdrawInputHandler(e.target.value)}
                          value={withdrawAmountDisplay}
                        />
                      </div>
                      {amount < withdrawAmount && (
                        <div className="label">
                          <span className="label-text text-ct_neg">
                            ไม่สามารถถอนเงินมากกว่าเงินที่มีได้
                          </span>
                        </div>
                      )}
                    </label>
                    <div
                      className={`mt-auto flex h-12 w-full items-center justify-center rounded-xl ${!disableConfirm() ? 'cursor-pointer bg-ct_brown-500 hover:bg-ct_brown-600 active:scale-95' : 'bg-ct_gray-400'} text-lg font-bold text-white transition-all`}>
                      ยืนยัน
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
