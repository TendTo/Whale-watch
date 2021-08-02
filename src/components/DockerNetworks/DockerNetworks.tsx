import React, { useContext, useState } from "react";
import { AccordionContext } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { NetworkInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import { requestErrorToast } from "../Toast/Toast";
import DockerNetwork from "./DockerNetwork";
import './DockerNetworks.css';

interface Props {
    eventKey: string
    data: DockerRemoteData
    layout: 'horizontal' | 'vertical'
}

function detailsConverter(imageDetails: NetworkInspectInfo | undefined) {
    if (imageDetails === undefined)
        return ""
    return JSON.stringify(imageDetails, null, 4);
}

function DockerNetworks({ data, eventKey, layout }: Props) {
    const currentEventKey = useContext(AccordionContext);
    const [loading, setLoading] = useState(false);
    const [NetworkLs, setNetworkLs] = useState<NetworkInspectInfo[]>();
    const [NetworkDetails, setNetworksDetails] = useState<NetworkInspectInfo>();

    const fetchNetworkLs = (force = false) => {
        if (currentEventKey !== eventKey || force) {
            const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);
            console.log("FEST");
            dockerApi.networkLs()
                .then(setNetworkLs)
                .catch(requestErrorToast);
        }
    }

    const networkElements = NetworkLs?.map((network, idx) =>
        <DockerNetwork key={idx}
            network={network}
            data={data}
            fetchNetworkLs={fetchNetworkLs}
            setNetworksDetails={setNetworksDetails}
            layout={layout}
        ></DockerNetwork>
    );

    return (
        <>
            <Card>
                <Accordion.Toggle id="acc-networks" as={Card.Header} eventKey={eventKey} onClick={() => fetchNetworkLs()}>
                    <h5>Networks</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        {loading && <Spinner animation="border" size="sm" />}
                        {!loading && NetworkLs === undefined && <p>No networks found</p>}
                        {!loading && NetworkLs && (
                            <table className="table table-hover">
                                {layout === "horizontal" &&
                                    <thead>
                                        <tr>
                                            <th scope="col">Network ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Driver</th>
                                            <th scope="col">Scope</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                }
                                <tbody>
                                    {networkElements}
                                </tbody>
                            </table>)}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Modal dialogClassName="modal-lg" show={NetworkDetails !== undefined} onHide={() => setNetworksDetails(undefined)}>
                <Modal.Header closeButton>
                    <Modal.Title>{NetworkDetails?.Name} details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>
                        <code>
                            {detailsConverter(NetworkDetails)}
                        </code>
                    </pre>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default DockerNetworks;