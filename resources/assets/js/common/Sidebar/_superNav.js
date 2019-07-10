import React from 'react'
import {Trans, useTranslation, withTranslation} from 'react-i18next';
export default {
  items: [
    {
      name: <Trans i18nKey="menu.dashboard"/>,
      url: '/super/dashboard',
      icon: 'icon-home'
    },
    {
      name: <Trans i18nKey="menu.analytics"/>,
      url: '/super/analytics',
      icon: 'icon-speedometer',
    },
    {
      name: <Trans i18nKey="menu.company_management"/>,
      url: '/super/companies',
      icon: 'icon-grid'
    },
    {
      name: <Trans i18nKey="menu.license_management"/>,
      url: '/super/licenses',
      icon: 'icon-cursor'
    },
      {
        name: <Trans i18nKey="menu.user_management"/>,
        url : '/super/users',
        icon: 'fa fa-users'
      },
    {
        name: <Trans i18nKey="menu.password_management"/>,
        url: '/super/password',
        icon: 'fa fa-user'
    },
    {
        name: <Trans i18nKey="menu.maintenance_management"/>,
        url : '/super/maintenance',
        icon : 'fa fa-comments-o'
    },
  ]
};
