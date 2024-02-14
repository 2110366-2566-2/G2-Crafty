import { FC } from 'react';

interface ButtonProps {
  children: string | React.ReactElement<any>;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, disabled = false, onClick = () => {} }) => {
  const onClickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <>
      <button
        className={`btn h-10 min-h-0 w-full rounded-lg border-none ${disabled ? 'no-animation cursor-default bg-ct_gray-300 hover:bg-ct_gray-300 active:scale-100' : 'bg-ct_brown-500'} text-base text-white`}
        onClick={onClickHandler}>
        {children}
      </button>
    </>
  );
};

export default Button;
