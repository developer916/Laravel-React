import React, { Component } from "react"
import PropTypes from "prop-types"
import {
    Container,Row, Col,
    Card, CardBody, CardHeader,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';

import i18n from "../../../../i18n";
import Navigation from '../../../../common/navigation'

import {Trans , withTranslation } from "react-i18next";
import _ from 'lodash';

const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';

class Page extends Component {
    static displayName = "Privacy"
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className="public-event-view">
                    <Navigation/>
                    <Container  style={{paddingTop: '15px'}}>
                        <Row>
                            <Col md={12}>
                                <h2><Trans i18nKey="privacy.an_overview_of_data_protection"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.general"/></h3>
                                <br/>
                                <p><Trans i18nKey="privacy.general_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.data_collection_on_our_website"/></h3>
                                <br />
                                <h4><Trans i18nKey="privacy.who_is_responsible_for_the_data_collection_on_this_website"/></h4>
                                <p><Trans i18nKey="privacy.who_is_responsible_for_the_data_collection_on_this_website_description"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.how_do_we_collect_your_data"/></h4>
                                <p><Trans i18nKey="privacy.how_do_we_collect_your_data_description"/></p>
                                <p><Trans i18nKey="privacy.how_do_we_collect_your_data_description1"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.what_do_we_use_your_data_for"/></h4>
                                <p><Trans i18nKey="privacy.what_do_we_use_your_data_for_description"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.what_rights_do_you_have_regarding_your_data"/></h4>
                                <p><Trans i18nKey="privacy.what_rights_do_you_have_regarding_your_data_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.analytics_and_third_party_tools"/></h3>
                                <p><Trans i18nKey="privacy.analytics_and_third_party_tools_description"/></p>
                                <p><Trans i18nKey="privacy.analytics_and_third_party_tools_description1"/></p>
                                <br />
                                <h2><Trans i18nKey="privacy.general_information_and_mandatory_information"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.data_protection"/></h3>
                                <p><Trans i18nKey="privacy.data_protection_description"/></p>
                                <p><Trans i18nKey="privacy.data_protection_description1"/></p>
                                <p><Trans i18nKey="privacy.data_protection_description2"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.notice_concerning_the_party_responsible_for_this_website"/></h3>
                                <p><Trans i18nKey="privacy.the_party_responsible_for_processing_data_on_this_website_is"/></p>
                                <p><Trans i18nKey="privacy.posbill_gmbh"/>
                                    <br /><Trans i18nKey="privacy.brunnengasse_4"/>
                                    <br /><Trans i18nKey="privacy.56355_kehlbach_deutschland"/></p>
                                <p><Trans i18nKey="privacy.telephone"/>: +49 (0) 6776 9591000
                                    <br />Email: <a href="mailto:sales@resigo.com">sales@resigo.com</a></p>
                                <p><Trans i18nKey="privacy.the_responsible_party_is_the_natural_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.revocation_of_your_consent_to_the_processing_of_your_data"/></h3>
                                <p><Trans i18nKey="privacy.revocation_of_your_consent_to_the_processing_of_your_data_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.right_to_file_complaints_with_regulatory_authorities"/></h3>
                                <p><Trans i18nKey="privacy.right_to_file_complaints_with_regulatory_authorities_description"/><a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.
                                </p>
                                <br />
                                <h3><Trans i18nKey="privacy.rights_to_data_portability"/></h3>
                                <p><Trans i18nKey="privacy.rights_to_data_portability_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.SSL_or_TLS_encryption"/></h3>
                                <p><Trans i18nKey="privacy.SSL_or_TLS_encryption_description"/></p>
                                <p><Trans i18nKey="privacy.SSL_or_TLS_encryption_description1"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.encrypted_payments_on_this_website"/></h3>
                                <p><Trans i18nKey="privacy.encrypted_payments_on_this_website_description"/></p>
                                <p><Trans i18nKey="privacy.encrypted_payments_on_this_website_description1"/></p>
                                <p><Trans i18nKey="privacy.encrypted_payments_on_this_website_description2"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.information_blocking_deletion"/></h3>
                                <p><Trans i18nKey="privacy.information_blocking_deletion_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.opposition_to_promotional_emails"/></h3>
                                <p><Trans i18nKey="privacy.opposition_to_promotional_emails_description"/></p>
                                <br />
                                <h2><Trans i18nKey="privacy.data_protection_officer"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.statutory_data_protection_officer"/></h3>
                                <p><Trans i18nKey="privacy.statutory_data_protection_officer_description"/></p>
                                <p>Lars Querbach
                                    <br />Das LohnTEAM GmbH
                                    <br />Karl-Tesche-Straße 1
                                    <br />56073 Koblenz</p>
                                <p><Trans i18nKey="privacy.telephone"/>: +49 261 293 586-0
                                    <br />Email: <a href="mailto:datenschutz@lohnteam.de">datenschutz@lohnteam.de</a></p>
                                <br />
                                <h2><Trans i18nKey="privacy.4_data_collection_on_our_website"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.cookies"/></h3>
                                <p><Trans i18nKey="privacy.cookies_description"/></p>
                                <p><Trans i18nKey="privacy.cookies_description1"/></p>
                                <p><Trans i18nKey="privacy.cookies_description2"/></p>
                                <p><Trans i18nKey="privacy.cookies_description3"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.server_log_files"/></h3>
                                <p><Trans i18nKey="privacy.server_log_files_description"/></p>
                                <ul>
                                    <li><Trans i18nKey="privacy.server_log_files_description_li1"/></li>
                                    <li><Trans i18nKey="privacy.server_log_files_description_li2"/></li>
                                    <li><Trans i18nKey="privacy.server_log_files_description_li3"/></li>
                                    <li><Trans i18nKey="privacy.server_log_files_description_li4"/></li>
                                    <li><Trans i18nKey="privacy.server_log_files_description_li5"/></li>
                                    <li><Trans i18nKey="privacy.server_log_files_description_li6"/></li>
                                </ul>
                                <p><Trans i18nKey="privacy.server_log_files_description1"/></p>
                                <p><Trans i18nKey="privacy.server_log_files_description2"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.server_log_files_description1"/></h3>
                                <p><Trans i18nKey="privacy.server_log_files_description1"/></p>
                                <p><Trans i18nKey="privacy.server_log_files_description1"/></p>
                                <p><Trans i18nKey="privacy.server_log_files_description1"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.registration_on_this_website"/></h3>
                                <p><Trans i18nKey="privacy.registration_on_this_website_description"/></p>
                                <p><Trans i18nKey="privacy.registration_on_this_website_description1"/></p>
                                <p><Trans i18nKey="privacy.registration_on_this_website_description2"/></p>
                                <p><Trans i18nKey="privacy.registration_on_this_website_description3"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.leaving_comments_on_this_website"/></h3>
                                <p><Trans i18nKey="privacy.leaving_comments_on_this_website_description"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.storage_of_the_IP_address"/></h4>
                                <p><Trans i18nKey="privacy.storage_of_the_IP_address_description"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.how_long_comments_are_stored"/></h4>
                                <p><Trans i18nKey="privacy.how_long_comments_are_stored_description"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.legal_basis"/></h4>
                                <p><Trans i18nKey="privacy.legal_basis_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.data_transmitted_when_entering_into_a_contract_with_online_shops_retailers_and_mail_order"/></h3>
                                <p><Trans i18nKey="privacy.data_transmitted_when_entering_into_a_contract_with_online_shops_retailers_and_mail_order_description"/></p>
                                <p><Trans i18nKey="privacy.data_transmitted_when_entering_into_a_contract_with_online_shops_retailers_and_mail_order_description1"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.data_transferred_when_signing_up_for_services_and_digital_content"/></h3>
                                <p><Trans i18nKey="privacy.data_transferred_when_signing_up_for_services_and_digital_content_description"/></p>
                                <p><Trans i18nKey="privacy.data_transferred_when_signing_up_for_services_and_digital_content_description1"/></p>
                                <p><Trans i18nKey="privacy.data_transferred_when_signing_up_for_services_and_digital_content_description2"/></p>
                                <br />
                                <h2><Trans i18nKey="privacy.social_media"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.share_content_via_plugins_facebook_google_twitter"/></h3>
                                <p><Trans i18nKey="privacy.share_content_via_plugins_facebook_google_twitter_description"/></p>
                                <p><Trans i18nKey="privacy.share_content_via_plugins_facebook_google_twitter_description1"/></p>
                                <p><Trans i18nKey="privacy.share_content_via_plugins_facebook_google_twitter_description2"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.facebook_plugins"/></h3>
                                <p><Trans i18nKey="privacy.facebook_plugins_description"/><a href="https://developers.facebook.com/docs/plugins/">https://developers.facebook.com/docs/plugins/</a>. </p>
                                <p><Trans i18nKey="privacy.facebook_plugins_description1"/><a href="https://de-de.facebook.com/policy.php">https://de-de.facebook.com/policy.php</a>.</p>
                                <p><Trans i18nKey="privacy.facebook_plugins_description2"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.twitter_plugin"/></h3>
                                <p><Trans i18nKey="privacy.twitter_plugin_description"/><a href="https://twitter.com/privacy">https://twitter.com/privacy</a>.</p>
                                <p><Trans i18nKey="privacy.twitter_plugin_description1"/><a href="https://twitter.com/account/settings">https://twitter.com/account/settings</a>.</p>
                                <br />
                                <h2><Trans i18nKey="privacy.analytics_and_advertising"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.google_analytics"/></h3>
                                <p><Trans i18nKey="privacy.google_analytics_description"/></p>
                                <p><Trans i18nKey="privacy.google_analytics_description1"/></p>
                                <p><Trans i18nKey="privacy.google_analytics_description2"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.IP_anonymization"/></h4>
                                <p><Trans i18nKey="privacy.IP_anonymization_description"/></p>
                                <br />
                                <h4><Trans i18nKey="privacy.browser_plugin"/></h4>
                                <p><Trans i18nKey="privacy.browser_plugin_description"/>
                                    {(() => {
                                        if(getCurrentLng() == 'gm') {
                                            return(
                                                <a href="https://tools.google.com/dlpage/gaoptout?hl=de">https://tools.google.com/dlpage/gaoptout?hl=de</a>
                                            )
                                        } else {
                                            return (
                                                <a href="https://tools.google.com/dlpage/gaoptout?hl=en">https://tools.google.com/dlpage/gaoptout?hl=en</a>
                                            )
                                        }
                                    })()}
                                </p>
                                <br />
                                <h4><Trans i18nKey="privacy.objecting_to_the_collection_of_data"/></h4>
                                <p><Trans i18nKey="privacy.objecting_to_the_collection_of_data_description"/></p>
                                <p><Trans i18nKey="privacy.objecting_to_the_collection_of_data_description1"/>
                                    {(() => {
                                        if(getCurrentLng() == 'gm') {
                                            return(
                                                <a href="https://support.google.com/analytics/answer/6004245?hl=de">https://support.google.com/analytics/answer/6004245?hl=de </a>
                                            )
                                        } else {
                                            return(
                                                <a href="https://support.google.com/analytics/answer/6004245?hl=en">https://support.google.com/analytics/answer/6004245?hl=en </a>
                                            );
                                        }
                                    })()}
                                </p>
                                <br />
                                <h4><Trans i18nKey="privacy.outsourced_data_processing"/></h4>
                                <p><Trans i18nKey="privacy.outsourced_data_processing_description"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.google_analytics_remarketing"/></h3>
                                <p><Trans i18nKey="privacy.google_analytics_remarketing_description"/></p>
                                <p><Trans i18nKey="privacy.google_analytics_remarketing_description1"/></p>
                                <p><Trans i18nKey="privacy.google_analytics_remarketing_description2"/></p>
                                <p><Trans i18nKey="privacy.google_analytics_remarketing_description3"/></p>
                                <p><Trans i18nKey="privacy.google_analytics_remarketing_description4"/><a href="https://www.google.com/settings/ads/onweb/">https://www.google.com/settings/ads/onweb/</a></p>
                                <p><Trans i18nKey="privacy.google_analytics_remarketing_description5"/></p>
                                <p><Trans i18nKey="privacy.google_analytics_remarketing_description6"/><a href="https://www.google.com/policies/technologies/ads/">https://www.google.com/policies/technologies/ads/</a>.
                                </p>
                                <br />
                                <h3><Trans i18nKey="privacy.google_adWords_and_google_conversion_tracking"/></h3>
                                <p><Trans i18nKey="privacy.google_adWords_and_google_conversion_tracking_description"/></p>
                                <p><Trans i18nKey="privacy.google_adWords_and_google_conversion_tracking_description1"/></p>
                                <p><Trans i18nKey="privacy.google_adWords_and_google_conversion_tracking_description2"/></p>
                                <p><Trans i18nKey="privacy.google_adWords_and_google_conversion_tracking_description3"/></p>
                                <p><Trans i18nKey="privacy.google_adWords_and_google_conversion_tracking_description4"/><a href="https://www.google.de/policies/privacy/">https://www.google.de/policies/privacy/</a>.</p>
                                <p><Trans i18nKey="privacy.google_adWords_and_google_conversion_tracking_description5"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.google_reCAPTCHA"/></h3>
                                <p><Trans i18nKey="privacy.google_reCAPTCHA_description"/></p>
                                <p><Trans i18nKey="privacy.google_reCAPTCHA_description1"/></p>
                                <p><Trans i18nKey="privacy.google_reCAPTCHA_description2"/></p>
                                <p><Trans i18nKey="privacy.google_reCAPTCHA_description3"/></p>
                                <p><Trans i18nKey="privacy.google_reCAPTCHA_description4"/><a href="https://www.google.com/intl/de/policies/privacy/">https://www.google.com/intl/de/policies/privacy/</a> <Trans i18nKey="privacy.google_reCAPTCHA_description5"/> <a href="https://www.google.com/recaptcha/intro/android.html">https://www.google.com/recaptcha/intro/android.html</a>.</p>
                                <br />
                                <h3><Trans i18nKey="privacy.facebook_pixel"/></h3>
                                <p><Trans i18nKey="privacy.facebook_pixel_description"/></p>
                                <p><Trans i18nKey="privacy.facebook_pixel_description1"/></p>
                                <p><Trans i18nKey="privacy.facebook_pixel_description2"/></p>
                                <p><Trans i18nKey="privacy.facebook_pixel_description3"/><a href="https://www.facebook.com/about/privacy/">https://www.facebook.com/about/privacy/</a>.</p>
                                <p><Trans i18nKey="privacy.facebook_pixel_description4"/><a href="https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen">https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen</a>.
                                    <Trans i18nKey="privacy.facebook_pixel_description5"/></p>
                                <p><Trans i18nKey="privacy.facebook_pixel_description6"/><a href="http://www.youronlinechoices.com/de/praferenzmanagement/">http://www.youronlinechoices.com/de/praferenzmanagement/</a>.
                                </p>
                                <br />
                                <h2><Trans i18nKey="privacy.newsletter"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.newsletter_data"/></h3>
                                <p><Trans i18nKey="privacy.newsletter_data_description"/></p>
                                <p><Trans i18nKey="privacy.newsletter_data_description1"/></p>
                                <p><Trans i18nKey="privacy.newsletter_data_description2"/></p>
                                <br />
                                <h3><Trans i18nKey="privacy.mailchimp"/></h3>
                                <p><Trans i18nKey="privacy.mailchimp_description"/></p>
                                <p><Trans i18nKey="privacy.mailchimp_description1"/></p>
                                <p><Trans i18nKey="privacy.mailchimp_description2"/></p>
                                <p><Trans i18nKey="privacy.mailchimp_description3"/></p>
                                <p><Trans i18nKey="privacy.mailchimp_description4"/></p>
                                <p><Trans i18nKey="privacy.mailchimp_description5"/></p>
                                <p><Trans i18nKey="privacy.mailchimp_description6"/></p>
                                <p><Trans i18nKey="privacy.mailchimp_description7"/> <a href="https://mailchimp.com/legal/terms/">https://mailchimp.com/legal/terms/</a>.</p>
                                <br />
                                <h4><Trans i18nKey="privacy.completion_of_a_data_processing_agreement"/></h4>
                                <p><Trans i18nKey="privacy.completion_of_a_data_processing_agreement_description"/> <a href="https://mailchimp.com/legal/forms/data-processing-agreement/sample-agreement/">https://mailchimp.com/legal/forms/data-processing-agreement/sample-agreement/</a>.</p>
                                <br />
                                <h2><Trans i18nKey="privacy.plugins_and_tools"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.youTube"/>YouTube</h3>
                                <p><Trans i18nKey="privacy.youtube_description"/></p>
                                <p><Trans i18nKey="privacy.youtube_description1"/></p>
                                <p><Trans i18nKey="privacy.youtube_description2"/></p>
                                <p><Trans i18nKey="privacy.youtube_description3"/></p>
                                <p><Trans i18nKey="privacy.youtube_description4"/><a href="https://www.google.de/intl/de/policies/privacy">https://www.google.de/intl/de/policies/privacy</a>.
                                </p>
                                <br />
                                <h3><Trans i18nKey="privacy.google_maps"/></h3>
                                <p><Trans i18nKey="privacy.google_maps_description"/></p>
                                <p><Trans i18nKey="privacy.google_maps_description1"/></p>
                                <p><Trans i18nKey="privacy.google_maps_description2"/></p>
                                <p><Trans i18nKey="privacy.google_maps_description3"/><a href="https://www.google.de/intl/de/policies/privacy/">https://www.google.de/intl/de/policies/privacy/</a>.
                                </p>
                                <br />
                                <h2><Trans i18nKey="privacy.payment_service_providers"/></h2>
                                <br />
                                <h3><Trans i18nKey="privacy.paypal"/></h3>
                                <p><Trans i18nKey="privacy.paypal_description"/></p>
                                <p><Trans i18nKey="privacy.paypal_description1"/></p>
                                <p><Trans i18nKey="privacy.paypal_description2"/></p>
                            </Col>
                        </Row>
                    </Container>
                </div>);
    }
}

export default withTranslation()(Page)
