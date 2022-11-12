import 'styled-components';
import 'jest-styled-components';

declare module 'styled-components' {
  export interface ColorsTheme {
    white: string;
    black: string;
    red: string;
    primary: string;
    gray: {
      '02': string;
      '03': string;
      '04': string;
      '05': string;
      '06': string;
    };
  }

  export interface DefaultTheme {
    colors: ColorsTheme;
  }
}
