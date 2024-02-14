import { FC } from 'react';
import WaterfallContainer from './_components/WaterfallContainer';

const HomePage: FC = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-2 bg-[#ffffff]">
      <WaterfallContainer />
    </div>
  );
};

export default HomePage;
