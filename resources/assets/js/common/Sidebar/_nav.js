import React from 'react'
import {Trans, useTranslation, withTranslation} from 'react-i18next';
export default {
  items: [
    {
      name: <Trans i18nKey="menu.dashboard"/>,
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: <Trans i18nKey="menu.calendars"/>,
      url: '/calendars',
      icon: 'icon-calendar'
    },
    {
      name: <Trans i18nKey="menu.events"/>,
      url: '/events',
      icon: 'icon-magic-wand'
    },
    {
      name: <Trans i18nKey="menu.subscribers"/>,
      url: '/subscribers',
      icon: 'icon-people'
    },
    {
      name: <Trans i18nKey="menu.geolocation_world_map"/>,
      url: '/world-map',
      icon: 'icon-map'
    },
    {
      name: <Trans i18nKey="menu.time_period_calendars"/>,
      url: '/timeperiod',
      icon: 'icon-chart'
    },
    {
      name: <Trans i18nKey="menu.users"/>,
      url: '/users' ,
      icon : 'fa fa-users'
    },
    {
      name: <Trans i18nKey="menu.settings"/>,
      url: '/settings',
      icon: 'icon-settings',
        children: [
          {
              name: <Trans i18nKey="menu.password_management"/>,
              url: '/settings/password',
              icon: 'fa fa-user'
          },
          {
              name: <Trans i18nKey="menu.company_address"/>,
              url: '/settings/address',
              icon: 'fa fa-address-card-o'
          },
          {
              name: <Trans i18nKey="menu.company_sepa"/>,
              url: '/settings/sepa',
              icon: 'fa fa-list'
          },
          {
              name: <Trans i18nKey="menu.smtp_setting"/>,
              url: '/settings/smtp',
              icon: 'fa fa-file'
          },
        ]
    },
  ]
};
