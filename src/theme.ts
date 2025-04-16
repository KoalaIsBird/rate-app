import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    headerColor: '#24292e',
    appBackground: '#e1e4e8',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16
  },
  fonts: {
    main: (() => {
      switch (Platform.OS) {
        case 'android':
          return 'Roboto';
        case 'ios':
          return 'Arial';
        default:
          return 'System';
      }
    })()
  },
  fontWeights: {
    normal: '400' as '400',
    bold: '700' as '700'
  }
};

export default theme;
