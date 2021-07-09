import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import DockerApi from "../../api/DockerApi";
import { ContainerInfo, ContainerInspectInfo, ImageInfo, ImageInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast from "../Toast/Toast";
import './DockerContainers.css';
import { AccordionContext } from "react-bootstrap";

interface Props {
    eventKey: string
    data: DockerRemoteData
}

function sizeConverter(size: number) {
    const dimensions = ['B', 'KB', 'MB', 'GB', 'TB'];
    for (let dimension of dimensions) {
        if (size / 1000 < 1)
            return `${size.toFixed(2)} ${dimension}`;
        else
            size /= 1000;
    }
    return `${size.toFixed(2)} TB`;
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

function DockerContainers({ data, eventKey }: Props) {
    const currentEventKey = useContext(AccordionContext);
    const [loading, setLoading] = useState(false);
    const [containerLs, setContainerLs] = useState<ContainerInfo[]>();
    const [containerDetails, setContainerDetails] = useState<ContainerInspectInfo>();
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);

    const onError = () => toast("An error has occurred\nCheck the console to know more", { contentClassName: "text-danger" })

    const startContainerLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            dockerApi.containerLs().then(setContainerLs).catch(e => console.error(e));
        }
    }

    const containersElements = containerLs?.map(container => {
        const onRun = () => {
            dockerApi.containerRun(container)
                .then(() => startContainerLs(true))
                .then(() => toast("A new container has started running"))
                .catch(e => console.error(e))
                .catch(onError);
        }
        const onInspect = () => {
            dockerApi.containerInspect(container)
                .then(setContainerDetails)
                .catch(e => console.error(e))
                .catch(onError);
        }
        const onRestart = () => {
            dockerApi.containerRestart(container)
                .then(() => startContainerLs(true))
                .then(() => toast("The container has been restarted"))
                .catch(e => console.error(e))
                .catch(onError);
        }
        const onStop = () => {
            dockerApi.containerStop(container)
                .then(() => startContainerLs(true))
                .then(() => toast("The container has been stopped"))
                .catch(e => console.error(e))
                .catch(onError);
        }
        const onDelete = () => {
            dockerApi.containerRm(container)
                .then(() => startContainerLs(true))
                .then(() => toast("The container has been deleted"))
                .catch(e => console.error(e))
                .catch(onError);
        }

        return (
            <tr>
                <td>{container.Names.map(e=> e.slice(1, e.length))}</td>
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
                <Accordion.Toggle as={Card.Header} eventKey={eventKey} onClick={() => startContainerLs() }>
                    Containers
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
                    <Modal.Title>{containerDetails?.Name} details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        <code>
                            {detailsConverter(containerDetails)}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default DockerContainers;