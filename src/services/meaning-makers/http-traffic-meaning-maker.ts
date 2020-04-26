import IHttpTrafficMeaningMaker from "./interfaces/i-http-traffic-meaning-maker";
import IHttpTrafficRecord from "../../models/http-traffic-record";
import IHttpTrafficRecordMeaning from "../../models/http-traffic-record-meaning";
import IHttpTrafficRecordQueue from "../traffic-containers/interfaces/i-http-traffic-record-queue";

export default class HttpTrafficMeaningMaker implements IHttpTrafficMeaningMaker {
	public SegmentTrafficRecordIntoDigestibleParts(record: IHttpTrafficRecord): IHttpTrafficRecordMeaning {
		throw new Error("Method not implemented.");
	}

	public AgjustHttpTrafficBatchHistory(
		batch: IHttpTrafficRecordQueue,
		record: IHttpTrafficRecordMeaning,
	): IHttpTrafficRecordQueue {
		throw new Error("Method not implemented.");
	}
}
