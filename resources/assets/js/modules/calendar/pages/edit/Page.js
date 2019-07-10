import React, {Component} from "react"
import PropTypes from "prop-types"
import ReeValidate from 'ree-validate'
import Form from './components/Form'
import {create} from "../../service"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import _ from 'lodash';
import { getCategories } from '../../../public/service';
import { getCalendar } from '../../service';

class Page extends Component {
  static displayName = "CalendarNewPage";

  static propTypes = {
    match: PropTypes.object.isRequired,
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
        name: this.props.selectedCalendar.name,
        description: this.props.selectedCalendar.description,
        is_private: this.props.selectedCalendar.public === "true",
        is_email_necessary: this.props.selectedCalendar.not  === "true",
        is_offline: this.props.selectedCalendar.status  === "true",
        background: '',
        picture: this.props.selectedCalendar.picture,
        id: this.props.selectedCalendar.id,
        category : []
      },
      selectedOptions: null,
      errors: this.validator.errors,
      toCalendars: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
  }

  componentDidMount(){
      const {dispatch, match} = this.props;
      let params = {
          calendar_id: match.params.id
      }
      dispatch(getCategories({}));

      this.props.dispatch(getCalendar(params))
        .then(res => {
            console.log("props_calendar", this.props.selectedCalendar);
            const calendarCategories = res.calendarCategories;
            let options = [];
            const {categories} = this.props;

            if(calendarCategories.length >0){
                for(var i=0; i<calendarCategories.length; i++){
                    for(var j=0; j< categories.length; j++){
                        if(categories[j].id == calendarCategories[i].categoryId){
                            options.push({ value: categories[j].id, label: categories[j].name })
                        }
                    }
                }
                this.setState({
                    selectedOptions: options
                })
            }
            this.setState({
                calendar: {
                    name : this.props.selectedCalendar.name,
                    description: this.props.selectedCalendar.description,
                    is_private: this.props.selectedCalendar.public === "true",
                    is_email_necessary: this.props.selectedCalendar.not  === "true",
                    is_offline: this.props.selectedCalendar.status  === "true",
                    background: '',
                    picture: this.props.selectedCalendar.picture,
                    id: this.props.selectedCalendar.id
                },
            });

        }).catch(err => {
        console.log(err);
      });


  }

  handleMultiSelectChange(value){
      let category =  [];
      for(var i = 0; i < value.length; i++){
          category.push(value[i].value);
      }
      this.setState({calendar: {...this.state.calendar, ['category'] : category}, selectedOptions: value});
  }


  handleChange(name, value) {
    const {errors} = this.validator;

    this.setState({calendar: {...this.state.calendar, [name]: value}});

    errors.remove(name);

    if (name === 'name' || name === 'description') {
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
    calendar['calendar_id'] = this.props.selectedCalendar.id;
    this.props.dispatch(create(calendar))
      .then(res => {
        if (res.status == 'success') {
          this.setState({toCalendars: true});
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

    // if(_.isEmpty(this.props.selectedCalendar)){
    //     return <Redirect to='/calendars' />
    // }

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
      categories: categoriesData,
      handleMultiSelectChange : this.handleMultiSelectChange,
      selectedOption : this.state.selectedOptions,
      errors: this.state.errors,
      picture: this.state.calendar.picture,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    };

    return (
      <div className="animated fadeIn">
        <Form {...props} />
      </div>
    )
  }
}





export default Page
