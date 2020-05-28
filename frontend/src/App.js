import 'rc-time-picker/assets/index.css';

import React from 'react';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import courses_data from './data/courses.json';
import terms_data from './data/terms.json';

import { MDBTimePicker, MDBCol } from "mdbreact";


import './App.css';			

class App extends React.Component {
  
  constructor(props){
	  super(props);
    this.state= {
      term: '',
      start_time: '',
      end_time: '',
      course_id: '',
    };

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
    const courses = courses_data.map((course) => {return (<option value={course}>{course}</option>); });
    const terms = terms_data.map((term) => {return (<option value={term.id} key={term.id}>{term.name}</option>); });
    
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
						<a href="#term-select" className="down-button" variant="primary"></a>
				</section>
				<section className = "term-select animated fade-in delay" data-animation-in="fade-in">
						<h2>
							Let's start with the course term
							<div className = "term-input">
								<h5>Term
									<InputGroup className='mt-3' >
									<FormControl className = 'text-centered'
										placeholder="Enter the course term?"
										aria-label="nter the course term?"
										aria-describedby="basic-addon1"
									/>
									Year
									</InputGroup>
									<InputGroup className='mt-3' >
										<FormControl className = 'text-centered'
											placeholder="Enter the term year?"
											aria-label="Enter the term year?"
											aria-describedby="basic-addon1"
										/>
									</InputGroup>
								</h5>
							</div>
						</h2>
				</section>
			<section className = "term-select animated fade-in delay" data-animation-in="fade-in">
				<h2> Now lets search for the course you are looking to take
					<div className = "term-input">
						<h5>Course
							<InputGroup className='mt-3' >
								<FormControl className = 'text-centered'
									placeholder="Enter the course term?"
									aria-label="nter the course term?"
									aria-describedby="basic-addon1"
								/>
							</InputGroup>
						</h5>
					</div>
				</h2>
			</section>
			<section className = "term-select animated fade-in delay"  data-animation-in="fade-in">
				<h2>
					Lastly, We'll need the start time that works for you best
					<MDBCol className = "time-input text-centered"> 
        				<MDBTimePicker id="timePicker " label='12hrs format' getValue={this.getPickerValue} />
      				</MDBCol>
					<Button variant="primary" type="submit">Submit</Button>
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
