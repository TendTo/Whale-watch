import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { VolumeInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast, { requestErrorToast } from "../Toast/Toast";

interface Props {
    key: number
    data: DockerRemoteData
    volume: VolumeInspectInfo
    fetchVolumeLs: (force?: boolean) => void
    setVolumeDetails: (volume: VolumeInspectInfo) => void
}

function DockerVolume({ data, volume, fetchVolumeLs, setVolumeDetails }: Props) {
    const [loading, setLoading] = useState(false);
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);

    const onInspect = () => {
        dockerApi.volumeInpect(volume)
            .then((details) => setVolumeDetails(details))
            .catch(requestErrorToast);
    }
    const onDelete = () => {
        dockerApi.volumeRm(volume)
            .then(() => fetchVolumeLs(true))
            .then(() => toast("The volume has been deleted"))
            .catch(requestErrorToast);
    }

    return (
        <tr>
            {loading && (
                <td colSpan={4}>
                    <Spinner animation="border" size="sm" />
                </td>
            )}
            {!loading && (
                <>
                    <td className="DockerVolumes-name">{volume.Name}</td>
                    <td>{volume.Driver}</td>
                    <td className="DockerVolumes-name">{volume.Mountpoint}</td>
                    <td className="DockerVolumes-actions" >
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

export default DockerVolume;