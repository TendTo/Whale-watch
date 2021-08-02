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
    layout: 'horizontal' | 'vertical'
}

function DockerVolume({ data, volume, layout, fetchVolumeLs, setVolumeDetails }: Props) {
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
        <>
            {loading && (
                <tr>
                    <td colSpan={layout === "horizontal" ? 4 : 3}>
                        <Spinner animation="border" size="sm" />
                    </td>
                </tr>
            )}
            {!loading && layout === "horizontal" && (
                <tr>
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
                </tr>
            )}
            {!loading && layout === "vertical" && (
                <>
                    <tr className="table-primary">
                        <th colSpan={1}>Name</th>
                        <td colSpan={2} className="DockerVolumes-name">{volume.Name}</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>Driver</th>
                        <td colSpan={2}>{volume.Driver}</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>Mountpoint</th>
                        <td colSpan={2} className="DockerVolumes-name">{volume.Mountpoint}</td>
                    </tr>
                    <tr>
                        <th colSpan={1}>Actions</th>
                        <td colSpan={2} className="DockerVolumes-actions" >
                            <Button variant="info lg" onClick={onInspect} disabled={loading}>
                                <i className="fa fa-eye"></i>
                            </Button>
                            <Button variant="danger lg" onClick={onDelete} disabled={loading}>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </td>
                    </tr>
                </>
            )}
        </>
    );
}

export default DockerVolume;