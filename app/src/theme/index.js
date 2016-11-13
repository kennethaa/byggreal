import { fullWhite } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const primary1Color = '#303030';
const primary2Color = '#cad2d7';
const primary3Color = '#4ec128';

export default function getTheme() {
    return {
        palette: {
            primary1Color,
            primary2Color,
            primary3Color,
            // accent1Color: primary2Color
        },
        bottomNavigation: {
            backgroundColor: primary1Color,
            unselectedColor: fade(fullWhite, 0.54),
            selectedColor: fullWhite,
            height: 56,
            unselectedFontSize: 12,
            selectedFontSize: 13
        }
    };
}
