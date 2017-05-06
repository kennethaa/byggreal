// @flow

import { grey900 } from 'material-ui/styles/colors';

const primary1Color = grey900;
const primary2Color = '#cad2d7';
const primary3Color = '#4ec128';

export default function getTheme() {
  return {
    palette: {
      primary1Color,
      primary2Color,
      primary3Color,
    },
    appBar: {
      height: 80,
    },
  };
}
