import { Review } from '../interface/post';

export const getAvgRatingFromReviewList = (reviewList: Review[]): number => {
  let rating = 0;
  reviewList.forEach((review) => {
    rating += review.rate;
  });
  return rating === 0 ? 0 : Math.floor(rating / reviewList.length);
};
