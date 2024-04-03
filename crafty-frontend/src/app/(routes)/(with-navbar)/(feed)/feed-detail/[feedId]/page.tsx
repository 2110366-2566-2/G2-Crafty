'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import useFeedDetail from '../../../_hooks/feedDetail';
import LoadingPage from '@/app/_components/common-component/loading';
import { getAvgRatingFromReviewList } from '@/app/_common/utils/rating';
import userStore from '@/app/_common/store/user/user-store';
import { getIsFavorite } from '@/app/_common/utils/favorite';
import { apiService } from '@/configs/apiService/apiService';
import ReviewContainer from './_components/ReviewContainer';

const FeedDetailPage: FC = () => {
  const user = userStore((state) => state.user);

  const param = useParams();
  const feedId = String(param.feedId);

  const { init, post } = useFeedDetail(feedId);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(getIsFavorite(post?.userFavorite ?? [], user?.id || ''));
  }, [post?.userFavorite, user?.id]);

  const avgRating = getAvgRatingFromReviewList(post?.reviews || []);

  const favorite = () => {
    if (!user) return;
    apiService.favoritePost(feedId, user.id);
    setIsFavorite(true);
  };

  const unfavorite = () => {
    if (!user) return;
    apiService.unfavoritePost(feedId, user.id);
    setIsFavorite(false);
  };

  const createNewChatroom = async () => {
    const crafterId = String(post?.ownerId) || '';
    const crafteeId = String(user.id);
    const postId = String(feedId);
    // console.log(user.username);
    // console.log(crafteeId, crafterId, postId);
    const response = await apiService.createNewChatroom({ crafterId, crafteeId, postId });
    if (response.status === 'ERROR') return alert('Failed to create chatroom');
    const newChatroom = response.data;
    window.location.href = `/chats/${newChatroom.id}`;
  };

  if (!init) return <LoadingPage />;

  return (
    <div className="flex w-full flex-col gap-2 p-8">
      <div className="mx-auto grid h-fit w-full max-w-[1300px] grid-cols-2 rounded-xl bg-white max-md:grid-cols-1">
        {/* image */}
        {post?.photoUrl && (
          <div className="flex h-full w-full p-10 pr-10 max-md:mx-auto max-md:max-w-[400px] md:pr-5">
            <div className="carousel w-full overflow-hidden rounded-xl">
              <div
                // key={`slide ${i}`} id={`slide${i}`}
                className="carousel-item relative w-full">
                <Image
                  src={post?.photoUrl}
                  className="h-fit w-full object-contain"
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                  width={50000}
                  height={50000}
                  alt={`Image`}
                  loading="lazy"
                />
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
          </div>
        )}

        {/* detail */}
        <div className="flex h-full w-full flex-col gap-8 p-10 pl-10 md:pl-5">
          <div className="flex flex-row gap-4">
            {/* user avatar */}
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width="56" height="56" fill="url(#pattern0)" />
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_318_99" transform="scale(0.00735294)" />
                </pattern>
                <image
                  id="image0_318_99"
                  width="136"
                  height="136"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <span className="text-xl">{post?.title}</span>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-2">
                <span className="font-semibol mr-2 mt-1 text-3xl">
                  {post
                    ? (
                        post?.reviews.reduce((acc, review) => acc + review.rate, 0) /
                        post?.reviews.length
                      ).toFixed(1)
                    : ''}
                </span>
                {
                  // create rating star
                  Array.from({ length: avgRating }).map((_, i) => (
                    /* star */
                    <svg
                      key={`start ${i}`}
                      width="27"
                      height="26"
                      viewBox="0 0 27 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M26.3254 11.8432L20.8929 16.5816L22.5203 23.6361C22.6064 24.0049 22.5818 24.3909 22.4496 24.7458C22.3174 25.1007 22.0835 25.4088 21.7771 25.6315C21.4706 25.8543 21.1053 25.9818 20.7267 25.9982C20.3482 26.0146 19.9732 25.919 19.6486 25.7236L13.4922 21.9916L7.34897 25.7236C7.02443 25.919 6.64944 26.0146 6.27087 25.9982C5.89231 25.9818 5.52697 25.8543 5.22053 25.6315C4.9141 25.4088 4.68016 25.1007 4.54798 24.7458C4.41579 24.3909 4.39122 24.0049 4.47733 23.6361L6.10227 16.5888L0.668551 11.8432C0.381156 11.5955 0.17334 11.2685 0.0711625 10.9032C-0.0310148 10.5379 -0.0230046 10.1506 0.0941887 9.78982C0.211382 9.42906 0.432541 9.11091 0.729933 8.87527C1.02732 8.63962 1.38771 8.49698 1.76589 8.46522L8.92814 7.84523L11.7239 1.18073C11.8699 0.831036 12.1162 0.532327 12.4317 0.322219C12.7472 0.112112 13.1178 0 13.497 0C13.8761 0 14.2468 0.112112 14.5623 0.322219C14.8778 0.532327 15.1241 0.831036 15.2701 1.18073L18.0743 7.84523L25.2341 8.46522C25.6123 8.49698 25.9727 8.63962 26.2701 8.87527C26.5675 9.11091 26.7886 9.42906 26.9058 9.78982C27.023 10.1506 27.031 10.5379 26.9288 10.9032C26.8267 11.2685 26.6188 11.5955 26.3314 11.8432H26.3254Z"
                        fill="#EFE711"
                      />
                    </svg>
                  ))
                }
                {Array.from({ length: 5 - avgRating }).map((_, i) => (
                  /* star */
                  <svg
                    key={`start ${i}`}
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M26.3254 11.8432L20.8929 16.5816L22.5203 23.6361C22.6064 24.0049 22.5818 24.3909 22.4496 24.7458C22.3174 25.1007 22.0835 25.4088 21.7771 25.6315C21.4706 25.8543 21.1053 25.9818 20.7267 25.9982C20.3482 26.0146 19.9732 25.919 19.6486 25.7236L13.4922 21.9916L7.34897 25.7236C7.02443 25.919 6.64944 26.0146 6.27087 25.9982C5.89231 25.9818 5.52697 25.8543 5.22053 25.6315C4.9141 25.4088 4.68016 25.1007 4.54798 24.7458C4.41579 24.3909 4.39122 24.0049 4.47733 23.6361L6.10227 16.5888L0.668551 11.8432C0.381156 11.5955 0.17334 11.2685 0.0711625 10.9032C-0.0310148 10.5379 -0.0230046 10.1506 0.0941887 9.78982C0.211382 9.42906 0.432541 9.11091 0.729933 8.87527C1.02732 8.63962 1.38771 8.49698 1.76589 8.46522L8.92814 7.84523L11.7239 1.18073C11.8699 0.831036 12.1162 0.532327 12.4317 0.322219C12.7472 0.112112 13.1178 0 13.497 0C13.8761 0 14.2468 0.112112 14.5623 0.322219C14.8778 0.532327 15.1241 0.831036 15.2701 1.18073L18.0743 7.84523L25.2341 8.46522C25.6123 8.49698 25.9727 8.63962 26.2701 8.87527C26.5675 9.11091 26.7886 9.42906 26.9058 9.78982C27.023 10.1506 27.031 10.5379 26.9288 10.9032C26.8267 11.2685 26.6188 11.5955 26.3314 11.8432H26.3254Z"
                      fill="#767676"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-base">{post?.reviews?.length ?? 0} รีวิว</span>
            </div>

            {/* heart */}
            <div className="btn border-white bg-white" onClick={isFavorite ? unfavorite : favorite}>
              {!isFavorite && (
                <svg
                  width="27"
                  height="25"
                  viewBox="0 0 27 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_735_3989)">
                    <path
                      d="M25.2143 6.95228C25.6519 8.25818 25.7293 9.65839 25.4383 11.0048C25.1473 12.3512 24.4987 13.5935 23.5612 14.6003L23.5516 14.6107L23.5417 14.6208L23.3548 14.8135L23.3103 14.8595L23.2617 14.9011L23.2507 14.9105L15.5501 22.5613C15.1335 22.9749 14.5816 23.223 13.9966 23.2596C13.4116 23.2963 12.8332 23.119 12.3686 22.7606L12.3347 22.7344L12.3024 22.7062L12.2048 22.6208L12.1717 22.5919L12.1405 22.5609L4.3635 14.8338C3.35847 13.8512 2.64364 12.6091 2.298 11.2446C1.95184 9.87798 1.98951 8.44193 2.40685 7.09548C2.8242 5.74902 3.60493 4.5447 4.66259 3.61591C5.72024 2.68711 7.01364 2.07007 8.39937 1.83314C9.5227 1.64114 10.6746 1.70448 11.7704 2.01847C12.5115 2.23086 13.2142 2.55427 13.8552 2.97601C14.45 2.58953 15.0972 2.28723 15.7787 2.07925M25.2143 6.95228L23.9019 7.39485M25.2143 6.95228C24.7767 5.64645 23.9953 4.48361 22.9526 3.58691C21.91 2.69022 20.645 2.09305 19.2916 1.85866L19.2741 1.85562L19.2565 1.85305L19.001 1.81555L18.9902 1.81396L18.9794 1.81255C17.9058 1.67219 16.8146 1.76311 15.7787 2.07925M15.7787 2.07925L16.1817 3.408"
                      stroke="#DE1135"
                      stroke-width="2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_735_3989">
                      <rect width="27" height="25" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}

              {/* fill heart */}
              {isFavorite && (
                <svg
                  width="27"
                  height="25"
                  viewBox="0 0 39 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.1518 2.15628L11.1517 2.1563C9.15009 2.49748 7.28199 3.386 5.75427 4.72346C4.22655 6.06093 3.09883 7.79514 2.49599 9.73404C1.89316 11.6729 1.83874 13.7409 2.33877 15.7088C2.83802 17.6737 3.87056 19.4623 5.32229 20.8773L16.5558 32.0043L16.6008 32.0489L16.6485 32.0905L16.7895 32.2135L16.8361 32.2542L16.8851 32.2919C17.5563 32.8079 18.3917 33.0632 19.2367 33.0104C20.0817 32.9577 20.8789 32.6004 21.4806 32.0049L21.4812 32.0043L32.6038 20.9877L32.6197 20.9741L32.6898 20.9142L32.7542 20.8481L33.0242 20.5706L33.0384 20.5559L33.0523 20.541C34.4065 19.0912 35.3433 17.3022 35.7637 15.3635C36.184 13.4247 36.0722 11.4083 35.4402 9.52789C34.8081 7.64746 33.6793 5.97296 32.1732 4.68172C30.6671 3.39048 28.8399 2.53056 26.885 2.19303L26.8597 2.18866L26.8343 2.18494L26.4653 2.13094L26.4498 2.12867L26.4342 2.12663C24.8833 1.92452 23.3071 2.05545 21.8108 2.51069C20.8265 2.81017 19.8916 3.24549 19.0324 3.80202C18.1065 3.19472 17.0916 2.729 16.0211 2.42316C14.4384 1.97101 12.7744 1.87981 11.1518 2.15628Z"
                    fill="#DE1135"
                    stroke="#DE1135"
                    stroke-width="4"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl">เริ่มต้นที่</span>
            <span className="text-5xl font-bold">
              ฿{post?.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? 0}
            </span>
          </div>

          <button
            className="btn w-full rounded-lg bg-ct_brown-500 text-base text-white hover:bg-ct_brown-300"
            onClick={createNewChatroom}>
            ติดต่อ Crafter
          </button>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              {' '}
              <span className="text-lg">รายละเอียดสินค้า</span>
              {post?.detail.split('\n').map((text, i) => (
                <span key={`detail ${i}`} className="text-lg">
                  · {text}
                </span>
              ))}
              {/* <span className="text-lg">รายละเอียดสินค้า</span>
              <span className="text-base">
                วัสดุ: ใช้ผ้าหลายชนิดที่มีคุณภาพสูง
                <br />
                การทำ: การทำด้วยมืออย่างประณีตและมีความพิถีพิถัน
                <br />
                ออกแบบ: ลายที่สวยงามและสไตล์ที่ทันสมัย <br />
                ความทนทาน: สามารถใช้งานได้นานช่องใส่บัตร 6 ช่อง
              </span> */}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg">สิ่งที่ Custom ได้</span>
              {post?.content.split('\n').map((text, i) => (
                <span key={`custom ${i}`} className="text-lg">
                  · {text}
                </span>
              ))}
              {/* <span className="text-base">
                ลายกระเป๋า: สามารถออกแบบเอง หรือให้ฉันสุ่มให้ได้ <br />
                สี: สามารถเลือกเฉดสี/โทนสี/palette เองได้ <br />
                ขนาด: สามารถเลือกขนาด รวมถึงจำนวนช่องของกระเป๋าได้
              </span> */}
            </div>
          </div>
        </div>
      </div>

      <ReviewContainer reviews={post?.reviews ?? []} />
    </div>
  );
};

export default FeedDetailPage;
