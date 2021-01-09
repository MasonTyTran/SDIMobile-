import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const FACTOR = 0.02;
export const FontSize = {
  sm: width * FACTOR,
  md: width * FACTOR * 1.5,
  lg: width * FACTOR * 2.5,
  xlg: width * FACTOR * 3,
};
