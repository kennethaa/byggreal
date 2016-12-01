import React, { PureComponent, PropTypes } from 'react';
import { lightWhite, grey900, darkWhite } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';

const FOOTER_ITEM_STYLE = {
    padding: 50
};

class Footer extends PureComponent {
    render() {
        return (
            <div
                className="row flex-items-xs-middle"
                style={{
                    color: lightWhite,
                    backgroundColor: grey900,
                    fontWeight: typography.fontWeightLight,
                    minHeight: 250
                }}
            >
                <div className="col-xs-12 col-md-4 text-center">
                    <div style={FOOTER_ITEM_STYLE}>
                        {`Copyright © Byggreal AS ${new Date().getFullYear()}`}
                    </div>
                </div>
                <div className="col-xs-12 col-md-4 text-center">
                    <div style={FOOTER_ITEM_STYLE}>
                        <div
                            className="fb-like"
                            data-href="https://facebook.com/Byggreal-AS-167667106644338"
                            data-layout="standard"
                            data-action="like"
                            data-size="small"
                            data-show-faces="true"
                            data-share="true"
                            data-width="250"
                            data-colorscheme="dark"
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-md-4 text-center">
                    <div style={FOOTER_ITEM_STYLE}>
                        <span className="mdi mdi-email" />
                        {' '}
                        <a
                            href="mailto:ove@byggreal.no"
                            style={{ color: darkWhite }}
                        >
                            {'ove@byggreal.no'}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {
    muiTheme: PropTypes.object.isRequired
};

export default Footer;
