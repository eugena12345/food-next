export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
}

export type RequestParams<ReqT> = {
    method: HTTPMethod;
    endpoint: string;
    headers: Record<string, string>;

    data: ReqT;
};

export enum StatusHTTP {
    status200 = 200,
    status201 = 201,
    status300 = 300,
    status304 = 304,
    status400 = 400,
    status401 = 401,
    status403 = 403,
    status404 = 404,
    status422 = 422,
    UNEXPECTED_ERROR = 'UNEXPECTED ERROR',
}

export type ApiResponse<SuccessT, ErrorT> =
    | {
        success: true;
        data: SuccessT;
        meta: {
            pagination: {
                page: number;
                pageCount: number;
                pageSize: number;
                total: number;
            };
        }
        status: StatusHTTP;
    }
    | {
        success: false;
        data: ErrorT;
        status: StatusHTTP;
    }
    | {
        success: false;
        data: null;
        status: StatusHTTP;
    };

export interface IApiStore {
    readonly baseUrl: string;

    request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>>;
}