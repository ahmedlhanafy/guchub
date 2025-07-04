import { registerRootComponent } from 'expo';
import App from './src/App';

// registerRootComponent calls React.render on the component and is required for Expo to work
export default registerRootComponent(App); 