import { Theme } from '../types';

export const defaultTheme: Theme = {
  colors: {
    primary: '#007BFF',
    secondary: '#6C757D',
    background: '#FFFFFF',
    text: '#212529',
    error: '#DC3545',
    success: '#28A745',
    warning: '#FFC107',
    info: '#17A2B8'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    pill: 9999
  },
  typography: {
    fontFamily: 'System',
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '700'
    }
  }
};

export const getTheme = (customTheme?: Partial<Theme>): Theme => {
  if (!customTheme) return defaultTheme;
  
  return {
    ...defaultTheme,
    ...customTheme,
    colors: {
      ...defaultTheme.colors,
      ...customTheme.colors
    },
    spacing: {
      ...defaultTheme.spacing,
      ...customTheme.spacing
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      ...customTheme.borderRadius
    },
    typography: {
      ...defaultTheme.typography,
      ...customTheme.typography,
      fontSize: {
        ...defaultTheme.typography.fontSize,
        ...customTheme.typography?.fontSize
      },
      fontWeight: {
        ...defaultTheme.typography.fontWeight,
        ...customTheme.typography?.fontWeight
      }
    }
  };
};