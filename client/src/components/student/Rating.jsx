import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

export default function Rating({ initialRating, onRate }) {
  const [rating, setRating] = useState(initialRating || 0);
  const starsClass = (starValue) =>
    clsx('text-xl sm:text-2xl cursor-pointer transition-colors', {
      'text-yellow-400': starValue <= rating,
      'text-gray-400': starValue > rating,
    });
  const handleRate = (starValue) => {
    setRating(starValue);
    onRate?.(starValue);
  };
  useEffect(() => {
    if (initialRating) setRating(initialRating);
  }, [initialRating]);
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            className={starsClass(starValue)}
            onClick={() => handleRate(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
