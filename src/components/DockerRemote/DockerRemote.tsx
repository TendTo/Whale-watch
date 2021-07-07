import React from "react";
import { DockerRemoteFormData } from '../../types/DockerTypes';
import Card from "react-bootstrap/Card";
import './DockerRemote.css'

interface Props {
    data: Map<string, DockerRemoteFormData>
}

/**
 * Shows some minimal informations to check if the .pem file provided by the user is correct
 * @param value value among the .pem files provided by the user
 * @returns first 7 letters used to identify the .pem file
 */
function showPem(value: string) {
    const lines = value.split("\n");
    if (lines.length < 2) {
        return value;
    }
    return lines[1].slice(0, 7);
}

function DockerRemote(props: Props) {
    const dockerRemotes = Array.from(props.data, ([key, value]) => (
        <Card bg="dark" key={key} border="primary" className="mb-3">
            <Card.Header><h5>{`${value.host}:${value.port}`}</h5></Card.Header>
            <Card.Body>
                <Card.Text>
                    Host: <b>{value.host}</b><br></br>
                    Port: <b>{value.port}</b><br></br>
                    {value.ca && (<>Certificate Authority: <b>{showPem(value.ca)}</b><br></br></>)}
                    {value.cert && (<>Certificate: <b>{showPem(value.cert)}</b><br></br></>)}
                    {value.key && (<>Key: <b>{showPem(value.key)}</b><br></br></>)}
                </Card.Text>
            </Card.Body>
        </Card>
    ));

    return (
        <div className="DockerRemote-CardDeck">
            {dockerRemotes}
        </div>
    );
}

export default DockerRemote;