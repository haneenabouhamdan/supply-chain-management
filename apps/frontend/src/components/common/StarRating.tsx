import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const handleClick = (value: number) => {
    setRating && setRating(value);
  };

  return (
    <Box display="flex" alignItems="center" width={'fit-content'}>
      {[1, 2, 3, 4, 5].map(value => (
        <IconButton
          key={value}
          icon={<FaStar />}
          color={value <= rating ? 'orange.300' : 'gray.300'}
          onClick={() => handleClick(value)}
          variant="ghost"
          size="sm"
          aria-label="rating"
        />
      ))}
    </Box>
  );
};

export default StarRating;
