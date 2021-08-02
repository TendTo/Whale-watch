type deviceType = 'Mobile' | 'Tablet' | 'Desktop' | 'Laptop' | 'LargerThanLaptop' | 'Unknown';
type deviceTypeVariant = 'MobileSmall' | 'MobileMedium' | 'MobileLarge' | 'Tablet' | 'LaptopSmall' | 'LaptopLarge' | 'LargerThanLaptop' | 'LargeScreenMax' | 'Unknown';
type orientation = 'Portrait' | 'Landscape';

interface DeviceDetails {
    deviceType: deviceType;
    deviceTypeVariant?: deviceTypeVariant;
    orientation: orientation;
    width: number;
    height: number;
}

const DeviceWidthObject = {
    MobileSmall: { max: 320, min: 0 },
    MobileMedium: { max: 375, min: 321 },
    MobileLarge: { max: 767, min: 376 },
    Tablet: { max: 991, min: 768 },
    LaptopSmall: { max: 1024, min: 992 },
    LaptopLarge: { max: 1440, min: 1025 },
    LargerThanLaptop: { max: 2560, min: 1441 },
    LargeScreenMax: { max: 999999, min: 2561 }
};

const BreakpointsByWidth = {
    laptop_max: 1440,
    laptop_min: 992,
    tablet_min: 768,
    tablet_max: 991,
    mobile_max: 767,
    default_min: 768 // Unrecognized device
}

const MobileHeight = {
    mobileLandscape_min: 320,
    mobileLandscape_max: 425
}

export const getWindowDimension = () => {
    const width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    const height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    return { width, height }
};


export const getDeviceTypeInfo = () => {
    const { width, height } = getWindowDimension()
    const buildDeviceDetails: DeviceDetails = {
        deviceType: 'Unknown',
        deviceTypeVariant: 'Unknown',
        orientation: 'Portrait',
        width: 0,
        height: 0,
    }
    if (height < width) {
        buildDeviceDetails.orientation = 'Landscape'

        if (height <= MobileHeight.mobileLandscape_max)
            buildDeviceDetails.deviceType = 'Mobile'
        else if (width <= BreakpointsByWidth.tablet_max)
            buildDeviceDetails.deviceType = 'Tablet'
        else if (width <= BreakpointsByWidth.laptop_max)
            buildDeviceDetails.deviceType = 'Laptop'
        else if (width > BreakpointsByWidth.laptop_max)
            buildDeviceDetails.deviceType = 'LargerThanLaptop'
    } else {
        buildDeviceDetails.orientation = 'Portrait'

        if (width <= BreakpointsByWidth.mobile_max)
            buildDeviceDetails.deviceType = 'Mobile'
        else if (width <= BreakpointsByWidth.tablet_max)
            buildDeviceDetails.deviceType = 'Tablet'
        else if (width <= BreakpointsByWidth.laptop_max)
            buildDeviceDetails.deviceType = 'Laptop'
        else if (width > BreakpointsByWidth.laptop_max)
            buildDeviceDetails.deviceType = 'LargerThanLaptop'
    }

    for (const [key, val] of Object.entries(DeviceWidthObject)) {
        if (val.min <= height && height <= val.max) {
            buildDeviceDetails.deviceTypeVariant = key as deviceTypeVariant;
            break
        }
    }

    return buildDeviceDetails
}
