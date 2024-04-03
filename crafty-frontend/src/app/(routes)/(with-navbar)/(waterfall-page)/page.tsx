import { FC } from 'react';
import WaterfallContainer from './_components/WaterfallContainer';

const HomePage: FC = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <WaterfallContainer />
    </div>
  );
};

export default HomePage;
