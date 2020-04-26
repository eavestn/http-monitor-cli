import IHttpTrafficMeaningMaker from "./interfaces/i-http-traffic-meaning-maker";
import IHttpTrafficRecord from "../../models/http-traffic-record";
import IHttpTrafficRecordMeaning from "../../models/http-traffic-record-meaning";
import IHttpTrafficRecordQueue from "../traffic-containers/interfaces/i-http-traffic-record-queue";
import ISegment from "../../models/segments/segment";

export default class HttpTrafficMeaningMaker implements IHttpTrafficMeaningMaker {
	public SegmentTrafficRecordIntoDigestibleParts(record: IHttpTrafficRecord): IHttpTrafficRecordMeaning {
		const parts = record.Request.Url.split("\\");
		const segment: ISegment = {
			Root: parts[0],
			Self: parts[parts.length - 1],
		};

		return {
			...record,
			Segment: segment,
		};
	}

	public AdjustHttpTrafficBatchHistory(
		batch: IHttpTrafficRecordQueue,
		record: IHttpTrafficRecordMeaning,
	): IHttpTrafficRecordQueue {
        batch.
    }
}
