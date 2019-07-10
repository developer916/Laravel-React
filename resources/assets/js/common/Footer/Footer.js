import React, {Component} from 'react';
import {Trans, withTranslation } from 'react-i18next';
import {Redirect} from 'react-router-dom'
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectPath: ''
        }
    }
  render() {
    if(this.state.redirectPath !=''){
        return <Redirect to={this.state.redirectPath} />
    }
    return (
      <footer className="app-footer">
        {/*<span style={{marginRight: 20}}><a href="javascript:void(0)" onClick={() => this.onSetPath("privacy")}><Trans i18nKey="footer.privacy"/></a></span>*/}
        {/*<span style={{marginRight: 20}}><a href="javascript:void(0)" onClick={() => this.onSetPath("terms_of_conditions")}><Trans i18nKey="footer.terms_of_conditions"/></a></span>*/}
        {/*<span><a href="javascript:void(0)" onClick={() => this.onSetPath("about_us")}><Trans i18nKey="footer.about_us"/></a></span>*/}
          <span style={{marginRight: 20}}><a href="/privacy"><Trans i18nKey="footer.privacy"/></a></span>
          <span style={{marginRight: 20}}><a href="/terms_of_conditions" onClick={() => this.onSetPath("terms_of_conditions")}><Trans i18nKey="footer.terms_of_conditions"/></a></span>
          <span><a href="/impressum"><Trans i18nKey="footer.about_us"/></a></span>
      </footer>
    )
  }

  onSetPath(path){
      this.setState({
        redirectPath : path
      });
  }
}

export default withTranslation()(Footer);
