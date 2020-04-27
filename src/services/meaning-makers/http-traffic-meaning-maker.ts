import IHttpTrafficMeaningMaker from "./interfaces/i-http-traffic-meaning-maker";
import IHttpTrafficRecordQueue from "../traffic-containers/interfaces/i-http-traffic-record-queue";
import ISegment from "../../models/segments/segment";
import SegmentMeaning from "../../models/segments/segment-meaning";
import IHttpTrafficRecordMeaning from "../../models/traffic/interfaces/http-traffic-record-meaning";
import IHttpTrafficRecord from "../../models/traffic/interfaces/http-traffic-record";

export default class HttpTrafficMeaningMaker implements IHttpTrafficMeaningMaker {
	public SegmentTrafficRecordIntoDigestibleParts(record: IHttpTrafficRecord): IHttpTrafficRecordMeaning {
		const parts = record.Request.Url.replace(/^\/+/g, "").split("/");
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
		const meaning = batch.GetMeaning();

		if (!meaning[record.Segment.Self]) {
			meaning[record.Segment.Self] = new SegmentMeaning();
			meaning[record.Segment.Self].Segment = record.Segment;
		}

		meaning[record.Segment.Self].AdjustOrAddCode(record.Status).AdjustOrAddRemoteHosts(record.RemoteHost);
		meaning[record.Segment.Self].Bytes += record.Bytes;
		meaning[record.Segment.Self].Hits += 1;

		return batch.AdjustMeaning(meaning);
	}
}
