import IHttpTrafficRecord from "../../../models/http-traffic-record";

export default interface IHttpTrafficRecordQueue {
	Dequeue(): IHttpTrafficRecord | undefined;
	Enqueue(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined;
	GetTrafficFinish(): Date | undefined;
	GetTrafficStart(): Date | undefined;
}
