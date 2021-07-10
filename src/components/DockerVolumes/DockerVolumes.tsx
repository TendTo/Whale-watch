import React, { useContext, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { VolumeInspectInfo, VolumeList } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast from "../Toast/Toast";
import './DockerVolumes.css';

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

function detailsConverter(imageDetails: VolumeInspectInfo | undefined) {
    if (imageDetails === undefined)
        return ""
    return JSON.stringify(imageDetails, null, 4);
}

function DockerVolumes({ data, eventKey }: Props) {
    const currentEventKey = useContext(AccordionContext);
    const [loading, setLoading] = useState(false);
    const [volumeLs, setVolumeLs] = useState<VolumeList>();
    const [volumeDetails, setVolumeDetails] = useState<VolumeInspectInfo>();
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);


    const fetchVolumeLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            dockerApi.volumeLs().then(setVolumeLs).catch(onError);
        }
    }

    const imageElements = volumeLs?.Volumes.map((volume, idx) => {
        const onInspect = () => {
            dockerApi.volumeInpect(volume)
                .then((details) => setVolumeDetails(details))
                .catch(onError);
        }
        const onDelete = () => {
            dockerApi.volumeRm(volume)
                .then(() => fetchVolumeLs(true))
                .then(() => toast("The volume has been deleted"))
                .catch(onError);
        }

        return (
            <tr key={idx}>
                <td className="DockerVolumes-name">{volume.Name}</td>
                <td>{volume.Driver}</td>
                <td className="DockerVolumes-name">{volume.Mountpoint}</td>
                <td className="DockerVolumes-actions" >
                    <Button variant="info lg" onClick={onInspect}>
                        <i className="fa fa-eye"></i>
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
                <Accordion.Toggle as={Card.Header} eventKey={eventKey} onClick={() => fetchVolumeLs()}>
                    <h5>Volumes</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        {loading && <Spinner animation="border" size="sm" />}
                        {!loading && volumeLs === undefined && <p>No images found</p>}
                        {!loading && volumeLs && (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Driver</th>
                                        <th scope="col">Mountpoint</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {imageElements}
                                </tbody>
                            </table>)}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Modal dialogClassName="modal-lg" show={volumeDetails !== undefined} onHide={() => setVolumeDetails(undefined)}>
                <Modal.Header closeButton>
                    <Modal.Title>{volumeDetails?.Name} details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        <code>
                            {detailsConverter(volumeDetails)}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default DockerVolumes;