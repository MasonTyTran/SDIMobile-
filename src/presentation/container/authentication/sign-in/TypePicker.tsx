import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '@resources';
import {TextView} from '@components';
import {IssueDataSource, Organization} from '@data';

export interface TypePickerProps {
  value?: string;
  onChange: (v: string) => void;
}
export const TypePicker: React.FC<TypePickerProps> = ({onChange, value}) => {
  const [data, setData] = React.useState<Organization[]>([]);
  const [loading, setLoading] = React.useState(true);
  const label = data.find((x) => x.vidagis_organizationid === value)
    ?.vidagis_organizationname;

  React.useEffect(() => {
    setLoading(true);
    IssueDataSource.getOrganizations().subscribe({
      next: (res) => {
        setData(res);
        try {
          const first = res[0];
          first && onChange(first.vidagis_organizationid);
        } catch (error) {}
      },
      complete: () => setLoading(false),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <RNPickerSelect
        style={{}}
        value={value}
        onValueChange={onChange}
        items={data.map((x) => ({
          value: x.vidagis_organizationid,
          label: x.vidagis_organizationname,
        }))}>
        <View style={styles.datePickerContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Icon color={Colors.gray} type="ionicon" name="albums" />
              <TextView style={styles.text} text={label ?? 'Tổ chức'} />
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
