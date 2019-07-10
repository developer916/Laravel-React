import i18n from 'i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // fallbackLng: 'en',
        fallbackLng: 'gm',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        react:{
            wait : true,
        }
    });

// i18n.use(Backend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({}, () => {
//         i18n.t('common.logout'); // -> ok
//         i18n.t('header.calendars');
//         i18n.language = 'en'; // -> ok
//
//         // withTranslation()(function () {
//         //     return <Trans i18nKey='common.logout'/>; // -> ok as Suspended
//         // });
//     });


export default i18n;
