import {NativeModules} from 'react-native';

const {SunmiPrepaid} = NativeModules;

export interface PrepaidResponse {
  success: boolean;
  message: string;
  billingAcct: string;
  extraBillingAcctKey: any[];
  customProperties: any[];
}

export interface ServiceStatus {
  isInitialized: boolean;
}

function checkMeeterFeedBack(response: any): {Key: string; Value: string}[] {
  let chunksNum;
  if (response.meterFeedback.length % 1024 == 0)
    chunksNum = response.meterFeedback.length / 1024;
  else {
    chunksNum = response.meterFeedback.length / 1024 + 1;
  }

  let tmp = [];

  for (let i = 1; i <= chunksNum; i++) {
    let meterFeedbackKey = 'ESCFBT0';
    meterFeedbackKey += i;
    let chunkLength = i * 1024;
    let previousChunkLength = (i - 1) * 1024;
    if (chunkLength > response.meterFeedback.length)
      chunkLength = response.meterFeedback.length;
    let chunkData = response.meterFeedback.substring(
      previousChunkLength,
      chunkLength,
    );
    tmp.push({Key: meterFeedbackKey, Value: chunkData});
  }
  return tmp;
}

class SunmiPrepaidModule {
  async initializePrepaid(): Promise<PrepaidResponse> {
    try {
      return await SunmiPrepaid.initializePrepaid();
    } catch (error) {
      throw new Error(`Failed to initialize prepaid service: ${error}`);
    }
  }

  async forceCardFacadeDetection(): Promise<PrepaidResponse> {
    try {
      return await SunmiPrepaid.forceCardFacadeDetection();
    } catch (error) {
      throw new Error(`Failed to force card facade detection: ${error}`);
    }
  }

  async readCardMetadata(
    extraKeys: any,
    type: string,
  ): Promise<PrepaidResponse> {
    try {
      const response = await SunmiPrepaid.readCardMetadata(type);

      let keysArray = [
        {Key: 'Key1', Value: response.vendor},
        {Key: 'Key2', Value: response.sectorIdentifier},
        {Key: 'Key3', Value: response.meterIdentifier},
      ];

      let propertiesArray = [
        {
          Key:
            type === 'SC' || type === 'GASSC'
              ? 'ElectrictyCompany'
              : 'WaterCompany',
          Value: response.companyIdentifier,
        },
        {Key: 'ClientIdentifier', Value: response.clientIdentifier},
        {Key: 'CardMetadata', Value: response.metaData},
      ];

      if (response.meterFeedback.length < 1024) {
        propertiesArray.push({
          Key: 'ESCFBT01',
          Value: response.meterFeedback,
        });
      } else {
        propertiesArray.push(...checkMeeterFeedBack(response));
      }

      if (response.metaData) {
        propertiesArray.push({Key: 'CardMetadata', Value: response.metaData});
      }

      return {
        success: true,
        message: 'success',
        billingAcct: response.identifier,
        extraBillingAcctKey: keysArray,
        customProperties: propertiesArray,
      };
    } catch (error) {
      throw new Error(`Failed to read card metadata: ${error}`);
    }
  }

  async writeCardCharge(
    billEncryptInfo: string,
    cardMetadata: string,
  ): Promise<PrepaidResponse> {
    try {
      return await SunmiPrepaid.writeCardCharge(billEncryptInfo, cardMetadata);
    } catch (error) {
      throw new Error(`Failed to write card charge: ${error}`);
    }
  }
}

export default new SunmiPrepaidModule();
