import 'styled-components';
import { Theme } from '../constants/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
