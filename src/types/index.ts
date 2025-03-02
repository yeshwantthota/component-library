import { StyleProp, TextStyle, ViewStyle } from 'react-native';

// Common prop types
export interface ThemeProps {
  theme?: Theme;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fontWeight: {
      light: string;
      regular: string;
      medium: string;
      bold: string;
    };
  };
}

// Button types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

// Card types
export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'filled';
}