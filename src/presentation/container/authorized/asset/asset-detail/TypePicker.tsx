import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '@resources';
import {TextView} from '@components';
import {IssueDataSource, IssueType} from '@data';

export interface TypePickerProps {
  value?: string;
  onChange: (v: string) => void;
}
export const TypePicker: React.FC<TypePickerProps> = ({onChange, value}) => {
  const [data, setData] = React.useState<IssueType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const label = data.find((x) => x.event_id === value)?.event_name;

  React.useEffect(() => {
    setLoading(true);
    IssueDataSource.listIssueType().subscribe({
      next: (res) => {
        setData(res.type_incident);
      },
      complete: () => setLoading(false),
    });
  }, []);
  return (
    <>
      <RNPickerSelect
        style={{}}
        value={value}
        onValueChange={onChange}
        placeholder="Loại sự kiện"
        items={data.map((x) => ({value: x.event_id, label: x.event_name}))}>
        <View style={styles.datePickerContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Icon color={Colors.gray} type="ionicon" name="albums" />
              <TextView style={styles.text} text={label ?? 'Loại sự kiện'} />
            </>
          )}
        </View>
      </RNPickerSelect>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    flex: 1,
    paddingHorizontal: 8,
    color: 'black',
  },
  datePickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 8,
    height: 40,
  },
  picker: {
    ...StyleSheet.absoluteFillObject,
  },
});
