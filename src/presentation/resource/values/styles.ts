import {StyleSheet} from 'react-native';
import {FontSize} from './dimensions';
export const TextStyles = StyleSheet.create({
  normal: {
    fontSize: FontSize.md,
  },
  mdTitle: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
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
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
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
