import IHttpTrafficRecordQueue from "../../traffic-containers/interfaces/i-http-traffic-record-queue";
import IHttpTrafficRecord from "../../../models/http-traffic-record";
import IHttpTrafficRecordMeaning from "../../../models/http-traffic-record-meaning";

export default interface IHttpTrafficMeaningMaker {
	SegmentTrafficRecordIntoDigestibleParts(record: IHttpTrafficRecord): IHttpTrafficRecordMeaning;
	AdjustHttpTrafficBatchHistory(
		batch: IHttpTrafficRecordQueue,
		record: IHttpTrafficRecordMeaning,
	): IHttpTrafficRecordQueue;
}
