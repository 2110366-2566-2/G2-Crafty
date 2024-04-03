'use client';

import { FC } from 'react';

interface SkipModalProps {
  title?: string;
  description?: string;
  actionButtonText?: string;
  cancelButtonText?: string;
  onBack?: () => void;
  onCancel?: () => void;
  positiveAction?: boolean;
}

const Modal: FC<SkipModalProps> = ({
  onBack = () => {},
  onCancel = () => {},
  title = 'Title',
  description = 'Description will be shown here',
  actionButtonText = 'Aciton',
  cancelButtonText = 'Back',
  positiveAction = false,
}) => {
  return (
    <>
      <div className="absolute z-50 w-full">
        <div className="flex h-screen w-full items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
            <h1 className="mb-4 text-xl font-semibold text-gray-700">{title}</h1>
            <p className="mb-6 text-gray-500">{description}</p>
            <div className="flex w-full justify-between gap-6">
              <button
                className="w-full rounded-full bg-ct_gray-200 px-2 py-3 uppercase text-white outline-none transition-all duration-150 ease-linear hover:bg-ct_gray-300 hover:text-white"
                type="button"
                onClick={onCancel}>
                {cancelButtonText}
              </button>
              <button
                className={`w-full rounded-full ${positiveAction ? 'bg-ct_pos hover:bg-green-700' : 'bg-ct_neg hover:bg-red-700'}  px-2 py-3 uppercase text-white outline-none transition-all duration-150 ease-linear hover:text-white`}
                type="button"
                onClick={onBack}>
                {actionButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
