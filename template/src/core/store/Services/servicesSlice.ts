import {createSlice} from '@reduxjs/toolkit';
import {newState} from '../../../common/utils/newState';
import {handleErrorResponse} from '../../api/responseHandlers';
import {
  enquireService,
  getService,
  getServiceById,
  getServices,
  payService,
  reverseService,
} from './servicesActions';
import {
  InquiredBill,
  Service,
  ServicePayload,
  ServicesInitialState,
  ServicesState,
} from './servicesState';

function getServicesHandler(
  state: ServicesState,
  payload: {payload: ServicePayload},
) {
  return newState(state, {
    services: payload.payload.services,
  });
}
function getServicesLoadingHandler(state: ServicesState) {
  return newState(state, {});
}

function getServicesErrorHandler(
  state: ServicesState,
  payload: {payload: {message: string | unknown}},
) {
  handleErrorResponse((payload.payload.message as string) || 'Login failed');
  return newState(state, {});
}

function resetServicesHandler(state: ServicesState) {
  return newState(state, {
    services: ServicesInitialState.services,
  });
}

function serviceLogoutHandler(state: ServicesState) {
  return newState(state, ServicesInitialState);
}

function getServiceHandler(
  state: ServicesState,
  payload: {payload: ServicePayload},
) {
  return newState(state, {
    service: payload.payload.service,
  });
}

function clearServiceHandler(state: ServicesState) {
  return newState(state, {
    service: ServicesInitialState.service,
  });
}

function clearInquiryHandler(state: ServicesState) {
  return newState(state, {
    inquiredBill: ServicesInitialState.inquiredBill,
  });
}

function clearPaymentHandler(state: ServicesState) {
  return newState(state, {
    paymentResponse: ServicesInitialState.paymentResponse,
  });
}

function getServiceErrorHandler(
  state: ServicesState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(payload.payload.message);
  return newState(state, {
    loading: false,
  });
}

function getServiceLoadingHandler(state: ServicesState) {
  return newState(state, {
    loading: true,
  });
}

function enquireServiceHandler(
  state: ServicesState,
  payload: {payload: ServicePayload},
) {
  return newState(state, {
    inquiredBill: payload.payload.data.Response.PresSvcRs
      .BillInqRs as InquiredBill,
    loading: false,
  });
}

function enquireServiceLoadingHandler(state: ServicesState) {
  return newState(state, {
    loading: true,
  });
}

function enquireServiceErrorHandler(
  state: ServicesState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(payload.payload.message || 'enquire service failed');
  return newState(state, {
    loading: false,
  });
}

function payServiceHandler(
  state: ServicesState,
  payload: {payload: ServicePayload},
) {
  return newState(state, {
    paymentResponse: payload.payload.data,
    loading: false,
  });
}

function reverseServiceHandler(
  state: ServicesState,
  payload: {payload: ServicePayload},
) {
  return newState(state, {
    paymentResponse: payload.payload.data,
    loading: false,
  });
}

function payServiceLoadingHandler(state: ServicesState) {
  return newState(state, {
    loading: true,
  });
}

function payServiceErrorHandler(
  state: ServicesState,
  payload: {payload: {message: string}},
) {
  handleErrorResponse(payload.payload.message || 'pay service failed');
  return newState(state, {
    loading: false,
  });
}

function selectedServiceHandler(
  state: ServicesState,
  payload: {payload: Service},
) {
  return newState(state, {
    selectedService: payload.payload,
  });
}
export const {reducer: ServicesReducer, actions} = createSlice({
  name: 'services',
  initialState: ServicesInitialState,
  reducers: {
    setServiceLogout: serviceLogoutHandler,
    setSelectedService: selectedServiceHandler,
    clearService: clearServiceHandler,
    clearInquiry: clearInquiryHandler,
    clearPayment: clearPaymentHandler,
    resetServices: resetServicesHandler,
  },
  extraReducers: builder => {
    builder
      .addCase(getServices.fulfilled, getServicesHandler)
      .addCase(getServices.rejected, getServicesErrorHandler)
      .addCase(getServices.pending, getServicesLoadingHandler)
      .addCase(getService.fulfilled, getServiceHandler)
      .addCase(getService.rejected, getServiceErrorHandler)
      .addCase(getService.pending, getServiceLoadingHandler)
      .addCase(getServiceById.fulfilled, getServiceHandler)
      .addCase(getServiceById.rejected, getServiceErrorHandler)
      .addCase(getServiceById.pending, getServiceLoadingHandler)
      .addCase(enquireService.fulfilled, enquireServiceHandler)
      .addCase(enquireService.rejected, enquireServiceErrorHandler)
      .addCase(enquireService.pending, enquireServiceLoadingHandler)
      .addCase(payService.fulfilled, payServiceHandler)
      .addCase(payService.rejected, payServiceErrorHandler)
      .addCase(payService.pending, payServiceLoadingHandler)
      .addCase(reverseService.fulfilled, reverseServiceHandler)
      .addCase(reverseService.rejected, payServiceErrorHandler)
      .addCase(reverseService.pending, payServiceLoadingHandler);
  },
});

export const {
  setServiceLogout,
  setSelectedService,
  clearService,
  clearInquiry,
  clearPayment,
  resetServices,
} = actions;
