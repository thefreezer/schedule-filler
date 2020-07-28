import moment from 'moment';
import React from 'react';
import axios from 'axios';
import {Typeahead} from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import './App.css';
import course from "./data/course.json";

const terms = ["Fall","Winter","Spring","Summer"];
const date = new Date().getFullYear();
const years = [String(date), String(date + 1)];
const now = moment().hour(0).minute(0);
const format = 'h:mm a';

class InputSection extends React.Component{
  constructor(props){
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(e){
    this.props.onChange(e);
  }
  
  handleClick(e) {
	  this.props.onClick(e);
  }

  render(){

    return(
      <div>
        <section className = "main-1">	
					<h1>
						<span>Schedule Filler </span>
						is a <span>web-based</span> tool that helps you
						save time by finding courses at the <span className = "text-color">University of Alberta </span> 
						which works with your schedule
					</h1>
						<a href="#term" className="down-button" variant="primary">Down</a>
				</section>


			<section className = "term-select animated fade-in delay" data-animation-in="fade-in" id = "term">
				<div className='course-term'>
					<h2>
						Lets start by searching for the course you are planning on taking
						<Typeahead className="mt-5 mx-5 px-5"
						{...this.course}
            id="selected_course"
            onChange={this.handleInputChange}
						options={course}
						placeholder="Enter the course id"
						aria-label="Enter the course term?"
						aria-describedby="basic-addon1"/>
					</h2>
				</div>

			</section> 

				<section className = "term-select animated fade-in delay text-centered" data-animation-in="fade-in" >
						<h2>
							What term does this course works for you best
							<Typeahead className="mt-5 mx-5 px-5"
							{...this.terms}
              id="selected_term"
							onChange={this.handleInputChange}
							options={terms}
							placeholder="Enter the course term?"
							aria-label="Enter the course term?"
							aria-describedby="basic-addon1"/>
						</h2>		


					<div className='course-term1'>
						<h2>
							And the Year 
							<Typeahead className="mt-5 mx-5 px-5"
							{...this.years}
              id="selected_year"
							onChange={this.handleInputChange}
							options={years}
							placeholder="Enter the year the course will be taken?"
							aria-label="Enter the year the course will be taken?"
							aria-describedby="basic-addon1"/>
						</h2>
					</div>
	
				</section>


			<section className = "term-final animated fade-in delay"  data-animation-in="fade-in">
				<h2>
					Lastly, We'll need to know what time you want to take this course
					<div className = "course-term2">
            <Col lg={{span:4, offset:4}} md={{span:4, offset:4}}>
              <Form.Control
                type="time"
                name="start_time"
                onChange={this.handleInputChange}
              />
            </Col>
            <div className = "result-button">
							<Button
                type="submit"
                onClick={this.handleClick}
                variant="outline-info">
                Get Results
              </Button>
						</div>
					</div>
				</h2>
			</section>
      </div>
    );
  }
}

class ResultSection extends React.Component{
  render(){

    let res_header = "No courses match your criteria"
    const courses = [];
    if(this.props.data.length > 0){
      this.props.data.forEach(course =>{
        // TODO: Styling
        // TODO: pagination for long results
        courses.push(<p>{course.Course_code} {course.Course_start}-{course.Course_end}</p>)
      })
      if(this.props.data.length > 2)
        res_header = "The following courses match your criteria"
      else
        res_header ="The following course match your criteria"
    }

    return(
      <section className = "result_section animated fade-in delay "  data-animation-in="fade-in">
        <h2>{res_header}</h2>
        {courses}
      </section>
    );
  }
}

class App extends React.Component {
  constructor(props){
	  super(props);
    this.state = {
      courses_data: [],
      selected_term: 'all',
      selected_year: 'all',
      selected_course: 'all',
      selected_time: 'all',
    }
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(e){
    // since Typehead only returns the value
    // and not an event, we are forced to
    // use if statements to determine which state changes
    if(e.target == undefined){
      const value = e[0]
      if(terms.includes(value))
        this.setState({selected_term:value})
      else if(years.includes(value))
        this.setState({selected_year:value})
      else
        this.setState({selected_course:value})
    }
    else{
      this.setState({selected_time:e.target.value})
    }
    //TODO: handle case where user leaves blank
    // state value should be set to 'all'
  }
  
  handleClick(e) {
	  e.preventDefault();
	  console.log(this.state);
    
    axios.post('api/backend.php', this.state)
	    .then(res => {
        console.log(res.data);
        this.setState({courses_data:res.data})
      });
  }
    
  render(){
	  return(
	    <div>
        <InputSection
          onClick={this.handleClick}
          onChange={this.handleInputChange}
        />
        <ResultSection data={this.state.courses_data}/>
      </div>	  
	  );
  }
}

export default App;                        
