'use client';

import React, { useEffect, useState } from 'react';
import { OtpPage, PersonalInfomationPage, RegisterPage } from './_components';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from '@/configs/firebaseConfig';

import LogoLeftSide from '@/app/_components/ui/logoLeftSide';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/configs/axiosConfig';
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext';

const Page = () => {
  const router = useRouter();
  const { user } = useFirebaseAuthContext();

  const [state, setState] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [road, setRoad] = useState<string>('');
  const [subDistrict, setSubDistrict] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [canEditPhone, setCanEditPhone] = useState<boolean>(true);

  useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
    });
  }, []);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(result.user.email);

      const isValid = await checkUserValid();
      if (isValid.error) return;
      if (isValid.valid) {
        router.push('/');
      } else {
        setState(2);
      }

      // if (credential === null) return;
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // ...
    } catch (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
      // ...
    }
  };

  const handleSignInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      console.log(result.user.email);

      const isValid = await checkUserValid();
      if (isValid.error) return;
      if (isValid.valid) {
        router.push('/');
      } else {
        setState(2);
      }
      // ...
    } catch (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
      // ...
      console.log(error);
    }
  };

  const onSubmitPhoneNumber = async () => {
    const appVerifier = (window as any).recaptchaVerifier;

    const formattedPhoneNumber = '+66' + phoneNumber.slice(1);

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        setState(1);
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error, {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'colored',
        // });
      });
  };

  const onSubmitOtp = async () => {
    if (confirmationResult && otp.length === 6) {
      try {
        await confirmationResult.confirm(otp);
        const isValid = await checkUserValid();
        if (isValid.error) return;
        if (isValid.valid) {
          router.push('/');
        } else {
          setState(2);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkUserValid = async () => {
    if (auth) {
      const isValid = apiClient
        .get('/user')
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
          const data = response.data;
          if (data.message === 'Registered') return { error: false, valid: true };
          return { error: true, valid: false };
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.message === 'Not registered')
              return { error: false, valid: false };
            console.log(error.response);
          }
          console.log("GET request didn't work:", error);
          return { error: true, valid: false };
        });
      return isValid;
    } else return { error: true, valid: false };
  };

  useEffect(() => {
    if (!user) return;

    if (user.phoneNumber) {
      setPhone('0' + user.phoneNumber.slice(3));
      setCanEditPhone(false);
    }
  }, [user]);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (canEditPhone) {
      setPhone(e.target.value);
    }
  };

  const addressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const roadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoad(e.target.value);
  };

  const subDistrictHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubDistrict(e.target.value);
  };

  const districtHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistrict(e.target.value);
  };

  const provinceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvince(e.target.value);
  };

  const postalCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };

  const registerUser = async (): Promise<void> => {
    if (!user) return;

    apiClient
      .put('/user', {
        user: {
          address: {
            address_1: address,
            street: road,
            tambon: subDistrict,
            amphoe: district,
            province: province,
            postal_code: postalCode,
          },
          phone: phone,
          picture_url: `https://picsum.photos/seed/${await user.uid}/400/400`,
          username: name,
        },
      })
      .then(() => {
        // Update successful
        console.log("Created user's data successfully");
        router.push('/');
      })
      .catch((error) => {
        // An error occurred
        console.log('An error occurred', error);
      });
  };

  return (
    <LogoLeftSide>
      {/* <button
        className="h-12 w-12 bg-black"
        onClick={() => {
          setState((state + 1) % 3);
        }}></button> */}
      {state === 0 && (
        <RegisterPage
          phoneNumber={phoneNumber}
          onSubmitPhoneNumber={onSubmitPhoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleSignInWithGoogle={handleSignInWithGoogle}
          handleSignInWithFacebook={handleSignInWithFacebook}
        />
      )}
      {state === 1 && (
        <OtpPage otp={otp} setOtp={setOtp} otpSubmit={onSubmitOtp} reSendOtp={onSubmitOtp} />
      )}
      {state === 2 && (
        <PersonalInfomationPage
          name={name}
          nameHandler={nameHandler}
          phone={phone}
          phoneHandler={phoneHandler}
          address={address}
          addressHandler={addressHandler}
          road={road}
          roadHandler={roadHandler}
          subDistrict={subDistrict}
          subDistrictHandler={subDistrictHandler}
          district={district}
          districtHandler={districtHandler}
          province={province}
          provinceHandler={provinceHandler}
          postalCode={postalCode}
          postalCodeHandler={postalCodeHandler}
          registerUser={registerUser}
          canEditPhone={canEditPhone}
        />
      )}
    </LogoLeftSide>
  );
};

export default Page;
