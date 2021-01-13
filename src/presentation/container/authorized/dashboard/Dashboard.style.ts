import {Colors} from './../../../resource/values/colors';
import {Dimensions, StyleSheet} from 'react-native';
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
const CHART_SIZE = Dimensions.get('window').width * 0.65;
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
    paddingBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...shadow,
  },
  navButton: {
    width: 120,
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
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 24,
    ...shadow,
  },
  chartTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: Colors.gray,
  },
  pieChart: {
    width: CHART_SIZE,
    height: CHART_SIZE,
  },
  totalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: Colors.gray,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  legend: {
    flexDirection: 'row',
    padding: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 16,
  },
});
