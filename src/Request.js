import React from 'react';
import './Request.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {datas:[], 
                  acknowledged:false,
                  firstName:'',
                  lastName:'',
                  email:'',
                  service_type:'Select Service Type',
                  description:'Add description of request',
                  showModal: false,
                  modalResponse:''
                  
    };


  }
  componentDidMount() {
        fetch('http://localhost:49567/api/service-types')
        .then(res => res.json())
        .then((data) => {
          this.setState({ datas: data.data })
        })
        .catch();
  }
  handleSubmit(event){ 
    event.preventDefault();
    fetch('http://localhost:49567/api/assistance-requests', {
      method: 'post',
      headers: {'Content-Type':'application/json',
                'Accept':'application/json',
                'Cache-Control':'no-cache',
                Host: 'localhost:49567'},
      body:JSON.stringify({
                "assistance_request": {
                  "contact": {
                    "first_name": this.state.firstName,
                    "last_name": this.state.lastName,
                    "email": this.state.email
                  },
                  "service_type": this.state.service_type,
                  "description": this.state.description
                }
              })
            
    }).then(response=>{
      if(response.ok){
        return response.json();
      }
      else{
        throw response;
      }
    }).then(data=>{
      console.log(data);
      this.modalResponse=data.message;
      this.open();
    }).catch(error=>{
      this.modalResponse = error.status + ': '+ error.statusText +". Service request denied"
      this.open();
      console.log(error);
    });
    
  };
  close() {
    this.setState({ showModal: false });
  };

  open() {
    this.setState({ showModal: true });
  };
  handleChange(event) {
    this.setState({
        [event.target.id]: event.target.value
    });
  };
  handleCheck() {
    this.setState({acknowledged: !this.state.acknowledged});
  };
  render () {
    return (
      <div className="requestForm">
        <h1>New Assistance Request</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Control required type="firstName" placeholder="First Name" 
            value={this.state.firstName}
            onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Control required type="lastName" placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control required type="email" placeholder="name@example.com" 
            value={this.state.email} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="service_type">
            <Form.Control as="select" required 
            value={this.state.service_type} onChange={this.handleChange}>
              <option value=''>Select Service Type</option>
              {this.state.datas.map((service) => (
                <option key={service.id} value={service.display_name}>{service.display_name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Control as="textarea" rows="3" 
            value={this.state.description} onChange={this.handleChange}/>
          </Form.Group>

          <div>
            <Form.Check onClick={this.handleCheck} type="checkbox" label="I hereby accept the terms of service for THE NETWORK and the privacy policy"/>

          </div>
          {this.state.acknowledged ? (
            <Button variant="primary" size="lg" type="submit">
              Submit
            </Button>) : (
              <Button variant="primary" size="lg" type="submit" disabled>
              Submit
            </Button>
          )}


        </Form>
        <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Response</h4>
              <p>{this.modalResponse}</p>              

              <hr />

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
      </div>
          
    );
  }
}

export default App;
