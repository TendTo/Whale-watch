import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { NetworkInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast, { requestErrorToast } from "../Toast/Toast";

interface Props {
    key: number
    data: DockerRemoteData
    network: NetworkInspectInfo
    fetchNetworkLs: (force?: boolean) => void
    setNetworksDetails: (newtwork: NetworkInspectInfo) => void
}

function DockerNetwork({ data, network, fetchNetworkLs, setNetworksDetails }: Props) {
    const [loading, setLoading] = useState(false);
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);

    const onInspect = () => {
        dockerApi.networkInpect(network)
            .then((details) => setNetworksDetails(details))
            .catch(requestErrorToast)
    }
    const onDelete = () => {
        dockerApi.networkRm(network)
            .then(() => fetchNetworkLs(true))
            .then(() => toast("The network has been deleted"))
            .catch(requestErrorToast)
    }

    return (
        <tr>
            {loading && (
                <td colSpan={5}>
                    <Spinner animation="border" size="sm" />
                </td>
            )}
            {!loading && (
                <>
                    <td>{network.Name}</td>
                    <td className="DockerNetworks-ellipsis">{network.Id}</td>
                    <td>{network.Driver}</td>
                    <td>{network.Scope}</td>
                    <td className="DockerNetworks-actions" >
                        <Button variant="info lg" onClick={onInspect} disabled={loading}>
                            <i className="fa fa-eye"></i>
                        </Button>
                        <Button variant="danger lg" onClick={onDelete} disabled={loading}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default DockerNetwork;