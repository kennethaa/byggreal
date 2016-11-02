import { grey200, grey300 } from 'material-ui/styles/colors';

const primary1Color = '#3d2314';
const primary2Color = '#f04e35';
const primary3Color = '#ffcc00';

export default function getTheme() {
    return {
        palette: {
            primary1Color,
            primary2Color,
            primary3Color,
            accent1Color: primary2Color
        },
        toggle: {
            thumbOnColor: primary3Color,
            thumbOffColor: primary1Color,
            trackOnColor: grey300,
            trackOffColor: grey300
        },
        card: {
            activeBackgroundColor: grey200
        }
    };
}
