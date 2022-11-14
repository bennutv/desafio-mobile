import 'styled-components';
import 'jest-styled-components';

declare module 'styled-components' {
  export interface ColorGranularity {
    default: string;
    light: string;
  }

  export interface ColorsTheme {
    white: string;
    black: string;
    red: string;
    primary: ColorGranularity;
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
