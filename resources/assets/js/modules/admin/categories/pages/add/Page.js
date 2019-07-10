import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import { Redirect } from 'react-router-dom'
import { addCategory } from '../../service';

// import components
import Form from './components/Form'

class Page extends Component {
    static displayName = 'CreateCategory'
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)

        this.validator = new ReeValidate({
            name: 'required'
        })
        const category = this.props.category.toJson()
        this.state = {
            category,
            toCategory: false,
            errors: this.validator.errors
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(name, value) {
        const { errors } = this.validator
        this.setState({ category: { ...this.state.category, [name]: value} })

        errors.remove(name)

        this.validator.validate(name, value)
        .then(() => {
            this.setState({ errors })
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const { errors } = this.validator
        const category = this.state.category

        this.validator.validateAll(category)
        .then((success) => {
            if (success) {
                this.submit(category)
            } else {
                this.setState({ errors })
            }
        })
    }

    submit(category) {
        this.props.dispatch(addCategory(category))
            .then(res => {
                if (res.status == 'success') {
                    this.setState({toCategory: true});
                }
            })
            .catch(({ error, statusCode }) => {
                const { errors } = this.validator
                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                }

                this.setState({ errors })
            })
    }
    
    render() {
        if(this.state.toCategory){
            return (<Redirect to="/super/categories" />);
        }
        return <div className="animated fadeIn">
            <Form {...this.state}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}/>
        </div>
    }
}

export default Page

