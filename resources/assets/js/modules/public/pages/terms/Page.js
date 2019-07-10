import React, { Component } from "react"
import PropTypes from "prop-types"
import {
    Container,Row, Col,
    Card, CardBody, CardHeader,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';


import Navigation from '../../../../common/navigation'

import {Trans , withTranslation } from "react-i18next";
import _ from 'lodash';


class Page extends Component {
    static displayName = "TermsOfConditions"
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className="public-event-view">
            <Navigation/>
            <Container  style={{paddingTop: '15px'}}>
                <Row>
                    <Col md={12}>
                        <h2><b><Trans i18nKey="terms.terms_and_conditions_posBill_calout"/></b></h2>
                        <br />
                        <h3><Trans i18nKey="terms.validity_of_the_general_terms_and_conditions"/></h3>
                        <p><Trans i18nKey="terms.validity_of_the_general_terms_and_conditions1"/></p>
                        <p><Trans i18nKey="terms.validity_of_the_general_terms_and_conditions2"/></p>
                        <p><Trans i18nKey="terms.validity_of_the_general_terms_and_conditions3"/></p>
                        <p><Trans i18nKey="terms.validity_of_the_general_terms_and_conditions4"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.performances_of_posBill_calout"/></h3>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout1"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout1a"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout1b"/> („<b>Widgets</b>“),</p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout1b1"/><a href="https://calout.posbill.com" target="_blank">https://calout.posbill.com</a>.
                            <Trans i18nKey="terms.performances_of_posBill_calout1b2"/></p>

                        <p><Trans i18nKey="terms.performances_of_posBill_calout2"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout3"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout4"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout4a"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout4b"/></p>
                        <p> <Trans i18nKey="terms.performances_of_posBill_calout5"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout6"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout7"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout8"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout8a"/></p>
                        <p><Trans i18nKey="terms.performances_of_posBill_calout8b"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.remuneration_and_late_payment"/></h3>
                        <p><Trans i18nKey="terms.remuneration_and_late_payment1"/></p>
                        <p><Trans i18nKey="terms.remuneration_and_late_payment2"/></p>
                        <p><Trans i18nKey="terms.remuneration_and_late_payment2a"/></p>
                        <p><Trans i18nKey="terms.remuneration_and_late_payment3"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider"/></h3>
                        <p><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider1"/></p>
                        <p><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider2"/></p>
                        <p><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider3"/></p>
                        <p><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider4"/></p>
                        <p><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider5"/>
                            <span style={{color: 'black'}}><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider5a"/></span>
                        </p>
                        <p><Trans i18nKey="terms.obligations_and_obligations_of_the_service_provider6"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.customer_data_and_data_protection"/></h3>
                        <p><Trans i18nKey="terms.customer_data_and_data_protection1"/></p>
                        <p><Trans i18nKey="terms.customer_data_and_data_protection2"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.claims_for_defects"/></h3>
                        <p><Trans i18nKey="terms.claims_for_defects1"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.indemnification_of_the_service_provider"/></h3>

                        <p><Trans i18nKey="terms.indemnification_of_the_service_provider1"/></p>

                        <p><Trans i18nKey="terms.indemnification_of_the_service_provider2"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.limitation_of_liability"/></h3>
                        <p><Trans i18nKey="terms.limitation_of_liability1"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.runtime_and_termination"/></h3>
                        <p><Trans i18nKey="terms.runtime_and_termination1"/></p>

                        <p><Trans i18nKey="terms.runtime_and_termination2"/><a href="mailto:sales@resigo.com"><b>sales@resigo.com</b></a> <Trans i18nKey="terms.runtime_and_termination2a"/></p>

                        <p><Trans i18nKey="terms.runtime_and_termination3"/> </p>

                        <p><Trans i18nKey="terms.runtime_and_termination4"/></p>
                        <br />
                        <h3><Trans i18nKey="terms.severability_clause"/> </h3>
                        <p><Trans i18nKey="terms.severability_clause1"/></p>
                        <p><Trans i18nKey="terms.severability_clause2"/></p>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

export default withTranslation()(Page)
