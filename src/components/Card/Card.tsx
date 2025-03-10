import React, {useEffect} from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { CardProps } from '../../types';
import { defaultTheme } from '../../styles/theme';

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated'
}) => {
  const VALID_VARIANTS = ['elevated', 'outlined', 'filled'] as const;
  const isDev = process.env.NODE_ENV === 'development';
  useEffect(()=> {
     if(isDev){
        if(variant && !VALID_VARIANTS.includes(variant as any)){
          console.error(`Card: Invalid variant "${variant}". Must be one of: ${VALID_VARIANTS.join(', ')}`)
        }
        if(style && typeof style !== 'object'){
          console.error(`Card: Invalid style prop. Must be an object.`)
        }
     }
  }, [children, style, variant]);

  const getCardStyle = (): StyleProp<ViewStyle> => {
    const baseStyle: ViewStyle = {
      borderRadius: defaultTheme.borderRadius.md,
      padding: defaultTheme.spacing.md,
    };

    // Apply variant
    switch (variant) {
      case 'outlined':
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = 'rgba(0, 0, 0, 0.12)';
        break;
      case 'filled':
        baseStyle.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        break;
      default: // elevated
        baseStyle.backgroundColor = defaultTheme.colors.background;
        baseStyle.shadowColor = 'rgba(0, 0, 0, 0.3)';
        baseStyle.shadowOffset = { width: 0, height: 2 };
        baseStyle.shadowOpacity = 0.1;
        baseStyle.shadowRadius = 3;
        // @ts-ignore - Web only property, will be handled by react-native-web
        baseStyle.elevation = 2;
    }

    return baseStyle;
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};

export default Card;