import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams } from 'react-router-dom';
import { DockerRemoteContext } from "../../context/DockerRemoteContext";
import { DockerRemoteKey } from '../../types/DockerTypes';
import DockerImages from "../DockerImages/DockerImages";
import DockerContainers from "../DockerContainers/DockerContainers";
import DockerVolumes from "../DockerVolumes/DockerVolumes";
import DockerNetworks from "../DockerNetworks/DockerNetworks";

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
        <>
        <h4>{`${dockerRemoteData.host}:${dockerRemoteData.port}`}</h4>
            <Accordion >
                <DockerImages data={dockerRemoteData} eventKey="0" />
                <DockerContainers data={dockerRemoteData} eventKey="1"></DockerContainers>
                <DockerVolumes data={dockerRemoteData} eventKey="2"></DockerVolumes>
                <DockerNetworks data={dockerRemoteData} eventKey="3"></DockerNetworks>
            </Accordion>
        </>
    );
}

export default DockerRemoteDetails;