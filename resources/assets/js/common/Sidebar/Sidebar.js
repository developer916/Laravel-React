import React, {Component} from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
// import nav from './_nav';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';
import {Trans, useTranslation, withTranslation} from 'react-i18next';

class Sidebar extends Component {
  static propTypes = {
    license: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    // this.activeRoute = this.activeRoute.bind(this);
    // this.hideMobile = this.hideMobile.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.license)
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  // activeRoute(routeName, props) {
  //   // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  //   return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  //
  // }
  //
  // hideMobile() {
  //   if (document.body.classList.contains('sidebar-mobile-show')) {
  //     document.body.classList.toggle('sidebar-mobile-show')
  //   }
  // }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }


  render() {
    const {license} = this.props
    const items =  [
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
      ];

    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames( badge.class );
        return (<Badge className={ classes } color={ badge.variant }>{ badge.text }</Badge>)
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)): item.name ) };

    // nav list section title
    const title =  (title, key) => {
      const classes = classNames( 'nav-title', title.class);
      return (<li key={key} className={ classes }>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => {
      const classes = classNames( 'divider', divider.class);
      return (<li key={key} className={ classes }></li>);
    };

    // nav label with nav link
    const navLabel = (item, key) => {
      const classes = {
        item: classNames( 'hidden-cn', item.class ),
        link: classNames( 'nav-label', item.class ? item.class : ''),
        icon: classNames(
          !item.icon ? 'fa fa-circle' : item.icon ,
          item.label.variant ? `text-${item.label.variant}` : '',
          item.label.class ?  item.label.class : ''
        )
      };
      return (
        navLink(item, key, classes)
      );
    };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames( item.class) ,
        link: classNames( 'nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: classNames( item.icon )
      };
      return (
        navLink(item, key, classes)
      )
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      let lStyle = {}

      if (item.name === 'Subscription Generator') {
        if (_.isEmpty(license)) {
          lStyle = {
            display: 'none'
          }
        } else {
          if (license.enabledFunction === 'off') {
            lStyle = {
              display: 'none'
            }
          }
        }
      }
      if(this.props.role != "company"){
        if(item.name == "Subscribers" || item.name == "Geolocation / World Map" || item.name == "Time Period / Calendars" || item.name == "Users" || item.name == "Company Address" || item.name == "Company Sepa" || item.name == "SMTP Setting"){
            lStyle = {
                display: 'none'
            }
        }
      }


      return (
        <NavItem key={key} className={classes.item} style={lStyle}>
          { isExternal(url) ?
            <RsNavLink href={url} className={classes.link} active>
              <i className={classes.icon}></i>{item.name}{badge(item.badge)}
            </RsNavLink>
            :
            <NavLink to={url} className={classes.link} activeClassName="active">
              <i className={classes.icon}></i>{item.name}{badge(item.badge)}
            </NavLink>
          }
        </NavItem>
      )
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i className={item.icon}></i>{item.name}</a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>)
    };

    // nav type
    const navType = (item, idx) =>
      item.title ? title(item, idx) :
      item.divider ? divider(item, idx) :
      item.label ? navLabel(item, idx) :
      item.children ? navDropdown(item, idx)
                    : navItem(item, idx) ;

    // nav list
    const navList = (items) => {
      return items.map( (item, index) => navType(item, index) );
    };

    const isExternal = (url) => {
      const link = url ? url.substring(0, 4) : '';
      return link === 'http';
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader/>
        <SidebarForm/>
        <nav className="sidebar-nav">
          <Nav>
            {/*{navList(nav.items)}*/}
              { navList(items) }
          </Nav>
        </nav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </div>
    )
  }
}

export default withTranslation()(Sidebar);
