import useMyFeed from '@/app/(routes)/(with-navbar)/_hooks/myFeed';
import { Post } from '@/app/_common/interface/post';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FeedPreviewCardProps {
  post: Post;
}
const FeedPreviewCard = ({ post }: FeedPreviewCardProps) => {
  const [priority, setPriority] = useState<number>(post.priority);

  useEffect(() => {
    setPriority(post.priority);
  }, [post.priority]);

  const { updateLocalPost } = useMyFeed();
  const boostPost = async () => {
    const response = await apiService.boostPost(post.id);
    if (response.status === ApiStatus.SUCCESS) {
      updateLocalPost(response.data);
      setPriority(response.data.priority);
    }
  };
  return (
    <div className="flex h-fit w-full flex-row items-center gap-4 rounded-lg bg-white p-4 px-6">
      {/* image */}
      {post.photoUrl && (
        <div className="flex h-[90px] w-[90px] min-w-[90px] overflow-hidden rounded-lg">
          <Image
            src={post.photoUrl}
            className="h-fit w-full overflow-hidden rounded-lg object-cover"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
            width={5000}
            height={5000}
            alt={`Image`}
            loading="lazy"
          />
        </div>
      )}

      {/* title and price */}
      <div className="flex flex-col gap-2">
        <span className="text-xl">{post.title}</span>
        <span className="text-xl font-bold">
          ฿{post?.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? 0}
        </span>
      </div>

      {/* detail */}
      <div className="ml-auto flex flex-row items-center gap-3 max-md:flex-col">
        {/* <div className="badge">default</div> */}
        {/* heart */}
        <div className="flex flex-row items-center gap-2">
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
          <span className="text-xl">{post.userFavorite?.length ?? 0}</span>
        </div>

        {/* <span className="text-xl">•</span> */}

        {/* message */}
        {/* <div className="flex flex-row items-center gap-2">
          <svg
            width="27"
            height="27"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.004 38C23.9299 37.9991 27.7478 36.7148 30.876 34.3427C34.0042 31.9706 36.2711 28.6408 37.3313 24.8608C38.3914 21.0808 38.1867 17.0578 36.7483 13.405C35.3099 9.75211 32.7167 6.66967 29.3639 4.62738C26.011 2.58509 22.0824 1.69494 18.1768 2.0926C14.2711 2.49025 10.6025 4.1539 7.7301 6.83001C4.85768 9.50612 2.93892 13.0479 2.26623 16.9157C1.59354 20.7835 2.20381 24.7652 4.00404 28.254L2.00404 38L11.75 36C14.222 37.278 17.03 38 20.004 38Z"
              stroke="#65451F"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="text-xl">7</span>
        </div> */}

        <button className="hover:underline" onClick={boostPost}>
          boost {priority}
        </button>

        {/* view button */}
        <a
          href={`/feed-detail/${post.id}`}
          target="_blank"
          className="rounded-md p-2 duration-75 hover:bg-gray-200 hover:underline">
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.30762 10.3003C2.30762 10.3003 4.8251 5.24316 9.23069 5.24316C13.6363 5.24316 16.1538 10.3003 16.1538 10.3003C16.1538 10.3003 13.6363 15.3575 9.23069 15.3575C4.8251 15.3575 2.30762 10.3003 2.30762 10.3003Z"
              stroke="#98A9BC"
              stroke-width="1.55604"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.23084 12.2455C10.0805 12.2455 10.7693 11.3746 10.7693 10.3004C10.7693 9.22618 10.0805 8.35535 9.23084 8.35535C8.38118 8.35535 7.69238 9.22618 7.69238 10.3004C7.69238 11.3746 8.38118 12.2455 9.23084 12.2455Z"
              stroke="#98A9BC"
              stroke-width="1.55604"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>

        {/* edit button */}
        <a
          href={`/feed-edit/${post.id}`}
          target="_blank"
          className="rounded-md p-2 duration-75 hover:bg-gray-200 hover:underline">
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_199_9245)">
              <path
                d="M14.1418 2.33411C14.359 2.12977 14.6169 1.96767 14.9007 1.85708C15.1845 1.74649 15.4887 1.68958 15.7959 1.68958C16.1031 1.68958 16.4073 1.74649 16.6911 1.85708C16.9749 1.96767 17.2327 2.12977 17.4499 2.33411C17.6672 2.53845 17.8395 2.78104 17.957 3.04803C18.0746 3.31502 18.1351 3.60117 18.1351 3.89015C18.1351 4.17914 18.0746 4.46529 17.957 4.73228C17.8395 4.99927 17.6672 5.24186 17.4499 5.4462L6.28501 15.9495L1.73633 17.1165L2.97688 12.8374L14.1418 2.33411Z"
                stroke="#98A9BC"
                stroke-width="1.55604"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_199_9245">
                <rect
                  width="19.8488"
                  height="18.6725"
                  fill="white"
                  transform="translate(0.0820312)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>

        {/* more */}
        {/* <div className="btn border-white bg-white">
          <svg
            width="8"
            height="30"
            viewBox="0 0 14 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.99998 32.3999C5.30259 32.3999 3.67473 31.7256 2.47449 30.5254C1.27426 29.3252 0.599976 27.6973 0.599976 25.9999C0.599976 24.3025 1.27426 22.6747 2.47449 21.4744C3.67473 20.2742 5.30259 19.5999 6.99998 19.5999C8.69736 19.5999 10.3252 20.2742 11.5255 21.4744C12.7257 22.6747 13.4 24.3025 13.4 25.9999C13.4 27.6973 12.7257 29.3252 11.5255 30.5254C10.3252 31.7256 8.69736 32.3999 6.99998 32.3999ZM6.99998 13.1999C5.30259 13.1999 3.67473 12.5256 2.47449 11.3254C1.27426 10.1252 0.599976 8.49729 0.599976 6.7999C0.599976 5.10252 1.27426 3.47465 2.47449 2.27442C3.67473 1.07419 5.30259 0.399902 6.99998 0.399902C8.69736 0.399902 10.3252 1.07419 11.5255 2.27442C12.7257 3.47465 13.4 5.10252 13.4 6.7999C13.4 8.49729 12.7257 10.1252 11.5255 11.3254C10.3252 12.5256 8.69736 13.1999 6.99998 13.1999ZM6.99998 51.5999C5.30259 51.5999 3.67473 50.9256 2.47449 49.7254C1.27426 48.5252 0.599976 46.8973 0.599976 45.1999C0.599976 43.5025 1.27426 41.8747 2.47449 40.6744C3.67473 39.4742 5.30259 38.7999 6.99998 38.7999C8.69736 38.7999 10.3252 39.4742 11.5255 40.6744C12.7257 41.8747 13.4 43.5025 13.4 45.1999C13.4 46.8973 12.7257 48.5252 11.5255 49.7254C10.3252 50.9256 8.69736 51.5999 6.99998 51.5999Z"
              fill="#232323"
            />
          </svg>
        </div> */}
      </div>
    </div>
  );
};

export default FeedPreviewCard;
