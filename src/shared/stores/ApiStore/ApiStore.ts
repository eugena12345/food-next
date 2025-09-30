import { HTTPMethod, StatusHTTP } from './types';
import type { ApiResponse, IApiStore, RequestParams } from './types';
import qs from 'qs';

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private _getRequestData<ReqT>(params: RequestParams<ReqT>): { url: string; options: RequestInit } {
        const endpoint = `${this.baseUrl}${params.endpoint}`;
        const options: RequestInit = {
            method: params.method,
            headers: { ...params.headers },
        };

        if (params.method === HTTPMethod.GET) {
            const urlParams = qs.stringify(params.params, { encode: true });
            return {
                url: `${endpoint}?${urlParams}`,
                options,
            };
        }

        if (params.method === HTTPMethod.POST) {
            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json;charset=utf-8',
            };
            options.body = JSON.stringify(params.data);
        }

        return { url: endpoint, options };
    }

    async request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            const { url, options } = this._getRequestData(params);
            const response = await fetch(url, options);

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
