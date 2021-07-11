import React, { useContext, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { ContainerInfo, ContainerInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast from "../Toast/Toast";
import './DockerContainers.css';

interface Props {
    eventKey: string
    data: DockerRemoteData
}

function onError(e: Error) {
    console.error(e);
    let errorMessage = "An error has occurred.";
    switch (e.message.slice(0, 3)) {
        case "403":
            errorMessage = "Forbidden operation."
            break;
        case "404":
            errorMessage = "Resource not found."
            break;
        case "409":
            errorMessage = "A conflict has emerged."
            break;
    }
    toast(`${errorMessage}\nCheck the logs to know more`, { contentClassName: "text-danger" });
}

function timeConverter(unixTime: number) {
    const a = new Date(unixTime * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
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
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);

    const fetchContainerLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            dockerApi.containerLs().then(setContainerLs).catch(onError);
        }
    }

    const containersElements = containerLs?.map((container, idx) => {
        const onRun = () => {
            dockerApi.containerRun(container)
                .then(() => fetchContainerLs(true))
                .then(() => toast("A new container has started running"))
                .catch(onError);
        }
        const onInspect = () => {
            dockerApi.containerInspect(container)
                .then(setContainerDetails)
                .catch(onError);
        }
        const onLogs = () => {
            dockerApi.containerLogs(container)
                .then((logs) => setContainerLogs({ name: container.Names ? container.Names[0] : container.Id, logs: logs }))
                .catch(onError);
        }
        const onRestart = () => {
            dockerApi.containerRestart(container)
                .then(() => fetchContainerLs(true))
                .then(() => toast("The container has been restarted"))
                .catch(onError);
        }
        const onStop = () => {
            dockerApi.containerStop(container)
                .then(() => fetchContainerLs(true))
                .then(() => toast("The container has been stopped"))
                .catch(onError);
        }
        const onDelete = () => {
            dockerApi.containerRm(container)
                .then(() => fetchContainerLs(true))
                .then(() => toast("The container has been deleted"))
                .catch(onError);
        }

        return (
            <tr key={idx}>
                <td>{container.Names.map(e => e.slice(1))}</td>
                <td>{container.Image}</td>
                <td>{timeConverter(container.Created)}</td>
                <td>{container.Status}</td>
                <td className="DockerContainers-actions" >
                    <Button variant="success lg" onClick={onRun}>
                        <i className="fa fa-play"></i>
                    </Button>
                    <Button variant="info lg" onClick={onInspect}>
                        <i className="fa fa-eye"></i>
                    </Button>
                    <Button variant="light lg" onClick={onLogs}>
                        <i className="fa fa-file-text-o"></i>
                    </Button>
                    <Button variant="primary lg" onClick={onRestart}>
                        <i className="fa fa-refresh"></i>
                    </Button>
                    <Button variant="warning lg" onClick={onStop}>
                        <i className="fa fa-stop"></i>
                    </Button>
                    <Button variant="danger lg" onClick={onDelete}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </td>
            </tr>
        );
    });

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