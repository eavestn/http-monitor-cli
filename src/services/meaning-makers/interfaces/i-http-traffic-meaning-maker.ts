import IHttpTrafficRecordQueue from "../../traffic-containers/interfaces/i-http-traffic-record-queue";
import IHttpTrafficRecordMeaning from "../../../models/traffic/interfaces/http-traffic-record-meaning";
import IHttpTrafficRecord from "../../../models/traffic/interfaces/http-traffic-record";

export default interface IHttpTrafficMeaningMaker {
	SegmentTrafficRecordIntoDigestibleParts(record: IHttpTrafficRecord): IHttpTrafficRecordMeaning;
	AdjustHttpTrafficBatchHistory(
		batch: IHttpTrafficRecordQueue,
		record: IHttpTrafficRecordMeaning,
	): IHttpTrafficRecordQueue;
}
