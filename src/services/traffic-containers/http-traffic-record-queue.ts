import IHttpTrafficRecord from "../../models/http-traffic-record";
import { EventEmitter } from "events";
import IHttpTrafficRecordQueue from "./interfaces/i-http-traffic-record-queue";

export default class HttpTrafficRecordQueue implements IHttpTrafficRecordQueue {
    private PERIOD_THRESHOLD_MS: Number = 10000; // 10 seconds
    private _queue: IHttpTrafficRecord[];
    private _trafficStart?: Date;
    private _trafficFinish?: Date;
    private _eventEmitter: EventEmitter;

    public constructor() {
        this._queue = new Array<IHttpTrafficRecord>();
        this._eventEmitter = new EventEmitter();
        
        this._eventEmitter.on("record_added", this._handleRecordAddition.bind(this));
        this._eventEmitter.on("batch_at_capacity", this._handleRecordAdditionFailure.bind(this));
    }

    private _determineTimeDifference(record: IHttpTrafficRecord): Number {
        if (!this._queue[0]) {
            this._trafficStart = record.Date;
        }

        return record.Date.getTime() - (this._trafficStart as Date).getTime();
    }

    private _handleRecordAddition (record: IHttpTrafficRecord): void {
        // this._determineTimeDifference(record);
    }

    private _handleRecordAdditionFailure (record: IHttpTrafficRecord): void {
        this._trafficFinish = this._queue[this._queue.length - 1].Date;
    }

    public Dequeue(): IHttpTrafficRecord | undefined {
        return this._queue.shift();
    }

    public Enqueue(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined {
        if (this._determineTimeDifference(record) <= this.PERIOD_THRESHOLD_MS) {
            this._queue.push(record);
            this._eventEmitter.emit("record_added", record);
            return record;
        } else {
            this._eventEmitter.emit("batch_at_capacity", record);
            return undefined;
        }
    }

    public GetTrafficFinish(): Date | undefined {
        return this._trafficFinish;
    }

    public GetTrafficStart(): Date | undefined {
        return this._trafficStart;
    }

    public Length(): number {
        return this._queue.length;
    }
}
