export enum HttpStatusCode {
    ok = 200,
    created = 201,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500
}
export type HttpRequest = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    body?: any;
    headers?: any;
};

// export type HttpResponse<T = any> = {
//     statusCode: HttpStatusCode;
//     body?: T;
// }

// export interface HttpClient< = any> {
//     request: (data: HttpRequest) => Promise<P>;
// }