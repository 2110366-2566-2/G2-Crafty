'use client';

import { useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import ProductCard from './ProductCard';
import { ProductDetail } from '@/app/_common/interface/chat';

export interface ProductSidebarProps {
  product: ProductDetail | null;
  chatroomId: string;
  isCrafter: boolean;
}

const ProductSidebar = ({ product, chatroomId, isCrafter }: ProductSidebarProps) => {
  // State to manage sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  const iconStyle = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <div className="flex h-full">
      {/* Overlay to close sidebar on click (when sidebar is open) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-[64px] z-50 h-[calc(100vh-64px)] w-[64] transform overflow-y-auto overflow-x-visible border-l bg-white transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[640px] translate-x-0' : 'w-[24px]'
        }`}>
        {/* Sidebar content */}
        <button
          className="absolute left-3 top-1/2 z-[500] flex -translate-x-1/2 items-center justify-center rounded-full border border-black bg-white p-1"
          onClick={toggleSidebar}>
          <BsChevronLeft style={iconStyle} size={8} />
        </button>
        <div className="overflow-y-auto">
          {isOpen && (
            <ProductCard
              key={product?.step}
              product={product}
              chatroomId={chatroomId}
              isCrafter={isCrafter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
