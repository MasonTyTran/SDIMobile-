import {shallow} from 'enzyme';
import {StyleSheet} from 'react-native';
const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
const gray = 'rgb(82,89,108)';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 100,
    paddingTop: 30,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...shadow,
  },
  navButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    ...shadow,
  },
  navText: {
    color: 'white',
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    ...shadow,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
  },
  legend: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: 100,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 16,
  },
});
