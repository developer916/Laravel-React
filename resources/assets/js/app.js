/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

/**
 * Next, we will create a fresh React application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, {Suspense} from "react"
import {render} from "react-dom"
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import {authCheck, uuidCheck} from './modules/auth/store/actions'
import {loadCalendarList} from "./modules/calendar/store/actions";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

store.dispatch(uuidCheck());
store.dispatch(authCheck());
store.dispatch(loadCalendarList());

render(
    (<I18nextProvider i18n={i18n}>
        <Suspense fallback="loading">
            <Provider store={store}>
              <Routes/>
            </Provider>
        </Suspense>
    </I18nextProvider>),
  document.getElementById('root')
);
