import IHttpTrafficRecordQueue from "./i-http-traffic-record-queue";

export default interface IHttpTrafficBatchContainer {
	AddRecordBatch(batch: IHttpTrafficRecordQueue): string;
	GetRecordBatch(id: string): IHttpTrafficRecordQueue | undefined;
}
