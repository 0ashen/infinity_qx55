import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';
import { theme } from './styled-component-theme';

export enum FONT_FAMILY {
    Helvetica = 'InfinitiBrand, Arial, sans-serif',
}

export const GlobalStyleCommon = createGlobalStyle`
  //noinspection ALL
  @font-face {
    font-family: InfinitiBrand;
    font-weight: 400;
    src: url(/fonts/InfinitiBrand-Regular.eot?) format("eot"),
    url(/fonts/InfinitiBrand-Regular.woff2) format("woff2"),
    url(/fonts/InfinitiBrand-Regular.woff) format("woff")
  }

  //noinspection ALL
  @font-face {
    font-family: InfinitiBrand;
    font-weight: 300;
    src: url(/fonts/InfinitiBrand-Light.eot?) format("eot"),
    url(/fonts/InfinitiBrand-Light.woff2) format("woff2"),
    url(/fonts/InfinitiBrand-Light.woff) format("woff")
  }

  //noinspection ALL
  @font-face {
    font-family: InfinitiBrand;
    font-weight: 700;
    src: url(/fonts/InfinitiBrand-Bold.eot?) format("eot"),
    url(/fonts/InfinitiBrand-Bold.woff2) format("woff2"),
    url(/fonts/InfinitiBrand-Bold.woff) format("woff")
  }

  ${normalize}
  html {
    box-sizing: border-box;
    background: ${theme.colors.background};
  }

  body {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    min-height: 100vh;
    // background-color: ;
    font-family: ${FONT_FAMILY.Helvetica};
    font-weight: 300;
    font-size: 18px;
    color: ${theme.colors.white};
    //max-width: calc(100% - 40px);
    //margin-left: auto;
    //margin-right: auto;
    //overflow-x: hidden;

    &, * {
      ${() =>
          !process.env.NODE_ENV || process.env.NODE_ENV !== 'development'
              ? css`
                    cursor: none !important;
                `
              : ''};
    }
  }


  * {
    box-sizing: border-box;
    //outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, menu {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  p {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    //font-weight: 400;
    //font-size: inherit;
  }

  input {
    border: none;
    color: inherit;
    font-family: inherit;
    border-radius: 0;
    padding: 0;

    &[type="password"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none !important;

      &::-ms-clear {
        display: none;
      }

      &::-ms-reveal {
        display: none;
      }

      //noinspection ALL
      &::-webkit-contacts-auto-fill-button {
        visibility: hidden;
        display: none !important;
        pointer-events: none;
        position: absolute;
        right: 0;
      }

      //noinspection ALL
      &::-webkit-credentials-auto-fill-button {
        visibility: hidden;
        display: none !important;
        pointer-events: none;
        position: absolute;
        right: 0;
      }
    }
  }

  button {
    border: none;
    font-family: inherit;
    padding: 0;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
  }

  select {
    border: none;
    background-color: transparent;
    font-family: inherit;
    padding: 0;
    color: inherit;
    cursor: pointer;

    option {
      background-color: inherit;
      color: #000;
    }
  }

  svg {
    max-width: 100%;
    display: block;
    width: 100%;
    height: 100%;
  }
`;
