import React, { useContext, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { ImageInfo, ImageInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast, { requestErrorToast } from "../Toast/Toast";
import DockerImage from "./DockerImage";
import './DockerImages.css';

interface Props {
    layout: 'vertical' | 'horizontal'
    eventKey: string
    data: DockerRemoteData
}

function detailsConverter(imageDetails: ImageInspectInfo | undefined) {
    if (imageDetails === undefined)
        return ""
    return JSON.stringify(imageDetails, null, 4);
}

function DockerImages({ data, eventKey, layout }: Props) {
    const currentEventKey = useContext(AccordionContext);

    const [loading, setLoading] = useState(false);
    const [imageLs, setImageLs] = useState<ImageInfo[]>();
    const [imageDetails, setImageDetails] = useState<ImageInspectInfo>();
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);

    const fetchImageLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            dockerApi.imageLs().then(setImageLs).catch(requestErrorToast);
        }
    }
    const onPull = () => {
        const input = (document.getElementById('dockerImages.tag') as HTMLInputElement);
        const inputValue = input?.value;

        if (inputValue === undefined || inputValue === null || inputValue.length === 0 || inputValue.startsWith(":"))
            return toast("You must specify an image name to pull", { contentClassName: "text-danger" })

        input.value = "";
        dockerApi.imageCreate(inputValue)
            .then(() => toast("A new images is being pulled.\nIt may take a while before it shows here"))
            .catch(requestErrorToast);
    }

    const imageElements = imageLs?.map((image, idx) =>
        <DockerImage key={idx}
            data={data}
            image={image}
            fetchImageLs={fetchImageLs}
            setImageDetails={setImageDetails}
            layout={layout}
        ></DockerImage>
    );

    return (
        <>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={eventKey} onClick={() => fetchImageLs()}>
                    <h5>Images</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group className="DockerImages-form" controlId="dockerImages.tag">
                            <Form.Label className="DockerImages-required-label"><b>Pull image</b></Form.Label>
                            <Form.Control placeholder="tag:latest" required />
                            <Button variant="primary" onClick={onPull}>
                                <i className="fa fa-download"></i>
                            </Button>
                        </Form.Group>
                        {loading && <Spinner animation="border" size="sm" />}
                        {!loading && imageLs === undefined && <p>No images found</p>}
                        {!loading && imageLs && (
                            <table className="table table-hover">
                                {layout === "horizontal" &&
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image ID</th>
                                            <th scope="col">Created</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                }
                                <tbody>
                                    {imageElements}
                                </tbody>
                            </table>
                        )}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Modal dialogClassName="modal-lg" show={imageDetails !== undefined} onHide={() => setImageDetails(undefined)}>
                <Modal.Header closeButton>
                    <Modal.Title>{imageDetails?.RepoTags} details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        <code>
                            {detailsConverter(imageDetails)}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default DockerImages;