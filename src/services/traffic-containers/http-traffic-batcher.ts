import IHttpTrafficRecordBatchContainer from "./interfaces/i-http-traffic-batch-container";
import IHttpTrafficRecord from "../../models/http-traffic-record";
import HttpTrafficRecordQueue from "./http-traffic-record-queue";
import IHttpTrafficRecordQueue from "./interfaces/i-http-traffic-record-queue";
import IHttpTrafficMeaningMaker from "../meaning-makers/interfaces/i-http-traffic-meaning-maker";
import { EventEmitter } from "events";

export default class HttpTrafficBatcher {
	private _batchContainer: IHttpTrafficRecordBatchContainer;
	private _currentBatchId: string = "";
	private _eventEmitter: EventEmitter;
	private _meaningMaker: IHttpTrafficMeaningMaker;

	public constructor(
		monitorEventEmitter: EventEmitter,
		batchContainer: IHttpTrafficRecordBatchContainer,
		meaningMaker: IHttpTrafficMeaningMaker,
	) {
		this._batchContainer = batchContainer;
		this._meaningMaker = meaningMaker;
		this._eventEmitter = monitorEventEmitter;
	}

	private _addHttpTrafficRecordToBatch(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined {
		return this._batchContainer.GetRecordBatch(this._currentBatchId)?.Enqueue(record);
	}

	private _initializeNewQueueAndAddOne(record: IHttpTrafficRecord): IHttpTrafficRecordQueue {
		const queue = new HttpTrafficRecordQueue(this._meaningMaker);
		queue.Enqueue(record);
		return queue;
	}

	public CreateNewBatch(record: IHttpTrafficRecord): string {
		// I don't like the way this is written, i.e. the implementation is currently
		// written so that when a new batch is created, its hash is determined by the
		// the first record's timestamp. Without that timestamp, .AddRecordBatch will
		// fail.
		return this._batchContainer.AddRecordBatch(this._initializeNewQueueAndAddOne(record));
	}

	public BatchRecord(record: IHttpTrafficRecord): string {
		if (!this._addHttpTrafficRecordToBatch(record)) {
			this._eventEmitter.emit("batch_complete", this._currentBatchId);
			this._currentBatchId = this.CreateNewBatch(record);
		}

		return this._currentBatchId;
	}
}
