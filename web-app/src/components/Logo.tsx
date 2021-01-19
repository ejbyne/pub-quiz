import React from 'react';

import BeerImage from "../assets/images/beer.svg";

export const Logo: React.FC = () => (
  <div className="flex flex-col items-center">
    <h1 className="text-white uppercase text-2xl text-center font-serif select-none">
      The Online Pub Quiz
    </h1>
    <img
      src={BeerImage}
      alt="Two pints of beer"
      className="w-20 mb-2"
    />
  </div>
);
