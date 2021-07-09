import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import DockerApi from "../../api/DockerApi";
import { ImageInfo, ImageInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast from "../Toast/Toast";
import './DockerImages.css';
import { AccordionContext, useAccordionToggle } from "react-bootstrap";

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

function detailsConverter(imageDetails: ImageInspectInfo | undefined) {
    if (imageDetails === undefined)
        return ""
    return JSON.stringify(imageDetails, null, 4);
}

function DockerImages({ data, eventKey }: Props) {
    const currentEventKey = useContext(AccordionContext);
    const [loading, setLoading] = useState(false);
    const [imageLs, setImageLs] = useState<ImageInfo[]>();
    const [imagesDetails, setImagesDetails] = useState<ImageInspectInfo>();
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);


    const fetchImageLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            dockerApi.imageLs().then(setImageLs).catch(e => console.error(e));
        }
    }

    const imageElements = imageLs?.map((image, idx) => {
        const onRun = () => {
            dockerApi.containerCreate(image)
                .then(() => toast("A new container has been created"))
                .catch(e => console.error(e))
                .catch(() => toast("An error has occurred", { contentClassName: "text-danger" }));
        }
        const onInspect = () => {
            dockerApi.imageInspect(image)
                .then((details) => setImagesDetails(details))
                .catch(e => console.error(e))
                .catch(() => toast("An error has occurred", { contentClassName: "text-danger" }));
        }
        const onDelete = () => {
            dockerApi.imageRm(image)
                .then(() => fetchImageLs(true))
                .then(() => toast("The image has been deleted"))
                .catch(e => console.error(e))
                .catch(() => toast("An error has occurred", { contentClassName: "text-danger" }));
        }

        return (
            <tr key={idx}>
                <td>{image.RepoTags}</td>
                <td className="DockerImages-image-id">{image.Id}</td>
                <td>{timeConverter(image.Created)}</td>
                <td>{sizeConverter(image.Size)}</td>
                <td className="DockerImages-actions" >
                    <Button variant="success lg" onClick={onRun}>
                        <i className="fa fa-play"></i>
                    </Button>
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
                <Accordion.Toggle as={Card.Header} eventKey={eventKey} onClick={() => fetchImageLs()}>
                    Images
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        {loading && <Spinner animation="border" size="sm" />}
                        {!loading && imageLs === undefined && <p>No images found</p>}
                        {!loading && imageLs && (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image ID</th>
                                        <th scope="col">Created</th>
                                        <th scope="col">Size</th>
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
            <Modal dialogClassName="modal-lg" show={imagesDetails !== undefined} onHide={() => setImagesDetails(undefined)}>
                <Modal.Header closeButton>
                    <Modal.Title>{imagesDetails?.RepoTags} details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        <code>
                            {detailsConverter(imagesDetails)}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default DockerImages;