declare module 'SunmiPrepaid' {
  interface PrepaidResponse {
    success: boolean;
    message: string;
  }

  interface ServiceStatus {
    isInitialized: boolean;
  }

  export interface SunmiPrepaidInterface {
    initializePrepaid(): Promise<PrepaidResponse>;
    initializeUtilityType(utilityType: string): Promise<PrepaidResponse>;
    forceCardFacadeDetection(): Promise<PrepaidResponse>;
    getServiceStatus(): Promise<ServiceStatus>;
  }

  const SunmiPrepaid: SunmiPrepaidInterface;
  export default SunmiPrepaid;
}
