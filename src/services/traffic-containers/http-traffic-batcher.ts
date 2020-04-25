import IHttpTrafficRecordBatchContainer from "./interfaces/i-http-traffic-record-batch-container";
import IHttpTrafficRecord from "../../models/http-traffic-record";
import HttpTrafficRecordQueue from "./http-traffic-record-queue";

export default class HttpTrafficBatcher {
    private _batchContainer: IHttpTrafficRecordBatchContainer;
    private _currentBatchId: string;

    public constructor (
        batchContainer: IHttpTrafficRecordBatchContainer
    ) {
        this._batchContainer = batchContainer;
        this._currentBatchId = this.CreateNewBatch();
    }

    private _addHttpTrafficRecordToBatch(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined {
        return this._batchContainer.GetRecordBatch(this._currentBatchId)?.Enqueue(record);
    }

    public CreateNewBatch(): string {
        return this._batchContainer.AddRecordBatch(new HttpTrafficRecordQueue());
    }

    public BatchRecord(record: IHttpTrafficRecord): string {
        if (!this._addHttpTrafficRecordToBatch(record)) {
            this._currentBatchId = this.CreateNewBatch();
            this._addHttpTrafficRecordToBatch(record);
        }

        return this._currentBatchId;
    }
}