import 'styled-components/native';
import { Theme } from '../constants/themes';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
