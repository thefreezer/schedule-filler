import 'rc-time-picker/assets/index.css';

import React from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import courses_data from './data/courses.json';
import terms_data from './data/terms.json';

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
	    <Container className="p-3">
		    <Jumbotron>
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
	  );
  }
  
}

export default App;                        
