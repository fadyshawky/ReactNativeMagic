import moment from 'moment';
import {Service} from '../../core/store/Services/servicesState';
import {ServiceProvider} from '../../core/store/Providers/providersState';

const localization = {
  serialNumber: 'الرقم التسلسلي',
  serviceName: 'اسم الخدمة',
  providerName: 'اسم المقدم',
  customerNumber: 'رقم العميل',
  value: 'القيمة',
  serviceCost: 'تكلفة الخدمة',
  operationNumber: 'رقم العملية',
  referenceNumber: 'الرقم المرجعي',
  time: 'الوقت',
  total: 'الإجمالي',
  expiryDate: 'تاريخ الانتهاء',
  dueDate: 'الموعد المستحق',
  issueDate: 'تاريخ الإصدار',
  quantity: 'الكمية',
  vatValue: 'القسيمة',
};

export const makePrintData = ({
  service,
  BillingAcct,
  provider,
  billInfo,
  amuont,
  fees,
  quantity,
  vatValue,
}: {
  service: Service;
  BillingAcct: string;
  provider: ServiceProvider;
  billInfo: any;
  amuont: string;
  fees: number;
  quantity: string;
  vatValue: string;
}) => {
  let newData = [];
  newData.push({
    value: 'logo',
    type: 'image',
  });

  newData.push({
    value: service?.Name,
    type: 'header2',
  });
  if (billInfo?.BillLabel) {
    newData.push({
      value: billInfo?.BillLabel,
      type: 'header2',
    });
  }
  newData.push({
    value: provider?.BillerName,
    type: 'header2',
  });

  if (BillingAcct) {
    newData.push({
      value: BillingAcct,
      type: 'body',
      label: localization['customerNumber'],
    });
  }
  // response?.PmtInfo?.ExtraBillingAcctKeys?.ExtraBillingAcctKey?.forEach(
  // 	(item: any) => {
  // 		newData.push({
  // 			value: item.Value,
  // 			type: 'extra_description'
  // 		});
  // 	}
  // );

  if (!!vatValue) {
    newData.push({
      value: `${vatValue}`,
      label: localization['vatValue'],
      type: 'body',
    });
  }
  if (quantity) {
    newData.push({
      value: `${quantity}`,
      label: localization['quantity'],
      type: 'body',
    });
  }
  newData.push({
    value: `${amuont} EGP`,
    label: localization['value'],
    type: 'body',
  });

  if (fees?.toString() !== '0') {
    newData.push({
      value: `${fees?.toString()} EGP`,
      label: localization['serviceCost'],
      type: 'body',
    });
  }
  newData.push({
    value: moment().format('YYYY-MM-DD HH:mm'),
    label: localization['time'],
    type: 'body',
  });

  newData.push({
    value: quantity
      ? `${(Number(quantity) * (Number(amuont) + Number(fees)))?.toFixed(
          2,
        )} EGP`
      : `${(Number(amuont) + Number(fees))?.toString()} EGP`,
    label: localization['total'],
    type: 'body_title',
  });

  if (billInfo?.DueDt) {
    newData.push({
      value: billInfo?.DueDt,
      type: 'body',
      label: localization['dueDate'],
    });
  }

  if (billInfo?.IssueDt) {
    newData.push({
      value: billInfo?.IssueDt,
      type: 'body',
      label: localization['issueDate'],
    });
  }

  if (billInfo?.ExtraBillInfo) {
    newData.push({
      value: billInfo?.ExtraBillInfo,
      type: 'description',
      label: '',
    });
  }

  if (!!service?.meta?.note) {
    newData.push({
      value: service?.meta?.note,
      type: 'description',
    });
  }

  if (!!service?.meta?.explain) {
    newData.push({
      value: service?.meta?.explain,
      type: 'description',
    });
  }

  return newData;
};
