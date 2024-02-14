import React, { FC, use, useEffect, useState } from 'react';
import { Button, TextInput } from '@/app/_components/ui/input';
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext';

interface PersonalInfomationProps {
  name: string;
  nameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phone: string;
  phoneHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  address: string;
  addressHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  road: string;
  roadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  subDistrict: string;
  subDistrictHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  district: string;
  districtHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  province: string;
  provinceHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postalCode: string;
  postalCodeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canEditPhone: boolean;
  registerUser: () => void;
}

const PersonalInfomationPage: FC<PersonalInfomationProps> = ({
  name,
  nameHandler,
  phone,
  phoneHandler,
  address,
  addressHandler,
  road,
  roadHandler,
  subDistrict,
  subDistrictHandler,
  district,
  districtHandler,
  province,
  provinceHandler,
  postalCode,
  postalCodeHandler,
  canEditPhone,
  registerUser,
}) => {
  const isDisabled = () => {
    return (
      name === '' ||
      phone === '' ||
      address === '' ||
      road === '' ||
      subDistrict === '' ||
      district === '' ||
      province === '' ||
      postalCode === ''
    );
  };

  return (
    <div className="flex w-[400px] flex-col items-center justify-center gap-y-6">
      <p className="text-center text-4xl font-bold text-ct_brown-500">กรอกข้อมูลส่วนตัว</p>

      <div className="grid w-full grid-cols-12 gap-2">
        <div className="col-span-12">
          <TextInput value={name} name={'name'} onChange={nameHandler} placeholder={'ชื่อผู้ใช้'} />
        </div>

        <div className="col-span-12">
          <TextInput
            type="tel"
            name={'tel'}
            value={phone}
            onChange={phoneHandler}
            placeholder={'เบอร์โทรศัพท์'}
            disabled={!canEditPhone}
          />
        </div>

        <div className="col-span-12">
          <TextInput
            value={address}
            name={'address'}
            onChange={addressHandler}
            placeholder={'ที่อยู่'}
            autoComplete={'address-line1'}
          />
        </div>

        <div className="col-span-12">
          <TextInput value={road} name={'road'} onChange={roadHandler} placeholder={'ถนน'} />
        </div>

        <div className="col-span-6">
          <TextInput
            value={subDistrict}
            name={'suburb'}
            onChange={subDistrictHandler}
            placeholder={'ตำบล'}
            autoComplete={'address-line2'}
          />
        </div>

        <div className="col-span-6">
          <TextInput
            value={district}
            name={'city'}
            onChange={districtHandler}
            placeholder={'อำเภอ'}
            // autoComplete={'address-line3'}
          />
        </div>

        <div className="col-span-6">
          <TextInput
            value={province}
            name={'province'}
            onChange={provinceHandler}
            placeholder={'จังหวัด'}
          />
        </div>

        <div className="col-span-6">
          <TextInput
            value={postalCode}
            name={'postalCode'}
            onChange={postalCodeHandler}
            placeholder={'รหัสไปรษณีย์'}
          />
        </div>
      </div>

      <Button disabled={isDisabled()} onClick={registerUser}>
        ต่อไป
      </Button>
    </div>
  );
};

export default PersonalInfomationPage;
