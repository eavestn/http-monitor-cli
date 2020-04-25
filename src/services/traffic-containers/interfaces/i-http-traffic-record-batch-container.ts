import IHttpTrafficRecordQueue from "./i-http-traffic-record-queue";

export default interface IHttpTrafficRecordBatchContainer {
    AddRecordBatch(batch: IHttpTrafficRecordQueue): string;
    GetRecordBatch(id: string): IHttpTrafficRecordQueue | undefined
}
