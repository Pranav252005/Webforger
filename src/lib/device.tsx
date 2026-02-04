import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'laptop';

export type DeviceContextValue = {
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

const getDeviceFromWidth = (width: number): DeviceType => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'laptop';
};

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState<DeviceType>(() => getDeviceFromWidth(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceFromWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.device = device;
  }, [device]);

  const value = useMemo<DeviceContextValue>(() => {
    return {
      device,
      isMobile: device === 'mobile',
      isTablet: device === 'tablet',
      isLaptop: device === 'laptop'
    };
  }, [device]);

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
};

export const useDevice = (): DeviceContextValue => {
  const ctx = useContext(DeviceContext);
  if (!ctx) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return ctx;
};
