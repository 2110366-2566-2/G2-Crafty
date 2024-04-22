import { ProductDetail } from '@/app/_common/interface/chat';
import { Button, TextInput } from '@/app/_components/ui/input';
import { apiService } from '@/configs/apiService/apiService';
import { memo, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ProductSidebarProps } from './ProductSidebar';
import StepProgress from './StepProgress';
import { ApiStatus } from '@/configs/apiService/types';
import userStore from '@/app/_common/store/user/user-store';

interface MyTextInputProps {
  label: string;
  placeholder: string;
  required: boolean;
  value: string;
  setText: (text: string) => void;
}

interface CreateProductFormProps {
  chatroomId: string;
  isCrafter: boolean;
  postId: string | null;
}

export interface NonEmptyProductSidebarProps {
  product: ProductDetail;
  chatroomId: string;
  isCrafter: boolean;
  postId: string | null;
}

const MyTextInput = ({ label, placeholder, required, value, setText }: MyTextInputProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="text-sm">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </div>
        <TextInput
          className="border border-gray-500"
          placeholder={placeholder}
          borderNoneOnFocus={false}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (label === 'ราคาสินค้า (บาท)') {
              // only accept numeric value
              const numericValue = e.target.value.replace(/\D/g, '');
              setText(numericValue);
              e.target.value = numericValue;
            }
            setText(e.target.value);
          }}
        />
      </div>
    </>
  );
};

const CreateProductForm = ({ chatroomId }: CreateProductFormProps) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const createNewProduct = async () => {
    // loop through textInputList
    for (const textInput of textInputList) {
      if (textInput.required && !textInput.value) {
        alert('Please fill in all required fields');
        return;
      }
    }

    try {
      const product = await apiService.createNewProduct({
        title,
        imageUrl,
        price: parseInt(price),
        desc,
        chatroomId,
      });
      console.log(product);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const textInputList = [
    {
      label: 'ชื่อสินค้า',
      placeholder: 'Example Product',
      required: true,
      value: title,
      setText: setTitle,
    },
    {
      label: 'URL รูปถ่ายสินค้า',
      placeholder: 'https://example.com/image.png',
      required: false,
      value: imageUrl,
      setText: setImageUrl,
    },
    {
      label: 'ราคาสินค้า (บาท)',
      placeholder: '1900',
      required: true,
      value: price,
      setText: setPrice,
    },
    {
      label: 'รายละเอียดสินค้า',
      placeholder: 'Product Description',
      required: true,
      value: desc,
      setText: setDesc,
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex text-xl font-bold">สร้างสินค้า Custom</div>
      <div className="flex w-full flex-col gap-6 px-10">
        {textInputList.map((textInput) => (
          <MyTextInput key={textInput.label} {...textInput} />
        ))}
      </div>
      <div className="mt-4 w-[200px]">
        <Button onClick={createNewProduct}>สร้างสินค้า</Button>
      </div>
    </div>
  );
};

const EmptyProductCard = ({ chatroomId, isCrafter, postId }: CreateProductFormProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateProduct = () => {
    setShowCreateForm(true);
  };

  return (
    <>
      {showCreateForm ? (
        <CreateProductForm chatroomId={chatroomId} isCrafter={isCrafter} postId={postId} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="mb-8 text-lg font-bold">
            Post:{' '}
            {postId ? (
              <span
                className="ml-1 font-normal underline hover:cursor-pointer hover:shadow-md"
                onClick={() => (window.location.href = `/feed-detail/${postId}`)}>
                {postId}
              </span>
            ) : (
              'ไม่มี'
            )}{' '}
          </div>
          <AiOutlineShoppingCart size={100} />
          <div className="text-2xl font-semibold">ยังไม่มีสินค้าในขณะนี้</div>
          <div className="flex min-w-[200px]">
            {isCrafter && <Button onClick={handleCreateProduct}>สร้างสินค้า</Button>}
            {!isCrafter && <Button disabled={true}>อยู่ระหว่างการรอให้ Crafter สร้างสินค้า</Button>}
          </div>
        </div>
      )}
    </>
  );
};

const RealProductCard = ({
  product,
  chatroomId,
  isCrafter,
  postId,
}: NonEmptyProductSidebarProps) => {
  const [step, setStep] = useState(product.step);

  const cancelPayment = async () => {
    const chatroom_response = await apiService.getChatroomDetail(chatroomId);
    let chatroom;

    if (chatroom_response.status === ApiStatus.SUCCESS) {
      chatroom = chatroom_response.data;
    } else {
      console.log('chatroom error');
      return;
    }

    // TODO: call pay api
    const amount = product.price;
    const productId = product.id;
    const from = chatroom.crafterId || '';
    const to = chatroom.crafteeId || '';
    const pay_response = await apiService.pay({ productId, from, to, amount });

    if (pay_response.status == ApiStatus.SUCCESS) {
      console.log('Refund Success!');
      return true;
    } else {
      console.log('Refund failed', pay_response.errorMessage);
      return false;
    }
  };

  const deleteProduct = async () => {
    if (step >= 4 && step != 6) return;

    // display confirmation dialog
    const confirmDelete = confirm('Are you sure you want to cancel this product?');
    if (!confirmDelete) return;

    if (product.isPaid) {
      // TODO: refund
      const isCancelSuccess = await cancelPayment();
      if (!isCancelSuccess) return;
    }

    try {
      await apiService.deleteProduct(product.id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const reviewProduct = async (desc: string, rate: number, sender: string) => {
    console.log('reviewProduct', desc, rate, sender);
    if (step != 6) return;

    if (!desc || rate.toString() === '') {
      alert('Please fill in all required fields');
      return;
    }

    if (rate < 1 || rate > 5) {
      alert('Please fill in rating between 1-5');
      return;
    }

    if (!postId) return;

    await apiService.reviewProduct(postId, desc, rate, sender);

    try {
      await apiService.deleteProduct(product.id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const submitPayment = async () => {
    // display confirmation dialog
    const confirmPayment = confirm(
      `Are you sure you want to pay ${product.price}฿ for this product?`
    );
    if (!confirmPayment) return;

    const chatroom_response = await apiService.getChatroomDetail(chatroomId);
    let chatroom;

    if (chatroom_response.status === ApiStatus.SUCCESS) {
      chatroom = chatroom_response.data;
    } else {
      console.log('chatroom error');
      return;
    }

    // TODO: call pay api
    const amount = product.price;
    const productId = product.id;
    const from = chatroom.crafteeId || '';
    const to = chatroom.crafterId || '';
    const pay_response = await apiService.pay({ productId, from, to, amount });

    if (pay_response.status == ApiStatus.SUCCESS) {
      console.log('Payment Success!');
      await incrementStep();
    } else {
      console.log('Payment failed', pay_response.errorMessage);
      return;
    }
  };

  const incrementStep = async () => {
    try {
      const updatedProduct = await apiService.incrementProductStep(product.id);
      console.log(updatedProduct);
      if (step < 6) setStep(step + 1);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const incrementButtonStatus = [
    {
      crafterTitle: 'กำลังรอการตอบรับจาก Craftee',
      crafteeTitle: 'ยืนยัน Offer',
      isEnableForCrafter: false,
    },
    {
      crafterTitle: 'กำลังรอการชำระเงินจาก Craftee',
      crafteeTitle: 'ชำระเงิน',
      isEnableForCrafter: false,
    },
    {
      crafterTitle: 'ยืนยันว่าได้รับเงินเรียบร้อยแล้ว',
      crafteeTitle: 'อยู่ระหว่างรอ Crafter ตรวจสอบการชำระเงิน',
      isEnableForCrafter: true,
    },
    {
      crafterTitle: 'ทำสินค้าเสร็จแล้ว',
      crafteeTitle: 'อยู่ระหว่างการทำสินค้าจาก Crafter',
      isEnableForCrafter: true,
    },
    {
      crafterTitle: 'อยู่ระหว่างรอ Craftee ยืนยันการรับสินค้า',
      crafteeTitle: 'ยืนยันการรับสินค้าและปิดการสั่งซื้อ',
      isEnableForCrafter: false,
    },
    {
      crafterTitle: 'Product Completed',
      crafteeTitle: 'Product Completed',
      isEnableForCrafter: false,
    },
  ];

  // console.log('isCrafter: ', isCrafter);

  const [desc, setDesc] = useState('');
  const [rate, setRate] = useState(0);
  const sender = userStore((state) => state.user.username);

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-12 p-10">
      <div
        className={`${product.imageUrl ? 'mt-[200px]asdf' : ''} flex flex-col items-center gap-6`}>
        <div className="flex flex-col gap-2 font-bold">
          <div>
            Post:{' '}
            <span
              className="ml-1 font-normal underline hover:cursor-pointer hover:shadow-md"
              onClick={() => (window.location.href = `/feed-detail/${postId}`)}>
              {postId}
            </span>
          </div>
          <hr className="border-1 w-full text-red-500"></hr>
        </div>

        <div className="flex flex-col break-all text-2xl font-bold">
          <div>{product.title}</div>
          <div className="ml-2 text-lg">#{product.id}</div>
        </div>
        {product.imageUrl && (
          <div className="flex h-[200px]">
            <img src={product.imageUrl} alt={product.title} className="h-full w-auto rounded-lg" />
          </div>
        )}
        <div className="mb-2 flex w-full flex-col gap-3">
          <div className="text-xl font-bold">รายละเอียดสินค้า</div>
          <div className="ml-6 break-all">{product.desc}</div>
        </div>
        <div className="flex w-full items-end text-xl font-bold">
          <div className="mr-3">ราคา:</div>
          <div className="text-2xl">
            {Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2, // Ensure two decimal places
              maximumFractionDigits: 2, // Ensure two decimal places
            }).format(product.price)}
          </div>
          <div className="ml-1 text-2xl">฿</div>
        </div>
      </div>

      <StepProgress step={step} />
      <div className="flex min-w-[400px] flex-col gap-2 px-10">
        <Button
          className="rounded-xl"
          onClick={!isCrafter && step == 2 ? submitPayment : incrementStep}
          disabled={incrementButtonStatus[step - 1].isEnableForCrafter != isCrafter || step == 6}>
          {isCrafter
            ? incrementButtonStatus[step - 1].crafterTitle
            : incrementButtonStatus[step - 1].crafteeTitle}
        </Button>
        {step === 6 && !isCrafter && (
          <>
            {/* rating number input */}
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating"
              className="input rounded-sm"
              onChange={(e) => setRate(parseInt(e.target.value))}
            />
            {/* review comment */}
            <textarea
              placeholder="Review"
              className="input rounded-sm"
              onChange={(e) => setDesc(e.target.value)}></textarea>

            <Button
              className="rounded-xl"
              onClick={() => {
                reviewProduct(desc, rate, sender);
              }}>
              Review and Finish
            </Button>
          </>
        )}
        {(step <= 3 || step == 6) && (
          <Button className="rounded-xl bg-red-500 hover:bg-red-700" onClick={deleteProduct}>
            {step != 6 ? 'Cancel this product' : 'Finish'}
          </Button>
        )}
      </div>
    </div>
  );
};

const arePropsEqual = (prevProps: ProductSidebarProps, nextProps: ProductSidebarProps) => {
  // Check if the chatroomId has changed
  // console.log('Check');
  if (prevProps.chatroomId !== nextProps.chatroomId) {
    return false;
  }

  // Check if the isCrafter flag has changed
  if (prevProps.isCrafter !== nextProps.isCrafter) {
    return false;
  }

  // Check if the product object reference has changed or product.step has changed
  if (prevProps.product?.step !== nextProps.product?.step) {
    console.log('Not equal!');
    return false;
  }

  // If none of the above conditions are true, props are considered equal
  // and the component does not need to re-render.
  return true;
};

const ProductCard = ({ product, chatroomId, isCrafter, postId }: ProductSidebarProps) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-9">
      {!product && (
        <EmptyProductCard chatroomId={chatroomId} isCrafter={isCrafter} postId={postId} />
      )}
      {product && (
        <RealProductCard
          product={product}
          chatroomId={chatroomId}
          isCrafter={isCrafter}
          postId={postId}
        />
      )}
    </div>
  );
};

export default ProductCard;
