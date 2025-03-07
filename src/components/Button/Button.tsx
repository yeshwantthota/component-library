import React, {useEffect} from 'react';
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

const VALID_VARIANTS = ['primary', 'secondary', 'outline', 'text'] as const;
const VALID_SIZES = ['small', 'medium', 'large'] as const;

const isDev = process.env.NODE_ENV === 'development';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle
}) => {

  useEffect(() => {
    if(isDev){
      if(!title || typeof title !== 'string'){
        console.error(`Button: Invalid title prop. Must be a string.`)
      }

      if(!onPress || typeof onPress !== 'function'){
        console.error(`Button: Invalid onPress prop. Must be a function.`)
      }

      if(variant && !VALID_VARIANTS.includes(variant as any)){
        console.error(`Button: Invalid variant "${variant}". Must be one of: ${VALID_VARIANTS.join(', ')}`)
      }

      if(size && !VALID_SIZES.includes(size as any)){
        console.error(`Button: Invalid size "${size}". Must be one of: ${VALID_SIZES.join(', ')}`)
      }
      if(disabled && typeof disabled !== 'boolean'){
        console.error(`Button: Invalid disabled prop. Must be a boolean value.`)
      }
      if(style && typeof style !== 'object'){
        console.error(`Button: Invalid style prop. Must be an object.`)
      }
      if(textStyle && typeof textStyle !== 'object'){
        console.error(`Button: Invalid textStyle prop. Must be an object.`)
      }
    }
  }, [title, onPress, variant, size, disabled, style, textStyle]);

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