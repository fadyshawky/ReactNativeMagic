export const errorsLocalization = {
  en: {
    listErrorTitle: 'Failed to load data',
    tryAgain: 'Try again',
    thisFieldIsRequired: 'This field is required',
    unknownErrorHasOccurred: 'An error occurred',
    failedToOpenUrl: 'Failed to open URL',
    pleaseCheckYourInternetConnection: 'Please check your internet connection',
    invalidEmail: 'Invalid email',
    invalidPhoneNumber: 'Invalid phone number',
    invalidFullName: 'Invalid name',
    invalidFromDate: (fromField: string, toField: string) =>
      `${fromField} cannot be later than ${toField.toLowerCase()}`,
    invalidToDate: (fromField: string, toField: string) =>
      `${toField} cannot be earlier than ${fromField.toLowerCase()}`,
    datesCantBeEqual: (fromField: string, toField: string) =>
      `${fromField} and ${toField.toLowerCase()} cannot be equal`,
    mobileDataIsTurnedOff: 'Mobile data is turned off',
    turnOnMobileData: 'Turn on mobile data or use Wi-Fi',
    error: 'Error',
  },
  ar: {
    listErrorTitle: 'فشل تحميل البيانات',
    tryAgain: 'حاول مرة أخرى',
    thisFieldIsRequired: 'هذا الحقل مطلوب',
    unknownErrorHasOccurred: 'حدث خطأ',
    failedToOpenUrl: 'فشل فتح الرابط',
    pleaseCheckYourInternetConnection: 'يرجى التحقق من اتصال الإنترنت',
    invalidEmail: 'بريد إلكتروني غير صالح',
    invalidPhoneNumber: 'رقم هاتف غير صالح',
    invalidFullName: 'اسم غير صالح',
    invalidFromDate: (fromField: string, toField: string) =>
      `${fromField} لا يمكن أن يكون بعد ${toField.toLowerCase()}`,
    invalidToDate: (fromField: string, toField: string) =>
      `${toField} لا يمكن أن يكون قبل ${fromField.toLowerCase()}`,
    datesCantBeEqual: (fromField: string, toField: string) =>
      `${fromField} و ${toField.toLowerCase()} لا يمكن أن يكونا متساويين`,
    mobileDataIsTurnedOff: 'بيانات الجوال مغلقة',
    turnOnMobileData: 'قم بتشغيل بيانات الجوال أو استخدم Wi-Fi',
    error: 'خطأ',
  },
};
