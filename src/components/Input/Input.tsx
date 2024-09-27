import { Colors } from '@/src/constants/colors';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

type InputProps = MaskInputProps & {
  onChangeText: (masked: string, unmasked: string, obfuscated?: string) => void;
  value?: string;
};

export default function Input({
  onChangeText,
  style,
  value,
  ...rest
}: InputProps) {
  const [inputValue, setInputValue] = useState<string>(value || '');

  const handleChange = useCallback(
    (masked: string, unmasked: string) => {
      setInputValue(unmasked);
      onChangeText(masked, unmasked);
    },
    [onChangeText],
  );

  return (
    <MaskInput
      {...rest}
      value={inputValue}
      onChangeText={handleChange}
      style={{ ...styles.input, ...new Object(style) }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.Green,
    borderBottomWidth: 1,
    color: Colors.Foreground,
  },
});
