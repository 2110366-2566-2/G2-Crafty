import { Post } from '@/common/interface/post';
import Image from 'next/image';
import { FC } from 'react';

interface FeedCardProps {
  post: Post;
}

const FeedCard: FC<FeedCardProps> = ({ post }: FeedCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <Image
        // src={`https://picsum.photos/seed/${Math.random() * 1000}/500/${
        //   (Math.floor(Math.random() * 10) + 5) * 100
        // }`}
        src={post.Thumbnail.ThumbnailUrl}
        className="h-fit w-full overflow-hidden"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
        width={5000}
        height={5000}
        alt={`Image`}
        loading="lazy"
      />

      {/* Masking */}
      <div
        className="absolute top-0 z-20 flex h-full w-full bg-[#000] opacity-0 duration-100 hover:cursor-pointer hover:opacity-25"
        onClick={() => {
          window.location.href = `/feed-detail/${post.ID}`;
        }}
      />
    </div>
  );
};

export default FeedCard;
