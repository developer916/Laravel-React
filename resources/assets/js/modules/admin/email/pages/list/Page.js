import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from 'react-router-dom'
import {
    Button,
    Card, CardHeader, CardBody,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import {
    BootstrapTable, TableHeaderColumn
} from 'react-bootstrap-table';

class Page extends Component {
    static displayName = 'SuperLicenses'
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        licenses: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {/*<a href="https://www.screencast.com/t/tqqMDMFIni6z"> https://www.screencast.com/t/tqqMDMFIni6z</a>*/}
                {/*<p>*/}
                {/*    Please check above link ..*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    As you can see , freelancer team said i have to finish this project , and then freelancer team will review my account .*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    My account are getting restrict from this site .*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    So i want to finish this project in the freelancer and want to discuss about the project in the skype or slack or email ..*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    This is my email address : forestfuture89@gmail.com,  skype id is forest.future89*/}
                {/*</p>*/}
                {/*<p>*/}

                {/*    Also i want you don't said about that in the freelancer team ..*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    If you said about that , and then my account will  die forever.*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    I hope you understand me and help me ..*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    Thanks ..*/}
                {/*</p>*/}

                <p>I think I have made my point clear, we dont want any communication outside of freelancers for this project. We would like to complete the product successfully, that is our highest priority.
                  If we want to contact you after the project, then we now have your contact details.</p>


                <h1>Answer</h1>
                <p>I understand you . </p>
                <p>As you know, I have 3750$ to be paid for this project when I finish it .
                    I think you are worried about the project after contract is ended in the freelancer , because some developers often disappear</p>
                <p>But no worry about me. As you can see, I have many reviews in the freelancer and is making good result for you.
                    This is team account .
                    So if I disappear, you can dispute in the freelancer.</p>
                <p>My freelancer account is team account . so many developers have to get project in the freelancer . but our account is getting restriction now .</p>
                <p>After contract is ended  , Freelance team said they would review my account . </p>
                <p>So I hope you understand me .. No worry about the project. I will complete this project perfectly. Also when we use skype, this is good also</p>
                <p>This is very important thing for our team and me . </p>
                <p>Please help me . Thanks</p>
            </div>
        );
    }
}

export default (Page)
