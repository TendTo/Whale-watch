import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
import { DockerRemoteContext } from "../../context/DockerRemoteContext";
import { DockerRemoteData } from '../../types/DockerTypes';
import './DockerRemoteList.css';

/**
 * Shows some minimal informations to check if the .pem file provided by the user is correct
 * @param value value among the .pem files provided by the user
 * @returns first 7 letters used to identify the .pem file
 */
function showPem(value: string) {
    const lines = value.split("\n");
    if (lines.length < 2) {
        return value.slice(0, 7);
    }
    return lines[1].slice(0, 7);
}

function DockerRemoteList() {
    const dockerRemoteContextData = useContext(DockerRemoteContext);

    let dockerRemoteData: [string, DockerRemoteData][] = [];
    if (dockerRemoteContextData !== null)
        dockerRemoteData = Object.entries(dockerRemoteContextData.dockerRemotes);

    const dockerRemotes = dockerRemoteData.map(e => {
        const [key, value] = e;
        return (
            <Card bg="dark" key={key} border="primary" className="mb-3">
                <Card.Header><h5>{`${value.host}:${value.port}`}</h5></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Row>
                            <Col xs={9}>
                                Host: <b>{value.host}</b><br></br>
                                Port: <b>{value.port}</b><br></br>
                                {value.ca && (<>Certificate Authority: <b>{showPem(value.ca)}</b><br></br></>)}
                                {value.cert && (<>Certificate: <b>{showPem(value.cert)}</b><br></br></>)}
                                {value.key && (<>Key: <b>{showPem(value.key)}</b><br></br></>)}
                            </Col>
                            <Col className="DockerRemoteList-buttons" xs={2}>
                                <Link to={key}>
                                    <Button variant="primary lg">
                                        <i className="fa fa-eye"></i>
                                    </Button>
                                </Link>
                                <Button variant="danger lg" onClick={() => dockerRemoteContextData?.removeDockerRemote(key)}>
                                    <i className="fa fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    });

    return (
        <>
            {dockerRemotes && (
                <div className="DockerRemoteList-CardDeck">
                    {dockerRemotes}
                </div>
            )}
            {dockerRemotes.length === 0 && (
                <p>
                    No remote Docker instances found :(
                </p>
            )}
        </>

    );
}

export default DockerRemoteList;