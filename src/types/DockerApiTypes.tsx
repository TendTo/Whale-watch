type Duration = number;

export interface ImageInfo {
    Id: string;
    ParentId: string;
    RepoTags: string[];
    RepoDigests?: string[];
    Created: number;
    Size: number;
    VirtualSize: number;
    Labels: { [label: string]: string };
}

export interface ContainerInfo {
    Id: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    Ports: Port[];
    Labels: { [label: string]: string };
    State: string;
    Status: string;
    HostConfig: {
        NetworkMode: string;
    };
    NetworkSettings: {
        Networks: { [networkType: string]: NetworkInfo };
    };
    Mounts: Array<{
        Name?: string;
        Type: string;
        Source: string;
        Destination: string;
        Driver?: string;
        Mode: string;
        RW: boolean;
        Propagation: string;
    }>;
}

export interface Port {
    IP: string;
    PrivatePort: number;
    PublicPort: number;
    Type: string;
}

export interface NetworkInfo {
    IPAMConfig?: any;
    Links?: any;
    Aliases?: any;
    NetworkID: string;
    EndpointID: string;
    Gateway: string;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    MacAddress: string;
}

// Information returned from inspecting a network
export interface NetworkInspectInfo {
    Name: string;
    Id: string;
    Created: string;
    Scope: string;
    Driver: string;
    EnableIPv6: boolean;
    IPAM?: IPAM;
    Internal: boolean;
    Attachable: boolean;
    Ingress: boolean;
    ConfigFrom?: { Network: string; };
    ConfigOnly: boolean;
    Containers?: { [id: string]: NetworkContainer };
    Options?: { [key: string]: string };
    Labels?: { [key: string]: string };
}

export interface NetworkCreateOptions {
    Name: string;
    CheckDuplicate?: boolean;
    Driver?: string;
    Internal?: boolean;
    Attachable?: boolean;
    Ingress?: boolean;
    IPAM?: IPAM;
    EnableIPv6?: boolean;
    Options?: { [option: string]: string };
    Labels?: { [label: string]: string };
}

export interface NetworkContainer {
    Name: string;
    EndpointID: string;
    MacAddress: string;
    IPv4Address: string;
    IPv6Address: string;
}

/* tslint:disable:export interface-name */
export interface IPAM {
    Driver: string;
    Config?: Array<{ [key: string]: string }>;
    Options?: { [key: string]: string };
}
/* tslint:enable:export interface-name */

export interface VolumeInspectInfo {
    Name: string;
    Driver: string;
    Mountpoint: string;
    Status?: { [key: string]: string };
    Labels: { [key: string]: string };
    Scope: 'local' | 'global';
    // Field is always present, but sometimes is null
    Options: { [key: string]: string } | null;
    // Field is sometimes present, and sometimes null
    UsageData?: {
        Size: number;
        RefCount: number;
    } | null;
}

export interface ContainerInspectInfo {
    Id: string;
    Created: string;
    Path: string;
    Args: string[];
    State: {
        Status: string;
        Running: boolean;
        Paused: boolean;
        Restarting: boolean;
        OOMKilled: boolean;
        Dead: boolean;
        Pid: number;
        ExitCode: number;
        Error: string;
        StartedAt: string;
        FinishedAt: string;
        Health?: {
            Status: string;
            FailingStreak: number;
            Log: Array<{
                Start: string;
                End: string;
                ExitCode: number;
                Output: string;
            }>;
        };
    };
    Image: string;
    ResolvConfPath: string;
    HostnamePath: string;
    HostsPath: string;
    LogPath: string;
    Name: string;
    RestartCount: number;
    Driver: string;
    Platform: string;
    MountLabel: string;
    ProcessLabel: string;
    AppArmorProfile: string;
    ExecIDs?: string[];
    HostConfig: HostConfig;
    GraphDriver: {
        Name: string;
        Data: {
            DeviceId: string;
            DeviceName: string;
            DeviceSize: string;
        };
    };
    Mounts: Array<{
        Name?: string;
        Source: string;
        Destination: string;
        Mode: string;
        RW: boolean;
        Propagation: string;
    }>;
    Config: {
        Hostname: string;
        Domainname: string;
        User: string;
        AttachStdin: boolean;
        AttachStdout: boolean;
        AttachStderr: boolean;
        ExposedPorts: { [portAndProtocol: string]: {} };
        Tty: boolean;
        OpenStdin: boolean;
        StdinOnce: boolean;
        Env: string[];
        Cmd: string[];
        Image: string;
        Volumes: { [volume: string]: {} };
        WorkingDir: string;
        Entrypoint?: string | string[];
        OnBuild?: any;
        Labels: { [label: string]: string };
    };
    NetworkSettings: {
        Bridge: string;
        SandboxID: string;
        HairpinMode: boolean;
        LinkLocalIPv6Address: string;
        LinkLocalIPv6PrefixLen: number;
        Ports: {
            [portAndProtocol: string]: Array<{
                HostIp: string;
                HostPort: string;
            }>;
        };
        SandboxKey: string;
        SecondaryIPAddresses?: any;
        SecondaryIPv6Addresses?: any;
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        MacAddress: string;
        Networks: {
            [type: string]: {
                IPAMConfig?: any;
                Links?: any;
                Aliases?: any;
                NetworkID: string;
                EndpointID: string;
                Gateway: string;
                IPAddress: string;
                IPPrefixLen: number;
                IPv6Gateway: string;
                GlobalIPv6Address: string;
                GlobalIPv6PrefixLen: number;
                MacAddress: string;
            };
        };
        Node?: {
            ID: string;
            IP: string;
            Addr: string;
            Name: string;
            Cpus: number;
            Memory: number;
            Labels: any;
        };
    };
}

export interface NetworkStats {
    [name: string]: {
        rx_bytes: number;
        rx_dropped: number;
        rx_errors: number;
        rx_packets: number;
        tx_bytes: number;
        tx_dropped: number;
        tx_errors: number;
        tx_packets: number;
    };
}

export interface CPUStats {
    cpu_usage: {
        percpu_usage: number[];
        usage_in_usermode: number;
        total_usage: number;
        usage_in_kernelmode: number;
    };
    system_cpu_usage: number;
    online_cpus: number;
    throttling_data: {
        periods: number;
        throttled_periods: number;
        throttled_time: number;
    };
}

export interface MemoryStats {
    stats: {
        total_pgmajfault: number;
        cache: number;
        mapped_file: number;
        total_inactive_file: number;
        pgpgout: number;
        rss: number;
        total_mapped_file: number;
        writeback: number;
        unevictable: number;
        pgpgin: number;
        total_unevictable: number;
        pgmajfault: number;
        total_rss: number;
        total_rss_huge: number;
        total_writeback: number;
        total_inactive_anon: number;
        rss_huge: number;
        hierarchical_memory_limit: number;
        total_pgfault: number;
        total_active_file: number;
        active_anon: number;
        total_active_anon: number;
        total_pgpgout: number;
        total_cache: number;
        inactive_anon: number;
        active_file: number;
        pgfault: number;
        inactive_file: number;
        total_pgpgin: number;
    };
    max_usage: number;
    usage: number;
    failcnt: number;
    limit: number;
}

export interface ContainerStats {
    read: string;
    pid_stats: {
        current: number;
    };
    networks: NetworkStats;
    memory_stats: MemoryStats;
    blkio_stats: {};
    cpu_stats: CPUStats;
    precpu_stats: CPUStats;
}

export interface HostConfig {
    AutoRemove?: boolean;
    Binds?: string[];
    ContainerIDFile?: string;
    LogConfig?: {
        Type: string;
        Config: any;
    };
    NetworkMode?: string;
    PortBindings?: any;
    RestartPolicy?: RestartPolicy;
    VolumeDriver?: string;
    VolumesFrom?: any;
    Mounts?: MountConfig;
    CapAdd?: any;
    CapDrop?: any;
    Dns?: any[];
    DnsOptions?: any[];
    DnsSearch?: any[];
    ExtraHosts?: any;
    GroupAdd?: string[];
    IpcMode?: string;
    Cgroup?: string;
    Links?: any;
    OomScoreAdj?: number;
    PidMode?: string;
    Privileged?: boolean;
    PublishAllPorts?: boolean;
    ReadonlyRootfs?: boolean;
    SecurityOpt?: any;
    StorageOpt?: { [option: string]: string };
    Tmpfs?: { [dir: string]: string };
    UTSMode?: string;
    UsernsMode?: string;
    ShmSize?: number;
    Sysctls?: { [index: string]: string };
    Runtime?: string;
    ConsoleSize?: number[];
    Isolation?: string;
    MaskedPaths?: string[];
    ReadonlyPaths?: string[];
    CpuShares?: number;
    CgroupParent?: string;
    BlkioWeight?: number;
    BlkioWeightDevice?: any;
    BlkioDeviceReadBps?: any;
    BlkioDeviceWriteBps?: any;
    BlkioDeviceReadIOps?: any;
    BlkioDeviceWriteIOps?: any;
    CpuPeriod?: number;
    CpuQuota?: number;
    CpusetCpus?: string;
    CpusetMems?: string;
    Devices?: any;
    DeviceCgroupRules?: string[];
    DeviceRequests?: DeviceRequest[];
    DiskQuota?: number;
    KernelMemory?: number;
    Memory?: number;
    MemoryReservation?: number;
    MemorySwap?: number;
    MemorySwappiness?: number;
    OomKillDisable?: boolean;
    PidsLimit?: number;
    Ulimits?: any;
}

export interface ImageInspectInfo {
    Id: string;
    RepoTags: string[];
    RepoDigests: string[];
    Parent: string;
    Comment: string;
    Created: string;
    Container: string;
    ContainerConfig: {
        Hostname: string;
        Domainname: string;
        User: string;
        AttachStdin: boolean;
        AttachStdout: boolean;
        AttachStderr: boolean;
        ExposedPorts: { [portAndProtocol: string]: {} };
        Tty: boolean;
        OpenStdin: boolean;
        StdinOnce: boolean;
        Env: string[];
        Cmd: string[];
        ArgsEscaped: boolean;
        Image: string;
        Volumes: { [path: string]: {} };
        WorkingDir: string;
        Entrypoint?: string | string[];
        OnBuild?: any[];
        Labels: { [label: string]: string };
    };
    DockerVersion: string;
    Author: string;
    Config: {
        Hostname: string;
        Domainname: string;
        User: string;
        AttachStdin: boolean;
        AttachStdout: boolean;
        AttachStderr: boolean;
        ExposedPorts: { [portAndProtocol: string]: {} };
        Tty: boolean;
        OpenStdin: boolean;
        StdinOnce: boolean;
        Env: string[];
        Cmd: string[];
        ArgsEscaped: boolean;
        Image: string;
        Volumes: { [path: string]: {} };
        WorkingDir: string;
        Entrypoint?: string | string[];
        OnBuild: any[];
        Labels: { [label: string]: string };
    };
    Architecture: string;
    Os: string;
    Size: number;
    VirtualSize: number;
    GraphDriver: {
        Name: string;
        Data: {
            DeviceId: string;
            DeviceName: string;
            DeviceSize: string;
        };
    };
    RootFS: {
        Type: string;
        Layers?: string[];
        BaseLayer?: string;
    };
}

export interface ImageBuildOptions {
    authconfig?: AuthConfig;
    dockerfile?: string;
    t?: string;
    extrahosts?: string;
    remote?: string;
    q?: boolean;
    cachefrom?: string;
    pull?: string;
    rm?: boolean;
    forcerm?: boolean;
    memory?: number;
    memswap?: number;
    cpushares?: number;
    cpusetcpus?: number;
    cpuperiod?: number;
    cpuquota?: number;
    buildargs?: { [key: string]: string };
    shmsize?: number;
    squash?: boolean;
    labels?: { [key: string]: string };
    networkmode?: string;
    platform?: string;
    target?: string;
    outputs?: string;
}

export interface ImagePushOptions {
    tag?: string;
    authconfig?: AuthConfig;
}

export interface AuthConfig {
    username: string;
    password: string;
    serveraddress: string;
    email?: string;
}

export interface PortBinding {
    HostIp?: string;
    HostPort?: string;
}

export interface PortMap {
    [key: string]: PortBinding[];
}

export interface RestartPolicy {
    Name: string;
    MaximumRetryCount?: number;
}

type LoggingDriverType =
    | 'json-file'
    | 'syslog'
    | 'journald'
    | 'gelf'
    | 'fluentd'
    | 'awslogs'
    | 'splunk'
    | 'etwlogs'
    | 'none';

export interface LogConfig {
    Type: LoggingDriverType;
    Config?: { [key: string]: string };
}

export interface DeviceMapping {
    PathOnHost: string;
    PathInContainer: string;
    CgroupPermissions: string;
}

export interface DeviceRequest {
    Driver?: string;
    Count?: number;
    DeviceIDs?: string[];
    Capabilities?: string[][];
    Options?: { [key: string]: string };
}

/* tslint:disable:export interface-name */
export interface IPAMConfig {
    IPv4Address?: string;
    IPv6Address?: string;
    LinkLocalIPs?: string[];
}
/* tslint:enable:export interface-name */

export interface EndpointSettings {
    IPAMConfig?: IPAMConfig;
    Links?: string[];
    Aliases?: string[];
    NetworkID?: string;
    EndpointID?: string;
    Gateway?: string;
    IPAddress?: string;
    IPPrefixLen?: number;
    IPv6Gateway?: string;
    GlobalIPv6Address?: string;
    GlobalIPV6PrefixLen?: number;
    MacAddress?: string;
    DriverOpts?: { [key: string]: string };
}

export interface EndpointsConfig {
    [key: string]: EndpointSettings;
}

export interface ExecCreateOptions {
    AttachStdin?: boolean;
    AttachStdout?: boolean;
    AttachStderr?: boolean;
    DetachKeys?: string;
    Tty?: boolean;
    Env?: string[];
    Cmd?: string[];
    Privileged?: boolean;
    User?: string;
    WorkingDir?: string;
}

export interface ExecInspectInfo {
    CanRemove: boolean;
    DetachKeys: string;
    ID: string;
    Running: boolean;
    ExitCode: number | null;
    ProcessConfig: {
        privileged: boolean;
        user: string;
        tty: boolean;
        entrypoint: string;
        arguments: string[];
    };
    OpenStdin: boolean;
    OpenStderr: boolean;
    OpenStdout: boolean;
    ContainerID: string;
    Pid: number;
}

export interface ExecStartOptions {
    // hijack and stdin are used by docker-modem
    hijack?: boolean;
    stdin?: boolean;
    // Detach and Tty are used by Docker's API
    Detach?: boolean;
    Tty?: boolean;
}

type MountType = 'bind' | 'volume' | 'tmpfs';

type MountConsistency = 'default' | 'consistent' | 'cached' | 'delegated';

type MountPropagation = 'private' | 'rprivate' | 'shared' | 'rshared' | 'slave' | 'rslave';

export interface MountSettings {
    Target: string;
    Source: string;
    Type: MountType;
    ReadOnly?: boolean;
    Consistency?: MountConsistency;
    BindOptions?: {
        Propagation: MountPropagation;
    };
    VolumeOptions?: {
        NoCopy: boolean;
        Labels: { [label: string]: string };
        DriverConfig: {
            Name: string;
            Options: { [option: string]: string };
        };
    };
    TmpfsOptions?: {
        SizeBytes: number;
        Mode: number;
    };
}

type MountConfig = MountSettings[];

export interface ContainerCreateOptions {
    name?: string;
    Hostname?: string;
    Domainname?: string;
    User?: string;
    AttachStdin?: boolean;
    AttachStdout?: boolean;
    AttachStderr?: boolean;
    Tty?: boolean;
    OpenStdin?: boolean;
    StdinOnce?: boolean;
    Env?: string[];
    Cmd?: string[];
    Entrypoint?: string | string[];
    Image?: string;
    Labels?: { [label: string]: string };
    Volumes?: { [volume: string]: {} };
    WorkingDir?: string;
    NetworkDisabled?: boolean;
    MacAddress?: boolean;
    ExposedPorts?: { [port: string]: {} };
    StopSignal?: string;
    StopTimeout?: number;
    HostConfig?: HostConfig;
    NetworkingConfig?: {
        EndpointsConfig?: EndpointsConfig;
    };
}

export interface KeyObject {
    pem: string | Buffer;
    passphrase?: string;
}

export interface DockerOptions {
    socketPath?: string;
    host?: string;
    port?: number | string;
    username?: string;
    ca?: string | string[] | Buffer | Buffer[];
    cert?: string | string[] | Buffer | Buffer[];
    key?: string | string[] | Buffer | Buffer[] | KeyObject[];
    protocol?: 'https' | 'http' | 'ssh';
    timeout?: number;
    version?: string;
    sshAuthAgent?: string;
    Promise?: typeof Promise;
}

export interface GetEventsOptions {
    since?: number;
    until?: number;
    filters?:
    | string
    | {
        config?: string;
        container?: string[];
        daemon?: string[];
        event?: string[];
        image?: string[];
        label?: string[];
        network?: string[];
        node?: string[];
        plugin?: string[];
        scope?: Array<'local' | 'swarm'>;
        secret?: string[];
        service?: string[];
        type?: Array<
            | 'container'
            | 'image'
            | 'volume'
            | 'network'
            | 'daemon'
            | 'plugin'
            | 'service'
            | 'node'
            | 'secret'
            | 'config'
        >;
        volume?: string[];
    };
}

export interface SecretVersion {
    Index: number;
}

export interface Annotations {
    Name?: string;
    Labels?: { [name: string]: string };
}

export interface ResourceLimits {
    NanoCPUs?: number;
    MemoryBytes?: number;
    Pids?: number;
}

export interface NamedGenericResource {
    Kind?: string;
    Value?: string;
}

export interface DiscreteGenericResource {
    Kind?: string;
    Value?: number;
}

type GenericResource = NamedGenericResource | DiscreteGenericResource;

export interface RestartPolicy {
    Condition?: string;
    Delay?: number;
    MaxAttempts?: number;
    Window?: number;
}

export interface Resources {
    NanoCPUs?: number;
    MemoryBytes?: number;
    GenericResources?: GenericResource[];
}

export interface ResourceRequirements {
    Limits?: ResourceLimits;
    Reservations?: Resources;
}

export interface Placement {
    Constraints?: string[];
    Preferences?: Array<{ Spread: { SpreadDescriptor: string } }>;
    MaxReplicas?: number;
    Platforms?: Array<{
        Architecture: string;
        OS: string;
    }>;
}

export interface NetworkAttachmentConfig {
    Target?: string;
    Aliases?: string[];
    DriverOpts?: { [key: string]: string };
}

export interface Privileges {
    CredentialSpec?: {
        Config?: string;
        File?: string;
        Registry?: string;
    };
    SELinuxContext?: {
        Disable?: boolean;
        User?: string;
        Role?: string;
        Type?: string;
        Level?: string;
    };
}

export interface HealthConfig {
    Test?: string[];
    Interval?: number;
    Timeout?: number;
    StartPeriod?: number;
    Retries?: number;
}

export interface DNSConfig {
    Nameservers?: string[];
    Search?: string[];
    Options?: string[];
}

export interface SecretReference {
    File?: {
        Name?: string;
        UID?: string;
        GID?: string;
        Mode?: number;
    };
    SecretID?: string;
    SecretName?: string;
}

export interface Ulimit {
    Name?: string;
    Hard?: number;
    Soft?: number;
}

export interface ContainerSpec {
    Image?: string;
    Labels?: { [label: string]: string };
    Command?: string[];
    Args?: string[];
    Hostname?: string;
    Env?: string[];
    Dir?: string;
    User?: string;
    Groups?: string[];
    Privileges?: Privileges;
    Init?: boolean;
    TTY?: boolean;
    OpenStdin?: boolean;
    ReadOnly?: boolean;
    Mounts?: MountSettings[];
    StopSignal?: string;
    StopGracePeriod?: number;
    HealthCheck?: HealthConfig;
    Hosts?: string[];
    DNSConfig?: DNSConfig;
    Secrets?: SecretReference[];
    Isolation?: string;
    Sysctls?: { [key: string]: string };
    CapabilityAdd?: string[];
    CapabilityDrop?: string[];
    Ulimits?: Ulimit[];
}

export interface PluginSpec {
    Name?: string;
    Remote?: string;
    Privileges?: {
        Name?: string;
        Description?: string;
        Value?: string[];
    };
    Disabled?: boolean;
    Env?: string[];
}

export interface TaskSpecBase {
    Resources?: ResourceRequirements;
    RestartPolicy?: RestartPolicy;
    Placement?: Placement;
    Networks?: NetworkAttachmentConfig[];
    LogDriver?: {
        Name?: string;
        Options?: { [key: string]: string };
    };
    ForceUpdate?: number;
    Runtime?: string;
}

export interface ContainerTaskSpec extends TaskSpecBase {
    ContainerSpec?: ContainerSpec;
}

export interface PluginTaskSpec extends TaskSpecBase {
    Runtime: 'plugin';
    PluginSpec: PluginSpec;
}

export interface NetworkAttachmentTaskSpec extends TaskSpecBase {
    Runtime: 'attachment';
    NetworkAttachmentSpec: {
        ContainerID: string;
    };
}

type TaskSpec = ContainerTaskSpec | PluginTaskSpec | NetworkAttachmentTaskSpec;

export interface ServiceMode {
    Replicated?: { Replicas?: number };
    Global?: {};
    ReplicatedJob?: {
        MaxConcurrent?: number;
        TotalCompletions?: number;
    };
    GlobalJob?: {};
}

export interface UpdateConfig {
    Parallelism: number;
    Delay?: number;
    FailureAction?: string;
    Monitor?: number;
    MaxFailureRatio?: number;
    Order: string;
}

export interface PortConfig {
    Name?: string;
    Protocol?: 'tcp' | 'udp' | 'sctp';
    TargetPort?: number;
    PublishedPort?: number;
    PublishMode?: 'ingress' | 'host';
}

export interface EndpointSpec {
    Mode?: string;
    Ports?: PortConfig[];
}

export interface EndpointVirtualIP {
    NetworkID?: string;
    Addr?: string;
}

export interface Endpoint {
    Spec?: EndpointSpec;
    Ports?: PortConfig[];
    VirtualIPs?: EndpointVirtualIP[];
}

export interface ServiceSpec extends Annotations {
    TaskTemplate?: TaskSpec;
    Mode?: ServiceMode;
    UpdateConfig?: UpdateConfig;
    RollbackConfig?: UpdateConfig;
    Networks?: NetworkAttachmentConfig[];
    EndpointSpec?: EndpointSpec;
}

export interface CreateServiceOptions extends ServiceSpec {
    authconfig?: AuthConfig;
}

export interface ServiceCreateResponse {
    ID: string;
    Warnings?: string[];
}

export interface ServiceListOptions {
    Filters: {
        id?: string[];
        label?: string[];
        mode?: Array<'replicated' | 'global'>;
        name?: string[];
    };
}

export interface Version {
    Index?: number;
}

export interface Meta {
    Version?: Version;
    CreatedAt?: string;
    UpdatedAt?: string;
}

type UpdateState = 'updating' | 'paused' | 'completed' | 'rollback_started' | 'rollback_paused' | 'rollback_completed';

export interface UpdateStatus {
    State?: UpdateState;
    StartedAt?: string;
    CompletedAt?: string;
    Message?: string;
}

export interface ServiceStatus {
    RunningTasks: number;
    DesiredTasks: number;
    CompletedTasks: number;
}

export interface JobStatus {
    JobIteration: Version;
    LastExecution?: string;
}

export interface Service extends Meta {
    ID: string;
    Spec?: ServiceSpec;
    PreviousSpec?: ServiceSpec;
    Endpoint?: Endpoint;
    UpdateStatus?: UpdateStatus;
    ServiceStatus?: ServiceStatus;
    JobStatus?: JobStatus;
}

export interface OrchestrationConfig {
    TaskHistoryRetentionLimit?: number;
}

export interface RaftConfig {
    SnapshotInterval?: number;
    KeepOldSnapshots?: number;
    LogEntriesForSlowFollowers?: number;
    ElectionTick?: number;
    HeartbeatTick?: number;
}

export interface DispatcherConfig {
    HeartbeatPeriod?: Duration;
}

type ExternalCAProtocol = 'cfssl' | string;

export interface ExternalCA {
    Protocol: ExternalCAProtocol;
    URL: string;
    Options?: { [key: string]: string };
    CACert: string;
}

export interface CAConfig {
    NodeCertExpiry?: Duration;
    ExternalCAs?: ExternalCA[];
    SigningCACert?: string;
    SigningCAKey?: string;
    ForceRotate?: number;
}

export interface TaskDefaults {
    LogDriver?: Driver;
}

export interface EncryptionConfig {
    AutoLockManagers: boolean;
}

export interface Spec extends Annotations {
    Orchestration?: OrchestrationConfig;
    Raft: RaftConfig;
    Dispatcher?: DispatcherConfig;
    CAConfig?: CAConfig;
    TaskDefaults?: TaskDefaults;
    EncryptionConfig?: EncryptionConfig;
}

export interface TLSInfo {
    TrustRoot?: string;
    CertIssuerSubject?: string;
    CertIssuerPublicKey?: string;
}

export interface ClusterInfo extends Meta {
    ID: string;
    Spec: Spec;
    TLSInfo: TLSInfo;
    RootRotationInProgress: boolean;
    DefaultAddrPool: string[];
    SubnetSize: number;
    DataPathPort: number;
}

export interface JoinTokens {
    Worker: string;
    Manager: string;
}

export interface Swarm extends ClusterInfo {
    JoinTokens: JoinTokens;
}

export interface Driver {
    Name: string;
    Options?: { [key: string]: string };
}

export interface SecretSpec extends Annotations {
    Data?: string;
    Driver?: Driver;
    Templating?: Driver;
}

export interface Secret extends Meta {
    ID: string;
    Spec?: SecretSpec;
}

export interface ConfigInfo {
    ID: string;
    Version: SecretVersion;
    CreatedAt: string;
    UpdatedAt?: string;
    Spec?: ConfigSpec;
}

export interface ConfigSpec {
    Name: string;
    Labels: { [label: string]: string };
    Data: string;
}

export interface ConfigVersion {
    Index: number;
}

export interface PluginInfo {
    Id?: string;
    Name: string;
    Enabled: boolean;
    Settings: PluginSettings;
    PluginReference?: string;
    Config: PluginConfig;
}

type PluginInspectInfo = PluginInfo;

export interface PluginSettings {
    Mounts: PluginMount[];
    Env: string[];
    Args: string[];
    Devices: PluginDevice[];
}

export interface PluginConfig {
    Description: string;
    Documentation: string;
    Interface: any;
    Entrypoint: string[];
    WorkDir: string;
    User?: User;
    Network: Network;
    Linux: Linux;
    PropagatedMount: string;
    Mounts: PluginMount[];
    Env: PluginEnv[];
    Args: Args;
    rootfs: any;
}

export interface Interface {
    Types: PluginInterfaceType[];
    Socket: string;
}

export interface PluginInterfaceType {
    Prefix: string;
    Capability: string;
    Version: string;
}

export interface PluginMount {
    Name: string;
    Description: string;
    Settable: string[];
    Source: string;
    Destination: string;
    Type: string;
    Options: string[];
}

export interface Linux {
    Capabilities: string[];
    AllowAllDevices: boolean;
    Devices: PluginDevice[];
}

export interface PluginDevice {
    Name: string;
    Description: string;
    Settable: string[];
    Path: string;
}

export interface Network {
    Type: string;
}

export interface PluginEnv {
    Name: string;
    Description: string;
    Settable: string[];
    Value: string;
}

export interface Args {
    Name: string;
    Description: string;
    Settable: string[];
    Value: string;
}

export interface User {
    UID: number;
    GID: number;
}

export interface ImageRemoveInfo {
    Untagged: string;
    Deleted: string;
}

export interface PruneImagesInfo {
    ImagesDeleted: ImageRemoveInfo[];
    SpaceReclaimed: number;
}

export interface PruneVolumesInfo {
    VolumesDeleted: string[];
    SpaceReclaimed: number;
}

export interface PruneContainersInfo {
    ContainersDeleted: string[];
    SpaceReclaimed: number;
}

export interface PruneNetworksInfo {
    NetworksDeleted: string[];
}

export interface ContainerWaitOptions {
    /** Since v1.30 */
    condition?: 'not-running' | 'next-exit' | 'removed';
}

export interface ContainerLogsOptions {
    stdout?: boolean;
    stderr?: boolean;
    follow?: boolean;
    since?: number;
    details?: boolean;
    tail?: number;
    timestamps?: boolean;
}

export interface ImageBuildContext {
    context: string;
    src: string[];
}

export interface DockerVersion {
    ApiVersion: string;
    Arch: string;
    BuildTime: Date;
    Components: Array<{
        Details: {
            ApiVersion: string;
            Arch: string;
            BuildTime: Date;
            Experimental: string;
            GitCommit: string;
            GoVersion: string;
            KernelVersion: string;
            Os: string;
        };
        Name: string;
        Version: string;
    }>;
    GitCommit: string;
    GoVersion: string;
    KernelVersion: string;
    MinAPIVersion: string;
    Os: string;
    Platform: {
        Name: string;
    };
    Version: string;
}