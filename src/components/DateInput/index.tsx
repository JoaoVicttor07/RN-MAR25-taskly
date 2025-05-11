import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Input from '../input';
//feito
interface DateInputProps {
  label?: string;
  initialDate?: Date | null;
  onDateChange: (date: Date | null) => void;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, initialDate, onDateChange, error }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date | null>(initialDate || null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    hideDatePicker();
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  const formattedDate = date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : '';

  return (
    <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
      <View>
        <Input
          label={label}
          value={formattedDate}
          editable={false}
          placeholder="28/04/2025"
          error={error}
        />

        <DatePicker
          modal
          open={isDatePickerVisible}
          date={date || new Date()}
          mode="date"
          locale="pt-BR"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DateInput;
