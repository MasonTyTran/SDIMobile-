import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {Icon} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
export interface DatePickerProps {
  date?: Date;
  onChange: (date: Date) => void;
  placeholder: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  date,
  placeholder,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <Pressable style={styles.datePickerContainer} onPress={showDatePicker}>
        <Icon color={Colors.gray} type="ionicon" name="calendar" />
        <TextView
          style={styles.text}
          text={date ? moment(date).format('DD/MM/YYYY HH:mm') : placeholder}
        />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={date}
        mode="date"
        onConfirm={(date) => {
          onChange(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    flex: 1,
    paddingHorizontal: 8,
  },
  datePickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 40,
    marginBottom: 8,
  },
});
