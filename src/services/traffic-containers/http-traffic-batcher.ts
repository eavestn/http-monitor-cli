import IHttpTrafficRecordBatchContainer from "./interfaces/i-http-traffic-record-batch-container";

export default class HttpTrafficBatcher {
    public constructor (
        public batchContainer: IHttpTrafficRecordBatchContainer
    ) {
        // do nothing
    }
}