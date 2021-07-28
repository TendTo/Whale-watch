import React, { useContext, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { VolumeInspectInfo, VolumeList } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import { requestErrorToast } from "../Toast/Toast";
import DockerVolume from "./DockerVolume";
import './DockerVolumes.css';

interface Props {
    eventKey: string
    data: DockerRemoteData
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

    const fetchVolumeLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            dockerApi.volumeLs().then(setVolumeLs).catch(requestErrorToast);
        }
    }

    const imageElements = volumeLs?.Volumes.map((volume, idx) =>
        <DockerVolume key={idx}
            volume={volume}
            data={data}
            fetchVolumeLs={fetchVolumeLs}
            setVolumeDetails={setVolumeDetails}
        ></DockerVolume>
    );

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