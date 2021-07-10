import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
import DockerRemoteForm from "../DockerRemoteForm/DockerRemoteForm";

function MainNavbar() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand><Link className="navbar-brand" to="/">Whale watch</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <DockerRemoteForm></DockerRemoteForm>
                </Nav>
                <Button href="https://github.com/TendTo/Whale-watch" variant="outline-light"><i className="fa fa-github"></i></Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainNavbar;