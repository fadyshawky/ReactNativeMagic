import {AxiosAdapter, AxiosError, AxiosResponse} from 'axios';
import routes from './mocks/mockApi.json';

interface MockRoute {
  /** Request-body fields that must all match for this response. */
  when?: Record<string, unknown>;
  status: number;
  body: unknown;
}

const MOCK_LATENCY_MS = 400;

/**
 * Serves `mocks/mockApi.json` instead of the network while `USE_MOCK_API` is
 * on (see core/config). Routes are keyed "METHOD /path"; the first response
 * whose `when` fields all equal the request body wins, so list the happy path
 * first and the fallback error last. Requests still run the interceptors.
 */
export const mockAdapter: AxiosAdapter = async config => {
  const key = `${(config.method ?? 'get').toUpperCase()} ${config.url}`;
  const body =
    typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
  const match = ((routes as Record<string, MockRoute[]>)[key] ?? []).find(
    route =>
      Object.entries(route.when ?? {}).every(([k, v]) => body?.[k] === v),
  );

  await new Promise<void>(resolve => setTimeout(resolve, MOCK_LATENCY_MS));

  const response: AxiosResponse = {
    data: match ? match.body : {error: `No mock for ${key} in mockApi.json`},
    status: match ? match.status : 404,
    statusText: '',
    headers: {},
    config,
  };
  if (response.status >= 400) {
    throw new AxiosError(
      `Request failed with status code ${response.status}`,
      AxiosError.ERR_BAD_REQUEST,
      config,
      null,
      response,
    );
  }
  return response;
};
