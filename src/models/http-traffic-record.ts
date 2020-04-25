import IHttpRequest from "./http-request";

export default interface IHttpTrafficRecord {
    RemoteHost: string;
    Rfc931: string;
    AuthUser: string;
    Date: Date;
    Request: IHttpRequest;
    Status: Number;
    Bytes: Number;
}