import { Review } from '@/app/_common/interface/post';
import ReviewCard from './components/ReviewCard';

interface ReviewContainerProps {
  reviews: Review[];
}

const ReviewContainer = ({ reviews }: ReviewContainerProps) => {
  return (
    <div className="mx-auto flex h-fit w-full max-w-[1300px] flex-col gap-2 rounded-xl bg-white p-10">
      <span className="mb-3 text-3xl font-bold">
        รีวิว
        <span className="text-xl">
          {' ('}
          {reviews.length}
          {' รีวิว)'}
        </span>
      </span>

      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {reviews.map((review, i) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};

export default ReviewContainer;
