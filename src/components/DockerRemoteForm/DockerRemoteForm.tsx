import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { DockerRemoteFormData } from '../../types/DockerTypes';

interface Props {
    onFetch: (docker: DockerRemoteFormData) => Promise<void>
}

function DockerRemoteForm(props: Props) {
    const placeholderCa = `-----BEGIN CERTIFICATE-----
    MIIGGTCCBAGgAwIBAgIdasdasdggbZEprmjKoWclqyd+zmQwDQYJKoZIhvcNAQEL
    BQAwgZsxCzAJBgNVBAA56dGBaT4wDAYDVQQIDAVJdGFseTERMA8GA1UEBwwIUy5U
    -----END CERTIFICATE-----`;
    const placeholderCert = `-----BEGIN CERTIFICATE-----
    04dNMzgKIRZWt/WJucI7uPnd90g3XaD2z9LTfpQbs5ft5+qMyAiwMgvvFKOfK3gY
    R8V6seVvA9BCJOEnTcxcl8dGeFbNtQLi2qkzk+CqTKwhIFjRatmQl00qBdnnR/4u
    -----END CERTIFICATE-----`;
    const placeholderKey = `-----BEGIN RSA PRIVATE KEY-----
    2bMtAoIBAHV+68HOkCKGe4ybfYGYA6eGyro6udeR5Qf8cRyUdLK1W0BhWUoHrRpb
    xGIK3tCf3iXk8vtdm514snHGvZkh/kdvHtlWmA8QR0XeDoYh17egWZB+6OrxEV6m
    -----END RSA PRIVATE KEY-----`;
    const placeholderHost = "hostname.com";
    const placeholderPort = "2375";
    const placeholderSocket = "/var/run/docker.sock"
    const defaultData = {
        socket: "/var/run/docker.sock", port: 2375, host: "192.168.1.18",
        ca: "",
        cert: "",
        key: ""
    }

    const [show, setShow] = useState(false);
    const [local, setLocal] = useState(false);
    const { register, handleSubmit, reset } = useForm({ defaultValues: defaultData });

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const onSubmit = (data: DockerRemoteFormData) => {
        data.isLocal = local;
        console.log(data);
        props.onFetch(data);
        handleClose();
    };
    const onClose = () => {
        reset(defaultData);
        handleClose();
    };


    return (
        <>
            <Button variant="primary" onClick={handleOpen}>
                Add Docker remote
            </Button>

            <Modal dialogClassName="modal-lg" backdrop="static" keyboard={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Docker remote</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="dockerRemoteForm" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="dockerRemoteForm.local">
                            <Form.Check
                                disabled
                                type="switch"
                                id="dockerRemoteForm.local"
                                label={local ? "Local Docker" : "Remote Docker"}
                                onChange={() => setLocal(!local)}
                            />
                        </Form.Group>
                        {!local && (
                            <>
                                <Row>
                                    <Col xs="6">
                                        <Form.Group controlId="dockerRemoteForm.host">
                                            <Form.Label>Remote hostname or IP address</Form.Label>
                                            <Form.Control {...register("host")} type="text" placeholder={placeholderHost} required={!local} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Group controlId="dockerRemoteForm.host">
                                            <Form.Label>Remote port</Form.Label>
                                            <Form.Control {...register("port", { valueAsNumber: true })} type="number" placeholder={placeholderPort} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="dockerRemoteForm.ca">
                                    <Form.Label>Certificate Authority (ca.pem)</Form.Label>
                                    <Form.Control {...register("ca")} as="textarea" rows={4} placeholder={placeholderCa} />
                                </Form.Group>
                                <Form.Group controlId="dockerRemoteForm.cert">
                                    <Form.Label>Certificate (cert.pem)</Form.Label>
                                    <Form.Control {...register("cert")} as="textarea" rows={4} placeholder={placeholderCert} />
                                </Form.Group>
                                <Form.Group controlId="dockerRemoteForm.key">
                                    <Form.Label>Key (key.pem)</Form.Label>
                                    <Form.Control {...register("key")} as="textarea" rows={4} placeholder={placeholderKey} />
                                </Form.Group>
                            </>
                        )}
                        {local && (
                            <>
                                <Form.Group controlId="dockerRemoteForm.socket">
                                    <Form.Label>Socket path</Form.Label>
                                    <Form.Control {...register("socket")} type="text" placeholder={placeholderSocket} required={local} />
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" form="dockerRemoteForm">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DockerRemoteForm;