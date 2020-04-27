import IRawHttpTrafficRecord from "../models/raw-http-traffic-record";
import IHttpTrafficRecord from "../models/http-traffic-record";
import IHttpRequest from "../models/http-request";

export default class HttpTrafficRecordFactory {
	public static CreateHttpTrafficRecord(data: IRawHttpTrafficRecord): IHttpTrafficRecord {
		// tslint:disable-next-line: no-object-literal-type-assertion
		return {
			AuthUser: data.authuser,
			Date: new Date(Number(data.date) * 1000),
			RemoteHost: data.remotehost,
			Rfc931: data.rfc931,
			Status: Number(data.status),
			Bytes: Number(data.bytes),
			Request: this._parseRequestObject(data),
		} as IHttpTrafficRecord;
	}

	private static _parseRequestObject(data: IRawHttpTrafficRecord): IHttpRequest {
		const parts = data.request.split(" ");
		// tslint:disable-next-line: no-object-literal-type-assertion
		return {
			RequestType: parts[0],
			Url: parts[1],
			Protocol: parts[2],
		} as IHttpRequest;
	}
}
