import { HTTPMethod, StatusHTTP } from './types';
import type { ApiResponse, IApiStore, RequestParams } from './types';
import qs from 'qs';

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private _getRequestData<ReqT>(params: RequestParams<ReqT>): RequestInit {
        const endpoint = `${this.baseUrl}${params.endpoint}`;
        const options: RequestInit = {
            method: params.method,
            headers: { ...params.headers },
        };

        if (params.method === HTTPMethod.GET) {
            const urlParams = qs.stringify(params.params, { encode: true });
            return {
                ...options,
                method: HTTPMethod.GET,
                url: `${endpoint}?${urlParams}`,
            };
        }

        if (params.method === HTTPMethod.POST) {
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json;charset=utf-8',
            };
            options.body = JSON.stringify(params.data);
        }

        return { url: endpoint, ...options };
    }

    async request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        console.log('request params', params)
        try {
            const { url, ...requestOptions } = this._getRequestData(params);
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    success: false,
                    data: errorData || null,
                    status: response.status,
                };
            }

            const responseData = await response.json();

            return {
                success: true,
                data: responseData?.data || null,
                meta: responseData?.meta || null,
                status: response.status,
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                status: StatusHTTP.UNEXPECTED_ERROR,
            };
        }
    }
}
