import React from "react";
import { DockerRemoteFormData } from '../../types/DockerTypes';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import DockerRemoteForm from "../DockerRemoteForm/DockerRemoteForm";

interface Props {
    onFetch: (d: DockerRemoteFormData) => Promise<void>
}

function MainNavbar(props: Props) {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Whale watch</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <DockerRemoteForm onFetch={props.onFetch}></DockerRemoteForm>
                </Nav>
                <Button variant="outline-light"><i className="fa fa-github"></i></Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainNavbar;