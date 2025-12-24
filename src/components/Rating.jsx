"use client";

import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingComponent({ value }) {
  return (
    <Rating
      initialRating={value}
      fractions={10}
      fullSymbol={<FaStar color="oklch(76.9% 0.188 70.08)" />}
      emptySymbol={<FaStar color="oklch(90.8% 0.007 247.896)" />}
      readonly
    />
  );
}
