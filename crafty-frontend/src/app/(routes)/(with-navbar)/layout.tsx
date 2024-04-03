'use client';

import { apiService } from '@/configs/apiService/apiService';
import Logo from '@assets/svgs/logo.svg';
import { useEffect, useState } from 'react';
import { IoMdPerson } from 'react-icons/io';
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/firebaseConfig';
import useUserStore from '@/app/_common/store/user/hooks/useUserStore';
import { apiClient } from '@/configs/axiosConfig';
import { ApiStatus } from '@/configs/apiService/types';
import { useRouter } from 'next/navigation';
import useUnreadCount from './_hooks/useUnreadCount';
import searchStore from './_hooks/searchOnNavbar/stores/search';
import useDebounce from '@/app/_common/hooks/debounce';

export default function NavbarLayout({ children }: { children: React.ReactNode }) {
  useUserStore();
  const [localSearch, setLocalSearch] = useState('');
  const setSearch = searchStore((state) => state.setSearch);
  const enableSearch = searchStore((state) => state.enableSearch);

  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const router = useRouter();
  const [openUserModal, setOpenUserModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const deleteUserHandler = async () => {
    // const responseUser = await apiService.getMe();
    if (confirmPrompt !== 'ลบบัญชี') return;
    const responseUser = await apiClient.get('/auth/me');
    console.log(responseUser);
    const responseDelete = await apiService.deleteUser(responseUser.data.id);
    if (responseDelete.status === ApiStatus.SUCCESS) {
      signOut(auth);
      console.log('delete', responseDelete.data);
      localStorage.removeItem('token');
      router.push('/login');
    } else {
      console.log('delete user failed');
      console.log(responseDelete);
    }
  };
  const [confirmPrompt, setConfirmPrompt] = useState('');

  const logoutHandler = async () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unReadCount = useUnreadCount();

  const [muteNoti, setMuteNoti] = useState(false);

  const [initMuteNoti, setInitMuteNoti] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('muteNoti')) {
      setMuteNoti(true);
    }
    setInitMuteNoti(true);
  }, []);

  useEffect(() => {
    if (!initMuteNoti) return;
    if (muteNoti) {
      localStorage.setItem('muteNoti', 'true');
    } else {
      localStorage.removeItem('muteNoti');
    }
  }, [muteNoti, initMuteNoti]);

  return (
    <div
      className={`flex min-h-screen ${confirmModal && 'h-screen overflow-hidden'} w-full flex-col`}>
      {confirmModal && (
        <div className="absolute z-[100] flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center gap-y-4 rounded-xl bg-white px-16 py-8">
            <p className="select-none text-2xl font-bold text-red-600">ลบบัญชี</p>
            <div className="select-none">
              กรอก <span className="font-bold">{"'ลบบัญชี'"}</span> เพื่อยืนยัน
            </div>
            <input
              id="text-field"
              type="tel"
              placeholder="ลบบัญชี"
              className="input flex w-[240px] border-2 border-solid border-ct_gray-300 bg-transparent outline-none focus:border-ct_brown-500 focus:outline-none active:outline-none"
              onChange={(e) => {
                setConfirmPrompt(e.target.value);
              }}
              value={confirmPrompt}
            />
            <div className="flex w-[240px] items-center justify-between">
              <button
                className="right-0 m-0 inline-flex min-h-[3rem] w-full min-w-[80px] cursor-pointer appearance-none items-center justify-center rounded-xl border-0 bg-ct_gray-400 px-6 py-2 text-center text-base font-medium leading-normal tracking-wide text-white no-underline hover:bg-ct_gray-500 md:h-14 md:w-auto"
                type="submit"
                onClick={() => {
                  setConfirmModal(false);
                }}>
                ยกเลิก
              </button>
              <button
                className="right-0 m-0 inline-flex min-h-[3rem] w-full min-w-[80px] cursor-pointer appearance-none items-center justify-center rounded-xl border-0 bg-red-600 px-6 py-2 text-center text-base font-medium leading-normal tracking-wide text-white no-underline hover:bg-red-800 md:h-14 md:w-auto"
                type="submit"
                onClick={() => {
                  deleteUserHandler();
                }}>
                ลบบัญชี
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="sticky top-0 z-50 flex h-16 w-full flex-row items-center gap-6 bg-ct_brown-200 px-10 max-md:justify-center">
        <div
          className="flex flex-row items-center gap-4 duration-100 hover:cursor-pointer hover:brightness-90"
          onClick={() => {
            window.location.href = '/';
          }}>
          <Logo className="" height={59} />
          <h1 className="text-2xl">Crafty</h1>
        </div>

        <a href="/feed-list" className="flex-nowrap whitespace-nowrap text-nowrap hover:underline">
          My Post
        </a>

        {enableSearch && (
          <input
            type="text"
            className="input h-10 w-full max-w-[1000px]"
            placeholder="Search for a post"
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        )}

        <div className="ml-auto flex flex-row gap-3">
          <span>mute</span>
          <input
            type="checkbox"
            className="toggle"
            checked={muteNoti}
            onChange={() => setMuteNoti(!muteNoti)}
          />
        </div>

        <div
          className="relative duration-75 hover:cursor-pointer hover:brightness-90"
          onClick={() => {
            window.location.href = '/chats';
          }}>
          {unReadCount != 0 && !muteNoti && (
            <span className="absolute right-[-4px] top-[-4px] h-[15px] w-[15px] rounded-full bg-red-500 p-1 text-sm text-white">
              <span className="absolute right-[5px] top-[-2px] text-[10px]">
                {String(unReadCount)}
              </span>
            </span>
          )}
          <svg
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.666525 23.9998C0.666525 11.1128 11.1129 0.666504 23.9999 0.666504C36.8869 0.666504 47.3332 11.1128 47.3332 23.9998C47.3332 36.8868 36.8869 47.3332 23.9999 47.3332C20.5617 47.3378 17.1653 46.58 14.0552 45.1142L3.46886 47.2842C3.09087 47.3614 2.69963 47.3438 2.33015 47.2327C1.96067 47.1217 1.62448 46.9208 1.35168 46.648C1.07888 46.3752 0.877974 46.039 0.766956 45.6695C0.655937 45.3001 0.638266 44.9088 0.715525 44.5308L2.88553 33.9445C1.41971 30.8344 0.661845 27.438 0.666525 23.9998ZM13.4999 20.4998C12.5716 20.4998 11.6814 20.8686 11.025 21.525C10.3686 22.1813 9.99986 23.0716 9.99986 23.9998V24.0232C9.99986 24.9514 10.3686 25.8417 11.025 26.498C11.6814 27.1544 12.5716 27.5232 13.4999 27.5232H13.5232C14.4514 27.5232 15.3417 27.1544 15.9981 26.498C16.6544 25.8417 17.0232 24.9514 17.0232 24.0232V23.9998C17.0232 23.0716 16.6544 22.1813 15.9981 21.525C15.3417 20.8686 14.4514 20.4998 13.5232 20.4998H13.4999ZM23.9999 20.4998C23.0716 20.4998 22.1814 20.8686 21.525 21.525C20.8686 22.1813 20.4999 23.0716 20.4999 23.9998V24.0232C20.4999 24.9514 20.8686 25.8417 21.525 26.498C22.1814 27.1544 23.0716 27.5232 23.9999 27.5232H24.0232C24.9515 27.5232 25.8417 27.1544 26.4981 26.498C27.1544 25.8417 27.5232 24.9514 27.5232 24.0232V23.9998C27.5232 23.0716 27.1544 22.1813 26.4981 21.525C25.8417 20.8686 24.9515 20.4998 24.0232 20.4998H23.9999ZM30.9999 23.9998C30.9999 23.0716 31.3686 22.1813 32.025 21.525C32.6814 20.8686 33.5716 20.4998 34.4999 20.4998H34.5232C35.4515 20.4998 36.3417 20.8686 36.9981 21.525C37.6544 22.1813 38.0232 23.0716 38.0232 23.9998V24.0232C38.0232 24.9514 37.6544 25.8417 36.9981 26.498C36.3417 27.1544 35.4515 27.5232 34.5232 27.5232H34.4999C33.5716 27.5232 32.6814 27.1544 32.025 26.498C31.3686 25.8417 30.9999 24.9514 30.9999 24.0232V23.9998Z"
              fill="#65451F"
            />
          </svg>
        </div>
        <div className="relative">
          <div
            className="cursor-pointer rounded-full bg-ct_brown-100 p-2 hover:bg-ct_gray-200"
            onClick={() => {
              setOpenUserModal(!openUserModal);
            }}>
            <IoMdPerson className="h-6 w-6 text-ct_brown-500" />
          </div>
          {openUserModal && (
            <div className="absolute right-0 flex w-56 flex-col items-start gap-y-4 rounded-xl bg-white p-4 shadow-xl">
              <h1
                className="cursor-pointer text-ct_brown-500 hover:underline"
                onClick={() => {
                  router.push('/wallet');
                }}>
                My wallet
              </h1>
              <h1
                className="cursor-pointer text-ct_brown-500 hover:underline"
                onClick={() => {
                  setConfirmModal(true);
                }}>
                Delete this Account
              </h1>
              <h1 className="cursor-pointer text-red-500 hover:underline" onClick={logoutHandler}>
                Logout
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 bg-ct_brown-100">{children}</div>
    </div>
  );
}
