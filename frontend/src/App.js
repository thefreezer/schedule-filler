import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import React from 'react';
import axios from 'axios';
import {Typeahead} from 'react-bootstrap-typeahead';
import TimePicker from 'rc-time-picker';
import Button from 'react-bootstrap/Button'

import './App.css';
import course from "./data/course.json";



		
const terms = ["Fall","Winter","Spring","Summer"];
const date = new Date().getFullYear();
const years = [String(date), String(date + 1)];
const now = moment().hour(0).minute(0);
const format = 'h:mm a';

function onChange(value) {
	console.log(value && value.format(format));
  }
  console.log(onChange)

class App extends React.Component {
  constructor(props){
	  super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleSubmit(e) {
	  e.preventDefault();
	console.log(this.state);

    // LOCALHOST for now
    // will most likely switch to a POST req
    // api/term/course_id/start_time/end_time
    const url = 'http://localhost:8000/api/'+this.state.term+'/'+this.state.course_id+'/'+this.state.start_time+'/'+this.state.end_time
    
    axios.get(url)
	    .then(res => console.log(res));
  }
  
  
  
  render(){
    
	  return(
		<div id="wrapper">
			<main className= "main">
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
						onChange={selected => this.setState({selected})}
						options={course}
						placeholder="Enter the course term?"
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
							onChange={selected_term => this.setState({selected_term})}
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
							onChange={selected_year => this.setState({selected_year})}
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
						<TimePicker className="mt-5 mx-1 px-5"
						showSecond={false}
						defaultValue={now}
						onChange={selected_time => this.setState({selected_time})}
						format={format}
						use12Hours
						inputReadOnly
					/>
						<div className = "result-button">
							<Button variant="outline-info">Get Results</Button>{' '}
						</div>
					
					</div>
				</h2>
			</section>
			<section className = "term-select animated fade-in delay"  data-animation-in="fade-in">
				<h2>
				The following course is/is not being offered at:
				</h2>

			</section>
			</main>
		</div>
	  );
  }
}

export default App;                        
