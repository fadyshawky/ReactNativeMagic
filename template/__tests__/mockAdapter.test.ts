import {InternalAxiosRequestConfig} from 'axios';
import {mockAdapter} from '../src/core/api/mockAdapter';

const request = (method: string, url: string, data?: object) =>
  mockAdapter({
    method,
    url,
    data: data && JSON.stringify(data),
    headers: {},
  } as InternalAxiosRequestConfig);

describe('mockAdapter', () => {
  it('signs in with the mock credentials and verifies the mock OTP', async () => {
    const login = await request('post', '/login', {
      mobile_number: '011111111111',
      mpin: 'testpass',
    });
    expect(login.status).toBe(200);

    const otp = await request('post', '/verify-otp', {
      mobile_number: '011111111111',
      verification_code: '111111',
    });
    expect(otp.data.accessToken).toBe('mock-access-token');
  });

  it('rejects wrong credentials and codes with the server error body', async () => {
    await expect(
      request('post', '/login', {mobile_number: '011111111111', mpin: 'nope'}),
    ).rejects.toMatchObject({
      response: {status: 401, data: {error: 'Wrong phone number or password'}},
    });
    await expect(
      request('post', '/verify-otp', {
        mobile_number: '011111111111',
        verification_code: '000000',
      }),
    ).rejects.toMatchObject({response: {status: 422}});
  });

  it('serves lists and 404s unknown routes', async () => {
    const categories = await request('get', '/categories');
    expect(categories.data.data.length).toBeGreaterThan(0);
    await expect(request('get', '/nope')).rejects.toMatchObject({
      response: {status: 404},
    });
  });
});
