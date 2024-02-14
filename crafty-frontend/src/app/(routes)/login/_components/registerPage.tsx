'use client';

import React, { FC, useState } from 'react';
import { FaFacebook } from 'react-icons/fa6';
import GmailIcon from '@assets/svgs/gmail_icon.svg';
import Link from 'next/link';
import { BsFillTelephoneFill } from 'react-icons/bs';

interface Props {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  onSubmitPhoneNumber: () => void;
  handleSignInWithGoogle: () => void;
  handleSignInWithFacebook: () => void;
}

const RegisterPage: FC<Props> = ({
  setPhoneNumber,
  onSubmitPhoneNumber,
  phoneNumber,
  handleSignInWithGoogle,
  handleSignInWithFacebook,
}) => {
  const validPhoneNumber = (): boolean => {
    if (phoneNumber.length === 10 && phoneNumber[0] === '0') {
      return true;
    }
    return false;
  };
  const [isFocusTextfield, setIsFocusTextfield] = useState(false);

  const [isPhoneNumberValid, setPhoneNumberValid] = useState(true);

  return (
    <div className="flex w-[400px] flex-col items-center justify-center gap-y-6">
      <p className="text-center text-4xl font-bold text-ct_brown-500">เข้าใช้งาน</p>
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        {/* <input
            type="email"
            placeholder="กรอกเบอร์โทรศัพท์"
            className={`input h-10 w-full rounded-lg border-2 ${isPhoneNumberValid ? 'border-ct_brown-500' : 'border-red-600'} py-4 focus:outline-none active:outline-none`}
            onChange={(e) => {
              const num = e.target.value.replace(/\D/g, '');
              console.log(num);
              setPhoneNumber(num);
            }}
            value={phoneNumber}
          /> */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-ct_brown-500">กรอกหมายเลขโทรศัพท์ของคุณ</span>
          </div>
          <div
            onFocus={() => setIsFocusTextfield(true)}
            onBlur={() => {
              setIsFocusTextfield(false);
              if (phoneNumber.length === 10) {
                setPhoneNumberValid(true);
              } else {
                setPhoneNumberValid(false);
              }
            }}
            className={`hover: hover:bg-ss_gray-100 flex items-center rounded-xl border-2 border-solid bg-white pl-4 transition-colors ${
              !isFocusTextfield
                ? isPhoneNumberValid
                  ? 'border-ct_gray-400'
                  : 'border-red-600'
                : 'border-ct_brown-500 hover:border-ct_brown-500'
            }`}
            id="box">
            <BsFillTelephoneFill className="flex h-8 w-8 text-ct_brown-600" />
            <input
              id="text-field"
              type="tel"
              placeholder="0XX-XXX-XXXX"
              className="input flex flex-grow border-none bg-transparent outline-none focus:outline-none active:outline-none"
              onChange={(e) => {
                const ip = e.target.value.replace(/\D/g, '');
                if (ip.length <= 10) {
                  setPhoneNumber(ip);
                }
                if (ip.length === 10) {
                  setPhoneNumberValid(true);
                }
              }}
              value={phoneNumber}
            />
          </div>
          {!isPhoneNumberValid && (
            <div className="label">
              <span className="label-text text-red-600">*กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง</span>
            </div>
          )}
        </label>
        <button
          id="sign-in-button"
          className="btn h-10 min-h-0 w-full rounded-lg bg-ct_brown-500 text-base text-white"
          onClick={() => {
            if (validPhoneNumber()) onSubmitPhoneNumber();
          }}>
          ต่อไป
        </button>
        <p className="w-full text-sm text-ct_brown-300">
          หากไม่เคยมีบัญชีผู้ใช้ สามารถกรอกเบอร์เพื่อสมัครได้เลย
        </p>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-x-2">
        <div className="flex h-0.5 flex-grow items-center rounded-full bg-ct_brown-500"></div>
        <p className="text-ct_brown-500">หรือ</p>
        <div className="flex h-0.5 flex-grow items-center rounded-full bg-ct_brown-500"></div>
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <button
          className="btn w-48 flex-row items-center rounded-xl bg-white"
          onClick={handleSignInWithFacebook}>
          <FaFacebook className="h-8 w-auto text-[#1877f2]" />
          <p className="text-ct_brown-500">Facebook</p>
        </button>
        <button
          className="btn w-48 flex-row items-center rounded-xl bg-white"
          onClick={handleSignInWithGoogle}>
          <GmailIcon className="h-6 w-auto" />
          <p className="text-ct_brown-500">Gmail</p>
        </button>
      </div>
      <p className="w-full text-sm text-ct_brown-300">
        การลงทะเบียน เป็นไปตามข้อกำหนดของ{' '}
        <span className="cursor-pointer font-bold text-ct_brown-500 underline">
          นโยบายความเป็นส่วนตัว
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
