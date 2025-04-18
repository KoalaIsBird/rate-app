import { Text as NativeText, StyleProp, StyleSheet, TextStyle } from 'react-native';

import theme from '../theme';
import { ReactNode } from 'react';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal 
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  }
});

interface Props {
  color?: 'textSecondary' | 'primary',
  fontSize?: 'subheading',
  fontWeight?: 'bold',
  style?: TextStyle,
  children?: ReactNode
}

export const Text = ({ color, fontSize, fontWeight, style, ...props }: Props) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style
  ];

  return <NativeText style={textStyle} children {...props} />;
};

