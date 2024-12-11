import { bgColors } from '../constants';

const getRandomBgColor = (min: number, max: number) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return bgColors[randomNumber];
};

export default getRandomBgColor;