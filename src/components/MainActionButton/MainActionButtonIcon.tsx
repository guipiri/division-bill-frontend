import { Colors } from '@/src/constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';

export default function MainActionButtonIcon({
  name = 'plus-circle',
}: {
  name?: ComponentProps<typeof FontAwesome>['name'];
}) {
  return <FontAwesome name={name} size={56} color={Colors.Green} />;
}
