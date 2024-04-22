import useMyFeed from '@/app/(routes)/(with-navbar)/_hooks/myFeed';
import { Post } from '@/app/_common/interface/post';
import { ProductHistory } from '@/app/_common/interface/product-history';
import { User } from '@/app/_common/interface/user';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface UserPreviewCardProps {
  productHistory: ProductHistory;
}
const ProductPreviewCard = ({ productHistory }: UserPreviewCardProps) => {
  return (
    <div className="flex h-fit w-full flex-row items-center gap-4 rounded-lg bg-white p-4 px-6">
      {/* image */}
      {productHistory.imageUrl && (
        <div className="flex h-[90px] w-[90px] min-w-[90px] items-center justify-center overflow-hidden rounded-lg">
          <Image
            src={productHistory.imageUrl}
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
        <span className="text-xl">{productHistory.title}</span>
        <span className="text-xl font-bold">฿{productHistory.price}</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xl">{productHistory.desc}</span>
      </div>

      <div className="ml-auto flex flex-col gap-2">
        <span className="text-xl">{new Date(productHistory.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ProductPreviewCard;
