//avoid ts errors when importing png files

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
