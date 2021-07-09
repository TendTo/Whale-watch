import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams } from 'react-router-dom';
import { DockerRemoteContext } from "../../context/DockerRemoteContext";
import { DockerRemoteKey } from '../../types/DockerTypes';
import DockerImages from "../DockerImages/DockerImages";
import DockerContainers from "../DockerContainers/DockerContainers";

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

function DockerRemoteDetails() {
    const dockerRemoteContextData = useContext(DockerRemoteContext);
    const params = useParams<DockerRemoteKey>();
    const dockerRemoteData = dockerRemoteContextData?.dockerRemotes[params.dockerRemoteKey];

    if (dockerRemoteData === undefined) {
        return (
            <>
                <h3>ERROR 404</h3>
                <p>The Docker remote you specified was not found</p>
            </>
        )
    }

    return (
        <Accordion defaultActiveKey="0">
            <DockerImages data={dockerRemoteData} eventKey="0"/>
            <DockerContainers data={dockerRemoteData} eventKey="1"></DockerContainers>
        </Accordion>
    );
}

export default DockerRemoteDetails;