import React, { PureComponent } from 'react';
import { grey200, blueGrey500, red500, yellow500 } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import RaisedButton from 'material-ui/RaisedButton';
import Feature from '../components/Feature';
import header from '../images/header.jpg';

class Main extends PureComponent {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <div
                            style={{
                                marginTop: 50,
                                marginBottom: 50
                            }}
                        >
                            <img
                                className="img-fluid"
                                src={header}
                                alt="Byggreal"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="row flex-items-xs-middle"
                    style={{
                        backgroundColor: grey200,
                        minHeight: 250
                    }}
                >
                    <div className="col-xs-12 text-center">
                        <h3
                            style={{
                                margin: '0px 20px',
                                padding: 0,
                                fontWeight: typography.fontWeightLight,
                                fontSize: 22,
                            }}
                        >
                            {'Skal du bygge hus eller restaurerer ditt gamle? Byggreal tar på seg et hvert byggeprosjekt. Kontakt oss for gunstige pristilbud!'}
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <Feature
                        title="Snekkeroppdrag"
                        iconClassName="mdi mdi-screwdriver"
                        backgroundColor={blueGrey500}
                    />
                    <Feature
                        title="Maleroppdrag"
                        iconClassName="mdi mdi-brush"
                        backgroundColor={red500}
                    />
                    <Feature
                        title="Mureroppdrag"
                        iconClassName="mdi mdi-home"
                        backgroundColor={yellow500}
                    />
                </div>
                <div
                    className="row flex-items-xs-middle"
                    style={{
                        backgroundColor: grey200,
                        minHeight: 250
                    }}
                >
                    <div className="col-xs-12 text-center">
                        <h3
                            style={{
                                margin: 0,
                                padding: 0,
                                fontWeight: typography.fontWeightLight,
                                fontSize: 22,
                            }}
                        >
                            {'Sjekk ut Byggreal på mittanbud.no'}
                        </h3>
                        <RaisedButton
                            label="MITTANBUD"
                            primary
                            href="https://mittanbud.no/profil/118912/byggreal-as"
                            target="_blank"
                            style={{
                                marginTop: 50
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
