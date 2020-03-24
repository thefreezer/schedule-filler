import React from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';			

class App extends React.Component {
	constructor(props){
		super(props);
	}
	
	handleClick(e) {
		e.preventDefault();
		axios.get('')
			.then(res => console.log(res));
	}

	render(){
		return(
			<Container className="p-3">
				<Jumbotron>
				<h3>Which courses do you want?</h3>

				<Form>
					<Form.Group as={Row} controlId="subject">
						<Form.Label column sm={1}>Subject</Form.Label>
						<Col sm={4}>
							<Form.Control as="select" column sm={12}>
								<option></option>
								<option>CMPUT</option>
								<option>MATH</option> // use a list
							</Form.Control>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="term">
						<Form.Label column sm={1}>Term</Form.Label>
						<Col sm={4}>
							<Form.Control as="select">
								<option></option>
								<option>Fall Term 2020</option>
								<option>Winter Term 2021</option>
							</Form.Control>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="level">
						<Form.Label column sm={1}>Level</Form.Label>
						<Col sm={4}>
							<Form.Control as="select">
								<option></option>
								<option>100</option>
								<option>200</option>
								<option>300</option>
								<option>400</option>
							</Form.Control>
						</Col>
					</Form.Group>

					<Button onClick={this.handleClick} variant="primary" type="submit">Submit</Button>

				</Form>

				</Jumbotron>
			</Container>
		);
	}

}

export default App;                        
