import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditEmpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps:[],
            snackbarOpen:false,
            snackbarmsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = () => {
        this.setState({
            snackbarOpen:false
        });
    }

    componentDidMount() {
        fetch('http://localhost:52342/api/department').then(response => response.json())
        .then(data => {
            this.setState({
                deps:data
            })
        })
    }

    handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:52342/api/employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: e.target.EmployeeID.value,
                EmployeeName: e.target.EmployeeName.value,
                Department: e.target.Department.value,
                MailID: e.target.MailID.value,
                DOJ: e.target.DOJ.value
            })
        })
            .then(res => res.json())
            .then((result)=> {
                this.setState({
                    snackbarOpen:true,
                    snackbarmsg: result
                });
            },
            (error)=>{
                this.setState({
                    snackbarOpen:true,
                    snackbarmsg: 'Failed!'
                });
            })

        
    }

    render() {
        return (
            <div className="container">
                <Snackbar
                anchorOrigin={{vertical:'center', horizontal: 'center'}}
                open={this.state.snackbarOpen}
                autoHideDuration={2000}
                onClose={this.snackbarClose}
                message={<span id="message-id">{this.state.snackbarmsg}</span>}
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
                        x
                    </IconButton>
                ]}
                />
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                    <Form.Label>
                                        Employee ID
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="EmployeeID"
                                        required
                                        disabled
                                        defaultValue={this.props.empid}
                                        placeholder="EmployeeID"
                                    />
                                </Form.Group>

                                <Form.Group controlId="EmployeeName">
                                    <Form.Label>
                                        Employee Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="EmployeeName"
                                        required
                                        defaultValue={this.props.empname}
                                        placeholder="EmployeeName"
                                    />
                                </Form.Group>

                                <Form.Group controlId="Department">
                                    <Form.Label>
                                        Department
                                    </Form.Label>
                                    <Form.Control as="select" defaultValue={this.props.depmt}>
                                        {this.state.deps.map(dep =>
                                            <option key={dep.DepartmentID}>
                                                {dep.DepartmentName}
                                            </option>
                                            )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="MailID">
                                    <Form.Label>
                                        Mail ID
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="MailID"
                                        required
                                        placeholder="MailID"
                                        defaultValue={this.props.mailid}
                                    />
                                </Form.Group>

                                <Form.Group controlId="DOJ">
                                    <Form.Label>
                                        DOJ
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="DOJ"
                                        required
                                        placeholder="DOJ"
                                        defaultValue={this.props.doj}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit" className="mt-2">
                                        Update
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>
        )
    }
}