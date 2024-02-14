import React, { FC } from 'react';
import VerticalLogo from '@assets/svgs/vertical_logo.svg';

interface Props {
  children?: React.ReactNode;
}

const LogoLeftSide: FC<Props> = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-ct_brown-100">
      <div className="flex h-full flex-row items-center justify-center">
        <div className="flex h-full w-1/2 items-center justify-center bg-ct_brown-200">
          <VerticalLogo className="" height={400} />
        </div>
        <div className="flex h-full w-1/2 items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default LogoLeftSide;
