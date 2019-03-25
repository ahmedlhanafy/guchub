import { AsyncStorage } from 'react-native';

const TOKEN_KEY = 'guc-token';
const DEMOUSER_KEY = 'guc-is-demo-user';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';
const SETTINGS_KEY = 'guc-settings';

/* Apollo Schema */
const saveToken = (token: string) => AsyncStorage.setItem(TOKEN_KEY, token);
const getToken = () => AsyncStorage.getItem(TOKEN_KEY);

const saveDemoUser = (isDemoUser: boolean) => AsyncStorage.setItem(DEMOUSER_KEY, isDemoUser);
const getDemoUser = async (): Promise<boolean> =>
  (await AsyncStorage.getItem(DEMOUSER_KEY)) === 'true';

// AsyncStorage multiset doesn't work for some reason
export const saveCredentials = ({
  token,
  isDemoUser = false,
}: {
  token: string | null,
  isDemoUser?: boolean,
}) => Promise.all([saveToken(token), saveDemoUser(isDemoUser)]);

export const getCredentials = async (): Promise<{
  token: string,
  isDemoUser: boolean,
}> => {
  const [token, isDemoUser] = await Promise.all([getToken(), getDemoUser()]);
  return { token, isDemoUser };
};

/* Apollo Schema */
export const getSchemaVersion = () => AsyncStorage.getItem(SCHEMA_VERSION_KEY);
export const saveSchemaVersion = (schemaVersion: string) =>
  AsyncStorage.setItem(SCHEMA_VERSION_KEY, schemaVersion);

/* Settings */
type Settings = {
  theme: string,
};

const defaultSettings = {
  theme: 'automatic',
};

// Beware that the settings object must be flat
export const updateSettings = async (settings: Settings = defaultSettings) => {
  const oldSettings = await getSettings();
  const stringifiedSettings = JSON.stringify({ ...oldSettings, ...settings });
  AsyncStorage.setItem(SETTINGS_KEY, stringifiedSettings);
};

export const getSettings = async (): Promise<Settings> => {
  const settings = await AsyncStorage.getItem(SETTINGS_KEY);

  if (settings) return JSON.parse(settings);
  return defaultSettings;
};
