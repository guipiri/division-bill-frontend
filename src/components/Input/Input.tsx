import { Colors } from '@/src/constants/colors';
import { TextInput, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={{
        borderBottomColor: Colors.Green,
        borderBottomWidth: 1,
        color: Colors.Foreground,
        ...new Object(props.style),
      }}
    />
  );
}
