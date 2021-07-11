import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Tooltip from "react-bootstrap/Tooltip";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import DockerApi from "../../api/DockerApi";
import { DockerRemoteContext } from '../../context/DockerRemoteContext';
import { DockerRemoteData } from '../../types/DockerTypes';
import './DockerRemoteForm.css';
import strings from './DockerRemoteForm.json';

function DockerRemoteForm() {
    const defaultData = {
        socket: "/var/run/docker.sock", port: 2375, host: strings.placeholderHost,
        ca: "",
        cert: "",
        key: ""
    };
    const infoTooltip = (
        <Tooltip id="infoTooltip">
            {strings.infoTooltip}
        </Tooltip>
    );

    const location = useLocation();
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [fail, setFail] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [useTls, setUseTls] = useState(true);
    const { register, handleSubmit, reset } = useForm({ defaultValues: defaultData });
    const dockerRemoteContext = useContext(DockerRemoteContext);
    const local = false;

    const handleOpen = () => setShow(true);
    const handleClose = () => { setSuccess(false); setFail(false); reset(defaultData); setShow(false); };

    const onTest = (data: DockerRemoteData) => {
        data.protocol = useTls ? "https" : "http";

        const onFail = () => {
            setSuccess(false);
            setFail(true);
        }

        const onSuccess = () => {
            setFail(false);
            setSuccess(true);
        }

        const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
        dockerApi.ping()
            .then((res) => res ? onSuccess() : onFail())
            .catch(onFail);
    }

    const onSubmit = (data: DockerRemoteData) => {
        data.protocol = useTls ? "https" : "http";
        dockerRemoteContext?.addDockerRemote(data);
        handleClose();
        if (location.pathname !== "/")
            history.push("/");
    };

    return (
        <>
            <Button variant="success" onClick={handleOpen}>
                <i className="fa fa-plus"></i>&nbsp;&nbsp;
                Add Docker remote
            </Button>

            <Modal dialogClassName="modal-lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Docker remote</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form id="dockerRemoteForm" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xs={11}>
                                <Form.Group controlId="dockerRemoteForm.local">
                                    <Form.Check
                                        checked={useTls}
                                        type="switch"
                                        id="dockerRemoteForm.local"
                                        label={useTls ? "Using HTTPS" : "Using HTTP"}
                                        onChange={() => setUseTls(!useTls)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <OverlayTrigger placement="left" delay={{ show: 150, hide: 300 }} overlay={infoTooltip}>
                                    <i className="fa fa-2x fa-question-circle"></i>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        {!local && (
                            <>
                                <Row>
                                    <Col xs="6">
                                        <Form.Group controlId="dockerRemoteForm.host">
                                            <Form.Label className="DockerRemoteForm-required-label info-tooltip">Remote hostname or IP address
                                                <span className="tooltip-text">{strings.hostInfoTooltip}</span>
                                            </Form.Label>
                                            <Form.Control {...register("host")} type="text" placeholder={strings.placeholderHost} required={!local} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Group controlId="dockerRemoteForm.port">
                                            <Form.Label className="DockerRemoteForm-required-label info-tooltip">Remote port
                                                <span className="tooltip-text">{strings.portInfoTooltip}</span>
                                            </Form.Label>
                                            <Form.Control {...register("port", { valueAsNumber: true })} type="number" placeholder={strings.placeholderPort} required={!local} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {
                                    useTls && (<>
                                        <Form.Group controlId="dockerRemoteForm.ca">
                                            <Form.Label className="info-tooltip">Certificate Authority (ca.pem)
                                                <span className="tooltip-text">{strings.caInfoTooltip}</span>
                                            </Form.Label>
                                            <Form.Control {...register("ca")} as="textarea" rows={4} placeholder={strings.placeholderCa} />
                                        </Form.Group>
                                        <Form.Group controlId="dockerRemoteForm.cert">
                                            <Form.Label className="info-tooltip">Certificate (cert.pem)
                                                <span className="tooltip-text">{strings.certInfoTooltip}</span>
                                            </Form.Label>
                                            <Form.Control {...register("cert")} as="textarea" rows={4} placeholder={strings.placeholderCert} />
                                        </Form.Group>
                                        <Form.Group controlId="dockerRemoteForm.key">
                                            <Form.Label className="info-tooltip">Key (key.pem)
                                                <span className="tooltip-text">{strings.keyInfoTooltip}</span>
                                            </Form.Label>
                                            <Form.Control {...register("key")} as="textarea" rows={4} placeholder={strings.placeholderKey} />
                                        </Form.Group>
                                    </>)
                                }

                            </>
                        )}
                        {local && (
                            <>
                                <Form.Group controlId="dockerRemoteForm.socket">
                                    <Form.Label>Socket path</Form.Label>
                                    <Form.Control {...register("socket")} type="text" placeholder={strings.placeholderSocket} required={local} />
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {fail && !loading && (
                        <p className="text-danger">Could not connect to the Docker remote daemon</p>
                    )}
                    {success && !loading && (
                        <p className="text-success">Connection successfully enstablished</p>
                    )}

                    <Button variant="warning" onClick={handleSubmit(onTest)}>
                        {loading && <Spinner animation="border" size="sm" />}
                        {!loading && "Test connection"}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" form="dockerRemoteForm">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default DockerRemoteForm;