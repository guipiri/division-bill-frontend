import { Colors } from '@/src/constants/colors';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';

export default function InputText({
  onChange,
}: {
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}) {
  return (
    <TextInput
      onChange={onChange}
      style={{
        borderBottomColor: Colors.Green,
        borderBottomWidth: 1,
        color: Colors.Foreground,
        marginVertical: 10,
      }}
    />
  );
}
