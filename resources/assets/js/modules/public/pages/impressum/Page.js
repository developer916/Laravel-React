import React, { Component } from "react"
import PropTypes from "prop-types"
import {
    Container, Row, Col,
    Card, CardBody, CardHeader,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';


import Navigation from '../../../../common/navigation'

import {Trans , withTranslation } from "react-i18next";
import _ from 'lodash';


class Page extends Component {
    static displayName = "Impressum"
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className="public-event-view">
            <Navigation/>
            <Container  style={{paddingTop: '15px'}}>
                <Row>
                    <Col md={12}>
                        <h2><Trans i18nKey="impressum.information_provided_according_to_sec"/></h2>
                        <p>PosBill GmbH
                            <br />Brunnengasse 4
                            <br />56355 Kehlbach
                        </p>
                        <br />
                        <h2><Trans i18nKey="impressum.represented_by"/></h2>
                        <p><Trans i18nKey="impressum.udo_finkbeiner"/></p>
                        <br />
                        <h2><Trans i18nKey="impressum.contact"/></h2>
                        <p><Trans i18nKey="impressum.telephone"/>: +49 (0) 6776 9591000
                            <br />Telefax: +49(0)3221 108991715
                            <br />E-Mail: <a href="mailto:sales@resigo.com">sales@resigo.com</a></p>
                        <br />
                        <h2><Trans i18nKey="impressum.register_entry"/></h2>
                        <p><Trans i18nKey="impressum.entry_in_the_commercial_register"/></p>
                        <p><Trans i18nKey="impressum.registering_court_amtsgericht_koblenz"/>
                            <br /><Trans i18nKey="impressum.registration_number"/> 4816</p>
                        <br />
                        <h2><Trans i18nKey="impressum.vat"/></h2>
                        <p><Trans i18nKey="impressum.vat_id_number_according_to_sec"/>
                            <br />DE167129943</p>
                        <br />
                        <h2><Trans i18nKey="impressum.dispute_resolution"/></h2>
                        <p><Trans i18nKey="impressum.the_european_commission_provides_a_platform_for_online_dispute_resolution"/><a href="https://ec.europa.eu/consumers/odr">https://ec.europa.eu/consumers/odr</a>.
                        </p>
                        <p><Trans i18nKey="impressum.please_find_our_email_in_the_impressum"/></p>
                        <br />
                        <p><Trans i18nKey="impressum.we_do_not_take_part_in_online_dispute_resolution_at_consumer_arbitration_boards"/></p>
                        <br />
                        <h3><Trans i18nKey="impressum.liability_for_contents"/></h3>
                        <p><Trans i18nKey="impressum.liability_for_contents_description"/></p>
                        <p><Trans i18nKey="impressum.liability_for_contents_description1"/></p>
                        <br />
                        <h3><Trans i18nKey="impressum.liability_for_links"/></h3>
                        <p><Trans i18nKey="impressum.liability_for_links_description"/></p>
                        <p><Trans i18nKey="impressum.liability_for_links_description1"/></p>
                        <br />
                        <h3><Trans i18nKey="impressum.copyright"/>Copyright</h3>
                        <p><Trans i18nKey="impressum.copyright_description"/></p>
                        <p><Trans i18nKey="impressum.copyright_description1"/></p>
                        <p><Trans i18nKey="impressum.copyright_description2"/></p>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

export default withTranslation()(Page)
