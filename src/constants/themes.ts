export type Theme = {
  type: 'dark' | 'light';
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  sectionTitleColor: string;
  cardBackgroundColor: string;
};

const darkTheme: Theme = {
  type: 'dark',
  primaryColor: 'blue',
  secondaryColor: 'blue',
  backgroundColor: '#2b2f35',
  primaryTextColor: 'white',
  secondaryTextColor: 'rgba(255, 255, 255, 0.6)',
  sectionTitleColor: 'rgba(255,255,255,0.8)',
  cardBackgroundColor: '#585b60',
};

const lightTheme: Theme = {
  type: 'light',
  primaryColor: 'blue',
  secondaryColor: 'blue',
  backgroundColor: 'white',
  primaryTextColor: 'black',
  secondaryTextColor: 'rgba(0, 0, 0, 0.6)',
  sectionTitleColor: 'rgba(0,0,0,0.8)',
  cardBackgroundColor: 'white',
};

const currentHour = new Date().getHours();

export default {
  light: lightTheme,
  dark: darkTheme,
  automatic: currentHour >= 18 || currentHour <= 6 ? darkTheme : lightTheme,
};
