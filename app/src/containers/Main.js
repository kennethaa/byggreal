import React, { PureComponent } from 'react';
import { grey200 } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Feature from '../components/Feature';
import main from '../images/main.jpg';
import livingroom from '../images/livingroom.jpg';
import bathroom from '../images/bathroom.jpg';
import carpenter from '../images/carpenter.jpg';
import building from '../images/building.jpg';
import wall from '../images/wall.jpg';

class Main extends PureComponent {
    render() {
        return (
            <div>
                <div className="row">
                    <div
                        className="col-xs-12"
                        style={{
                            minWidth: 0,
                            minHeight: 0
                        }}
                    >
                        <Slider
                            arrows={false}
                            autoplay
                            infinite
                        >
                            <img src={main} role="presentation" />
                            <img src={livingroom} role="presentation" />
                            <img src={bathroom} role="presentation" />
                        </Slider>
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
                            {'Skal du bygge hus eller restaurerere ditt gamle? Byggreal tar på seg et hvert byggeprosjekt. Kontakt oss for gunstige pristilbud!'}
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <Feature
                        title="Snekkeroppdrag"
                        image={carpenter}
                    />
                    <Feature
                        title="Maleroppdrag"
                        image={building}
                    />
                    <Feature
                        title="Mureroppdrag"
                        image={wall}
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
