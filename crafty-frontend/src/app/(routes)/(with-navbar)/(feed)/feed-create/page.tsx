'use client';

import LoadingPage from '@/app/_components/common-component/loading';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import useFeedDetail from '../../_hooks/feedDetail';

import { useForm, SubmitHandler } from 'react-hook-form';
import { PostForm } from './types';
import createFeedHook from './_hooks';

const FeedEditPage: FC = () => {
  const { register, handleSubmit, watch, setValue } = useForm<PostForm>();

  const { createFeedByForm } = createFeedHook();

  const [creating, setCreating] = useState(false);

  const onSubmit: SubmitHandler<PostForm> = async (data) => {
    setCreating(true);
    await createFeedByForm(data);
    setCreating(false);
    window.location.href = '/feed-list';
  };

  const [currentPhoto, setCurrentPhoto] = useState(
    `https://picsum.photos/seed/${Math.random() * 1000}/1000/1000`
  );

  useEffect(() => {
    setValue('photoUrl', currentPhoto);
  }, [currentPhoto]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-2 p-8">
      <div className="mx-auto grid h-fit w-full max-w-[1300px] grid-cols-2 rounded-xl bg-white max-md:grid-cols-1">
        {/* image */}
        <div className="flex h-full w-full flex-col gap-8 p-10 pr-10 max-md:mx-auto max-md:max-w-[400px] md:pr-5">
          {currentPhoto && (
            <div className="carousel w-full overflow-hidden rounded-xl">
              <div className="carousel-item relative w-full">
                <Image
                  src={currentPhoto}
                  className="h-fit w-full object-contain"
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                  width={50000}
                  height={50000}
                  alt={`Image`}
                  loading="lazy"
                />
                {/* <button className="btn btn-circle absolute right-5 top-5 border-none bg-red-500 text-sm text-white hover:bg-red-300">
                X
              </button> */}
                {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${i - 1}`} className="btn btn-circle opacity-60">
                  ❮
                </a>
                <a href={`#slide${i + 1}`} className="btn btn-circle opacity-60">
                  ❯
                </a>
              </div> */}
              </div>
            </div>
          )}
          <div className="flex max-w-full flex-row gap-2">
            <input
              className="input text-xl"
              placeholder="ชื่อสินค้า"
              {...register('photoUrl', { required: true })}
            />
            <button
              className="btn btn-circle flex flex-1 border-[3px] border-ct_brown-500 !bg-white text-xl font-bold"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentPhoto(watch('photoUrl'));
              }}>
              + เปลี่ยนรูปภาพ
            </button>
          </div>
        </div>

        {/* detail */}
        <div className="flex h-full w-full flex-col gap-8 p-10 pl-10 md:pl-5">
          <div className="flex flex-row items-center gap-4">
            <input
              className="input w-full text-xl"
              placeholder="ชื่อสินค้า"
              {...register('title', { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xl">เริ่มต้นที่</span>
            <input
              className="input w-full text-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              placeholder="ราคาสินค้า"
              min={0}
              {...register('price', { required: true })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-lg">รายละเอียดสินค้า</span>
              <textarea
                className="textarea textarea-bordered rounded-md"
                placeholder="รายละเอียดสินค้า"
                {...register('detail', { required: true })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg">สิ่งที่ Custom ได้</span>
              <textarea
                className="textarea textarea-bordered rounded-md"
                placeholder="สิ่งที่ Custom ได้"
                {...register('content', { required: true })}
              />
            </div>
          </div>

          <button
            className="btn ml-auto w-fit bg-ct_brown-500 text-lg text-white hover:bg-ct_brown-300"
            type="submit"
            disabled={creating}>
            บันทึก
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedEditPage;
