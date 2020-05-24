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
		<div>
			<Container>
				<Row>
					<Col className="main">
						<h1>
							<span>Schedule Filler </span>
							is a <span>web-based</span> tool that helps you
							save time by finding courses at the <span className = "text-color">University of Alberta </span> 
							which works with your schedule
						</h1>
						<a href="#term-select" className="down-button" variant="primary"></a>
					</Col>	
				</Row>
				<Row id="term-select">
					<Col className="section animated fade-in delay" data-animation-in="fade-in">
						<h2>
							Let's start with the course term
						</h2>
						<Row className = "term-input">
							<h5>Term</h5>
							<InputGroup className='mt-5' >
								<FormControl className = 'text-centered'
									placeholder="Enter the course term?"
									aria-label="nter the course term?"
									aria-describedby="basic-addon1"
								/>
							<h5>Year</h5>
							</InputGroup>
							<InputGroup className='mt-5' >
								<FormControl className = 'text-centered'
									placeholder="Enter the term year?"
									aria-label="Enter the term year?"
									aria-describedby="basic-addon1"
								/>
							</InputGroup>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col className="section-time animated fade-in delay" data-animation-in="fade-in">
						<h2>
							Now it's time to select a start time for the course you're looking for
						</h2>

						<MDBCol className = "time-input text-centered"> 
        					<MDBTimePicker id="timePicker " label='12hrs format' getValue={this.getPickerValue} />
      					</MDBCol>
						
					</Col>

				</Row>

				<Row>
					<Col className="section animated fade-in delay" data-animation-in="fade-in" data-animation-out="fade-out delay">
						<h2>
							The following course is/is not being offered at:
						</h2>
					</Col>	
				</Row>
	
				{/* <div className = "main">
					<div className = "banner-text">
						<h1>Welcome to the</h1>
						<h1> U of A </h1>
						<h1>Schedule Filler App </h1>
					</div>
				</div> */}
				{/* <div className = "section-container">
					<Container className="p-3">
						<Jumbotron className ='mx-auto'>
						<h3>Which courses do you want?</h3>
					
						<Form onSubmit={this.handleSubmit}>
							<Form.Group as={Row} controlId="term">
								<Form.Label column sm={1}>Term</Form.Label>
								<Col sm={4}>
									<Form.Control as="select" column sm={12} name="term" onChange={this.handleInputChange}>
									<option></option>
							{terms}
									</Form.Control>
								</Col>
							</Form.Group>
						
							<Form.Group as={Row} controlId="start_time">
								<Form.Label column sm={1}>From</Form.Label>
								<Col sm={2}>
							<Form.Control type="time" name="start_time" onChange={this.handleInputChange}/>
								</Col>
							</Form.Group>
						
						<Form.Group as={Row} controlId="end_time">
						<Form.Label column sm={1}>To</Form.Label>
								<Col sm={2}>
							<Form.Control type="time" name="end_time" onChange={this.handleInputChange}/>
								</Col>
						</Form.Group>         
						
							<Form.Group as={Row} controlId="course_name">
								<Form.Label column sm={1}>Course Name</Form.Label>
								<Col sm={4}>
									<Form.Control as="select" name="course_id" onChange={this.handleInputChange}>
									<option></option>
							{courses}
									</Form.Control>
								</Col>
							</Form.Group>
						
							<Button variant="primary" type="submit">Submit</Button>
						
						</Form>
					
						</Jumbotron>
					</Container>
				</div> */}
			</Container>

		</div>
	  );
  }
  
}

export default App;                        
