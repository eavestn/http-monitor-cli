import IHttpTrafficRecord from "./models/http-traffic-record";
import { EventEmitter } from "events";

export default class HttpRecordQueue {
    // length
    // averages?
    private PERIOD_THRESHOLD_MS: Number = 10000; // 10 seconds

    public constructor(
        private _queue: IHttpTrafficRecord[],
        private _trafficStart: Date,
        private _trafficFinish: Date,
        private _eventEmitter: EventEmitter = new EventEmitter(),
    ) {
        this._eventEmitter.on("record_added", this._handleRecordAddition);
        this._eventEmitter.on("record_add_failure", this._handleRecordAdditionFailure);
    }

    private _handleRecordAddition (record: IHttpTrafficRecord): void {
        if (!this._queue[0]) {
            this._trafficStart = record.Date;
        }
    }

    private _handleRecordAdditionFailure (record: IHttpTrafficRecord): void {
        this._trafficFinish = this._queue[this._queue.length - 1].Date;
    }

    public Dequeue(): IHttpTrafficRecord | undefined {
        return this._queue.shift();
    }

    public Enqueue(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined {
        const timeDifference: Number = this._trafficStart.getTime() - record.Date.getTime();

        if (timeDifference > this.PERIOD_THRESHOLD_MS) {

            this._queue.push(record);
            this._eventEmitter.emit("record_added", record);

            return record;
        } else {
            this._eventEmitter.emit("record_add_failure", record);
            return undefined;
        }
    }

    public GetTrafficFinish(): Date | undefined {
        return this._trafficFinish;
    }

    public GetTrafficStart(): Date | undefined {
        return this._trafficStart;
    }
}