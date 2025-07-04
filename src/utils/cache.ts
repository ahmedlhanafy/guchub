import { Platform } from 'react-native';

// Platform-aware storage
const storage = Platform.OS === 'web' ? localStorage : require('@react-native-async-storage/async-storage').default;

const TOKEN_KEY = 'guc-token';
const DEMOUSER_KEY = 'guc-is-demo-user';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';
const SETTINGS_KEY = 'guc-settings';

/* Apollo Schema */
const saveToken = (token: string) => storage.setItem(TOKEN_KEY, token);
const getToken = () => storage.getItem(TOKEN_KEY);

const saveDemoUser = (isDemoUser: boolean) => storage.setItem(DEMOUSER_KEY, isDemoUser.toString());
const getDemoUser = async (): Promise<boolean> =>
  (await storage.getItem(DEMOUSER_KEY)) === 'true';

// storage multiset doesn't work for some reason
export const saveCredentials = ({
  token,
  isDemoUser = false,
}: {
  token: string;
  isDemoUser?: boolean;
}) => Promise.all([saveToken(token), saveDemoUser(isDemoUser)]);

export const getCredentials = async (): Promise<{
  token: string;
  isDemoUser: boolean;
}> => {
  const [token, isDemoUser] = await Promise.all([getToken(), getDemoUser()]);
  return { token, isDemoUser };
};

/* Apollo Schema */
export const getSchemaVersion = () => storage.getItem(SCHEMA_VERSION_KEY);
export const saveSchemaVersion = (schemaVersion: string) =>
  storage.setItem(SCHEMA_VERSION_KEY, schemaVersion);

/* Settings */
type Settings = {
  theme: string;
};

const defaultSettings = {
  theme: 'automatic',
};

// Beware that the settings object must be flat
export const updateSettings = async (settings: Settings = defaultSettings) => {
  const oldSettings = await getSettings();
  const stringifiedSettings = JSON.stringify({ ...oldSettings, ...settings });
  storage.setItem(SETTINGS_KEY, stringifiedSettings);
};

export const getSettings = async (): Promise<Settings> => {
  const settings = await storage.getItem(SETTINGS_KEY);

  if (settings) return JSON.parse(settings);
  return defaultSettings;
};
