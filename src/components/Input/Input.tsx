import { Colors } from '@/src/constants/colors';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

export default function Input(props: MaskInputProps) {
  return (
    <MaskInput
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
