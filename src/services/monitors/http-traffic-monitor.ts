import { EventEmitter } from "events";
import IHttpTrafficBatchContainer from "../traffic-containers/interfaces/i-http-traffic-batch-container";
import IHttpTrafficRecordQueue from "../traffic-containers/interfaces/i-http-traffic-record-queue";
import IHttpTrafficMonitor from "./i-http-traffic-monitor";
import ISegmentMeaning from "../../models/segments/i-segment-meaning";

export default class HttpTrafficMonitor implements IHttpTrafficMonitor {
	constructor(public Emitter: EventEmitter, public BatchContainer: IHttpTrafficBatchContainer) {
		this.Emitter.on("batch_complete", this._handleBatchComplete.bind(this));
	}

	private _handleBatchComplete(batchId: string): void {
		const batch = this.BatchContainer.GetRecordBatch(batchId);
		const meaning = batch?.GetMeaning();

		console.log(
			`\n-----: log for batch ${batchId}:`,
			` starting - ${batch?.GetTrafficStart()}`,
			` finishing - ${batch?.GetTrafficFinish()}`,
		);

		// tslint:disable-next-line: forin
		for (const segment in meaning) {
			this._interpretBatchMeaning(batchId, meaning[segment]);
		}
	}

	private _interpretBatchMeaning(batch: string, meaning: ISegmentMeaning): void {
		console.log(
			`-----: batch: ${batch}: segment - ${meaning.Segment.Self}`,
			`| hosts: ${Object.keys(meaning.RemoteHosts).length}`,
			`| hits:  ${meaning.Hits}`,
			`| bytes: ${meaning.Bytes}`,
			`| errors: ${this._countErrors(meaning.Codes)}`,
		);
	}

	private _countErrors(codes: { [code: number]: number }) {
		let errors: number = 0;
		for (const code in codes) {
			if (code.startsWith("5") || code.startsWith("4")) {
				errors += 1;
			}
		}

		return errors;
	}
}
