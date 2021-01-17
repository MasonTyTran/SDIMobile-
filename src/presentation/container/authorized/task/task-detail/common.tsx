import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {TextView} from '@components';
import {Colors, TextStyles} from '@resources';

import {TextInput} from 'react-native-gesture-handler';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const InfoBox = ({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
}) => (
  <View style={styles.infoBox}>
    <TextView style={styles.infoBoxLabel} text={label} />
    <TextInput
      style={styles.infoBoxValue}
      onChangeText={onChangeText}
      value={value}
    />
  </View>
);

export const DateTimeBox = ({
  label,
  value,
  onChangeDate,
}: {
  label: string;
  value: Date;
  onChangeDate: (v: Date) => void;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChangeDate(date);
    hideDatePicker();
  };
  return (
    <>
      <Pressable onPress={showDatePicker} style={styles.infoBox}>
        <TextView style={styles.infoBoxLabel} text={label} />
        <TextView style={styles.infoBoxValue} text={value.toISOString()} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    ...TextStyles.title,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  info: {
    flex: 1,
  },
  id: {
    ...TextStyles.normal,
    marginBottom: 8,
  },
  image: {
    width: '30%',
    height: 50,
  },
  infoBox: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
  },
  infoBoxLabel: {
    position: 'absolute',
    top: -10,
    left: 8,
    backgroundColor: 'white',
  },
  infoBoxValue: {
    ...TextStyles.normal,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    letterSpacing: 10,
    marginTop: 30,
  },
  divider: {
    marginVertical: 30,
  },
});
