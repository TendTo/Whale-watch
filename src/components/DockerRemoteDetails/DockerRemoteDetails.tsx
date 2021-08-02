import React, { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from 'react-router-dom';
import { DockerRemoteContext } from "../../context/DockerRemoteContext";
import { DockerRemoteKey } from '../../types/DockerTypes';
import { getWindowDimension } from "../../util/responsive";
import DockerContainers from "../DockerContainers/DockerContainers";
import DockerImages from "../DockerImages/DockerImages";
import DockerNetworks from "../DockerNetworks/DockerNetworks";
import DockerVolumes from "../DockerVolumes/DockerVolumes";

function DockerRemoteDetails() {
    const [dim, setDim] = useState(getWindowDimension());
    const dockerRemoteContextData = useContext(DockerRemoteContext);
    const params = useParams<DockerRemoteKey>();
    const dockerRemoteData = dockerRemoteContextData?.dockerRemotes[params.dockerRemoteKey];

    const layout = dim.width < 992 ? "vertical" : "horizontal";

    useEffect(() => {
        window.addEventListener('resize', () => setDim(getWindowDimension()));
        return () => window.removeEventListener('resize', () => setDim(getWindowDimension()));
    }, []);

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
                <DockerImages layout={layout} data={dockerRemoteData} eventKey="0" />
                <DockerContainers layout={layout} data={dockerRemoteData} eventKey="1"></DockerContainers>
                <DockerVolumes layout={layout} data={dockerRemoteData} eventKey="2"></DockerVolumes>
                <DockerNetworks layout={layout} data={dockerRemoteData} eventKey="3"></DockerNetworks>
            </Accordion>
        </>
    );
}

export default DockerRemoteDetails;