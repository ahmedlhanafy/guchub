const darkTheme = {
  type: 'dark',
  primaryColor: 'blue',
  secondaryColor: 'blue',
  backgroundColor: '#3B4149',
  primaryTextColor: 'white',
  secondaryTextColor: 'rgba(255, 255, 255, 0.6)',
  sectionTitleColor: 'rgba(255,255,255,0.8)',
  cardBackgroundColor: '#767A80',
};

const lightTheme = {
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
