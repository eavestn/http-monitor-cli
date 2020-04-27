import IHttpTrafficRecord from "../../../models/http-traffic-record";
import ISegmentMeaning from "../../../models/segments/i-segment-meaning";

export default interface IHttpTrafficRecordQueue {
	Dequeue(): IHttpTrafficRecord | undefined;
	AdjustMeaning(meaning: { [segment: string]: ISegmentMeaning }): IHttpTrafficRecordQueue;
	Enqueue(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined;
	GetMeaning(): { [segment: string]: ISegmentMeaning };
	GetTrafficFinish(): Date | undefined;
	GetTrafficStart(): Date | undefined;
}
