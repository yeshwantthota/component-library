import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ViewStyle, 
  TextStyle,
  StyleProp
} from 'react-native';
import { ButtonProps } from '../../types';
import { defaultTheme } from '../../styles/theme';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle
}) => {
  const getContainerStyle = (): StyleProp<ViewStyle> => {
    const baseStyle: ViewStyle = {
      borderRadius: defaultTheme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1
    };

    // Apply size
    switch (size) {
      case 'small':
        baseStyle.paddingHorizontal = defaultTheme.spacing.sm;
        baseStyle.paddingVertical = defaultTheme.spacing.xs;
        break;
      case 'large':
        baseStyle.paddingHorizontal = defaultTheme.spacing.lg;
        baseStyle.paddingVertical = defaultTheme.spacing.md;
        break;
      default: // medium
        baseStyle.paddingHorizontal = defaultTheme.spacing.md;
        baseStyle.paddingVertical = defaultTheme.spacing.sm;
    }

    // Apply variant
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = defaultTheme.colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = defaultTheme.colors.primary;
        break;
      case 'text':
        baseStyle.backgroundColor = 'transparent';
        break;
      default: // primary
        baseStyle.backgroundColor = defaultTheme.colors.primary;
    }

    return baseStyle;
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyle: TextStyle = {
      fontWeight: '500', // assuming 'medium' corresponds to '500'
    };

    // Apply size
    switch (size) {
      case 'small':
        baseStyle.fontSize = defaultTheme.typography.fontSize.sm;
        break;
      case 'large':
        baseStyle.fontSize = defaultTheme.typography.fontSize.lg;
        break;
      default: // medium
        baseStyle.fontSize = defaultTheme.typography.fontSize.md;
    }

    // Apply variant
    switch (variant) {
      case 'outline':
      case 'text':
        baseStyle.color = defaultTheme.colors.primary;
        break;
      default: // primary, secondary
        baseStyle.color = defaultTheme.colors.background;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;