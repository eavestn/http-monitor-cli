import IHttpTrafficRecordBatchContainer from "./interfaces/i-http-traffic-record-batch-container";
import IHttpTrafficRecord from "../../models/http-traffic-record";
import HttpTrafficRecordQueue from "./http-traffic-record-queue";
import IHttpTrafficRecordQueue from "./interfaces/i-http-traffic-record-queue";

export default class HttpTrafficBatcher {
    private _batchContainer: IHttpTrafficRecordBatchContainer;
    private _currentBatchId: string = "";

    public constructor (
        batchContainer: IHttpTrafficRecordBatchContainer
    ) {
        this._batchContainer = batchContainer;
    }

    private _addHttpTrafficRecordToBatch(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined {
        return this._batchContainer.GetRecordBatch(this._currentBatchId)?.Enqueue(record);
    }

    private _initializeNewQueueAndAddOne(record: IHttpTrafficRecord): IHttpTrafficRecordQueue {
        const queue = new HttpTrafficRecordQueue();
        queue.Enqueue(record);
        return queue;
    }

    public CreateNewBatch(record: IHttpTrafficRecord): string {
        // I don't like the way this is written, i.e. the implementation is currently 
        // written so that when a new batch is created, its hash is determined by the 
        // the first record's timestamp. Without that timestamp, .AddRecordBatch will
        // fail.
        return this._batchContainer.AddRecordBatch(
            this._initializeNewQueueAndAddOne(record)
        );
    }

    public BatchRecord(record: IHttpTrafficRecord): string {
        if (!this._addHttpTrafficRecordToBatch(record)) {
            this._currentBatchId = this.CreateNewBatch(record);
        }

        return this._currentBatchId;
    }
}