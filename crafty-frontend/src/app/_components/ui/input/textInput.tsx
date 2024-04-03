import { FC } from 'react';

interface TextInputProps {
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  border?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  borderNoneOnFocus?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  type = 'text',
  name = '',
  value = '',
  onChange = () => {},
  onKeyDown = () => {},
  placeholder = '',
  border = false,
  disabled = false,
  autoComplete = 'off',
  className = '',
  borderNoneOnFocus = true,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`input ${disabled && 'input-disabled'} h-10 w-full rounded-lg placeholder:font-normal ${borderNoneOnFocus ? 'focus:border-none' : ''} ${border ? 'border-2 border-ct_brown-500 focus:border-ct_brown-500' : ''} bg-white py-4 focus:outline-none active:outline-none ${className}`}
        onChange={onChange}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default TextInput;
