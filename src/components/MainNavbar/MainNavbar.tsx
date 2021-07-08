import React from "react";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import DockerRemoteForm from "../DockerRemoteForm/DockerRemoteForm";

function MainNavbar() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Whale watch</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <DockerRemoteForm></DockerRemoteForm>
                </Nav>
                <Button variant="outline-light"><i className="fa fa-github"></i></Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainNavbar;