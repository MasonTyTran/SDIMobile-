import {StyleSheet} from 'react-native';
import {FontSize} from './dimensions';
export const TextStyles = StyleSheet.create({
  normal: {
    fontSize: FontSize.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  description: {
    fontSize: FontSize.sm,
  },
});

export const GridStyles = StyleSheet.create({
  rowSpaceAround: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
