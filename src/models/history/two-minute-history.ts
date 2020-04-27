import IHttpTrafficRecordMeaning from "../traffic/interfaces/http-traffic-record-meaning";
import IHttpTrafficRecord from "../traffic/interfaces/http-traffic-record";
import IHttpTrafficMeaningMaker from "../../services/meaning-makers/interfaces/i-http-traffic-meaning-maker";
import ITwoMinuteHistory from "./i-two-minute-history";
import IHttpTrafficBatchContainer from "../../services/traffic-containers/interfaces/i-http-traffic-batch-container";

// This ended up being complete garbage from a "bringing together the representations (models)" stand point
// and would require some grooming of the relationships between services and models to sort out. I am not
// particularly proud of this implementation - but it gets the job done. The biggest problem I have hear
// is that the IHttpTrafficRecordQueue already exposes meaning; however, that is a summary meaning and
// if I am keeping a _running_ two minute understanding of meaning, I need it at the per-record level
export default class TwoMinuteHistory implements ITwoMinuteHistory {
	private PERIOD_THRESHOLD_MS: number = 120000; // 120 seconds; 2 minutes
	private PERIOD_THRESHOLD_S: number = 120; // 120 seconds; 2 minutes
	private _history: IHttpTrafficRecordMeaning[] = new Array<IHttpTrafficRecordMeaning>();
	private _hits: number = 0;
	private _bytes: number = 0;
	private _trafficRecovered: boolean = true;

	public constructor(
		public MeaningMaker: IHttpTrafficMeaningMaker,
		public BatchContainer: IHttpTrafficBatchContainer,
	) {}

	public EnqueueHistory(batchId: string): ITwoMinuteHistory {
		const batch = this.BatchContainer.GetRecordBatch(batchId);

		if (batch) {
			// O(n^2) booo!!!!
			while (batch.Length() > 0) {
				const current: IHttpTrafficRecord = batch.Dequeue() as IHttpTrafficRecord;

				while (this._timeThresholdExceeded(current)) {
					// tslint:disable-next-line: no-shadowed-variable
					const record = this._history.shift() as IHttpTrafficRecordMeaning;
					this._removeFromHistory(record);
				}

				const x = this.MeaningMaker.SegmentTrafficRecordIntoDigestibleParts(current);
				this._addToHistory(x);
				this._history.push(x);
			}
		}

		return this;
	}

	private _timeThresholdExceeded(record: IHttpTrafficRecord): boolean {
		return this._history[0] && record.Date.getTime() - this._history[0].Date.getTime() > this.PERIOD_THRESHOLD_MS;
	}

	private _removeFromHistory(meaningRecord: IHttpTrafficRecordMeaning): void {
		this._hits -= 1;
		this._bytes -= meaningRecord.Bytes;
		this._attemptTrafficRecovery(meaningRecord);
	}

	private _addToHistory(meaningRecord: IHttpTrafficRecordMeaning): void {
		this._hits += 1;
		this._bytes += meaningRecord.Bytes;
		this._attemptTrafficRecovery(meaningRecord);
	}

	private _attemptTrafficRecovery(meaningRecord: IHttpTrafficRecordMeaning): void {
		const avg = this._hits / this.PERIOD_THRESHOLD_S;
		const limit = Number(process.env.AVG_TRAFFIC_PER_SECOND);

		if (this._trafficRecovered && avg > limit) {
			console.warn(`\n-----: traffic high - ${meaningRecord.Date} | traffic now avg. ${avg} requests/sec.`);
			this._trafficRecovered = false;
		} else if (!this._trafficRecovered && avg <= limit) {
			console.info(`\n-----: traffic recovered - ${meaningRecord.Date} | traffic now avg. ${avg} requests/sec.`);
			this._trafficRecovered = true;
		}
	}
}
