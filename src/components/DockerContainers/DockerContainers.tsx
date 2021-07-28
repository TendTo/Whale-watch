import React, { useContext, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { ContainerInfo, ContainerInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import { requestErrorToast } from "../Toast/Toast";
import DockerContainer from "./DockerContainer";
import './DockerContainers.css';

interface Props {
    eventKey: string
    data: DockerRemoteData
}

function detailsConverter(containerDetails: ContainerInspectInfo | undefined) {
    if (containerDetails === undefined)
        return ""
    return JSON.stringify(containerDetails, null, 4);
}

function logsConverter(logs: string | undefined) {
    if (logs === undefined)
        return ""
    return logs.split("\n")
        .map(e => ({ header: Buffer.from(e.slice(0, 8)), text: e }))
        .filter(({ header, text }) => header[0] !== 0)
        .map(({ header, text }, idx) =>
            <p key={idx} className={`DockerContainers-logs ${header[0] === 2 ? "text-danger" : ""}`}>{header[0] === 1 || header[0] === 2 ? text.slice(8) : text}</p>
        )
}

function DockerContainers({ data, eventKey }: Props) {
    const currentEventKey = useContext(AccordionContext);
    const [loading, setLoading] = useState(false);
    const [containerLs, setContainerLs] = useState<ContainerInfo[]>();
    const [containerDetails, setContainerDetails] = useState<ContainerInspectInfo>();
    const [containerLogs, setContainerLogs] = useState<{ name: string, logs: string }>();

    const fetchContainerLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            dockerApi.containerLs().then(setContainerLs).catch(requestErrorToast);
        }
    }

    const containersElements = containerLs?.map((container, idx) =>
        <DockerContainer key={idx}
            container={container}
            data={data}
            fetchContainerLs={fetchContainerLs}
            setContainerDetails={setContainerDetails}
            setContainerLogs={setContainerLogs}
        ></DockerContainer>
    );

    return (
        <>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={eventKey} onClick={() => fetchContainerLs()}>
                    <h5>Containers</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        {loading && <Spinner animation="border" size="sm" />}
                        {!loading && containerLs === undefined && <p>No containers found</p>}
                        {!loading && containerLs && (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image Tag</th>
                                        <th scope="col">Created</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {containersElements}
                                </tbody>
                            </table>)}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Modal dialogClassName="modal-lg" show={containerDetails !== undefined} onHide={() => setContainerDetails(undefined)}>
                <Modal.Header closeButton>
                    <Modal.Title>{containerDetails?.Name.slice(1)} details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        <code>
                            {detailsConverter(containerDetails)}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal >
            <Modal dialogClassName="modal-lg" show={containerLogs !== undefined} onHide={() => setContainerLogs(undefined)}>
                <Modal.Header closeButton>
                    <Modal.Title>{containerLogs?.name.slice(1)} logs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        <code>
                            {logsConverter(containerLogs?.logs)}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default DockerContainers;