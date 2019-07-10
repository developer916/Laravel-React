import React, {Component} from "react"
import PropTypes from "prop-types"
import ReeValidate from 'ree-validate'
import Form from './components/Form'
import {create} from "../../service"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { getCategories } from '../../../public/service';

class Page extends Component {
  static displayName = "CalendarNewPage";

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.validator = new ReeValidate({
      name: 'required',
      description: 'required'
    });

    this.state = {
      calendar: {
        name: '',
        description: '',
        is_private: false,
        is_email_necessary: false,
        is_offline: false,
        background: '',
        categories : []
      },
      errors: this.validator.errors,
      toCalendars: false,
      getError: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getCategories({}));
  }


  handleMultiSelectChange(value){
    console.log("value", value);
    let category =  [];
    for(var i = 0; i < value.length; i++){
      category.push(value[i].value);
    }
    console.log("category", category);
    this.setState({calendar: {...this.state.calendar, ['category'] : category}});
  }


  handleChange(name, value) {
    const {errors} = this.validator;

    this.setState({calendar: {...this.state.calendar, [name]: value}});

    errors.remove(name);

    if (name === 'name' || name === 'background' || name === 'description') {
      this.validator.validate(name, value)
        .then(() => {
          this.setState({errors})
        })
    }
  }


  handleSubmit(e) {
    e.preventDefault()
    const {calendar} = this.state;
    const {errors} = this.validator;

    this.validator.validateAll(calendar)
      .then((success) => {
        if (success) {
          this.submit(calendar);
        } else {
          this.setState({errors})
        }
      })
  }

  submit(calendar) {
    calendar['company_id'] = this.props.companyId;

    this.props.dispatch(create(calendar))
      .then(res => {
        if (res.status == 'success') {
          this.setState({toCalendars: true});
        } else {
          this.setState({getError: true});
        }
      })
      .catch(({error, statusCode}) => {
        const {errors} = this.validator;

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        } else if (statusCode === 401) {
          errors.add('name', error);
        }

        this.setState({errors})
      })
  }

  render() {
    if (this.state.toCalendars) {
      return <Redirect to='/calendars' />
    }
    const {categories} = this.props;
    let categoriesData = [];
    if(categories.length >0){
        for(var i=0; i< categories.length; i++){
          let obj = { value: categories[i].id, label: categories[i].name };
          categoriesData.push(obj);
        }
    }


    const props = {
      name: this.state.calendar.name,
      description: this.state.calendar.description,
      is_private: this.state.calendar.is_private,
      is_email_necessary: this.state.calendar.is_email_necessary,
      is_offline: this.state.calendar.is_offline,
      errors: this.state.errors,
      categories: categoriesData,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      handleMultiSelectChange : this.handleMultiSelectChange,
      getError : this.state.getError,
    };

    return (
      <div className="animated fadeIn">
        <Form {...props} />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    companyId: state.auth.companyId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Page)
