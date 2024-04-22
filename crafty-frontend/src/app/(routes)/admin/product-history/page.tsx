'use client';

import { User } from '@/app/_common/interface/user';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { FC, useEffect, useState } from 'react';
import ProductPreviewCard from './_components/ProductPreviewCard';
import { ProductHistory } from '@/app/_common/interface/product-history';

const ProductList: FC = () => {
  const [productHistory, setProductHistory] = useState<ProductHistory[]>([]);

  useEffect(() => {
    const fetchProductHistory = async () => {
      try {
        const response = await apiService.adminGetProductHistory();
        if (response.status === ApiStatus.SUCCESS) {
          setProductHistory(response.data ?? []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductHistory();
  }, []);

  console.log(productHistory);

  return (
    <div className="flex w-full flex-col gap-2 p-8">
      <div className="mx-auto grid h-fit w-full max-w-[1300px] gap-6">
        <div className="flex justify-between">
          <span className="text-3xl font-bold">ประวัติการขายสินค้าทั้งหมด</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          {productHistory.map((product, i) => (
            <ProductPreviewCard productHistory={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
