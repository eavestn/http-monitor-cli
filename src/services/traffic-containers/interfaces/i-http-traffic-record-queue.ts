import ISegmentMeaning from "../../../models/segments/interfaces/i-segment-meaning";
import IHttpTrafficRecord from "../../../models/traffic/interfaces/http-traffic-record";

export default interface IHttpTrafficRecordQueue {
	Dequeue(): IHttpTrafficRecord | undefined;
	AdjustMeaning(meaning: { [segment: string]: ISegmentMeaning }): IHttpTrafficRecordQueue;
	Enqueue(record: IHttpTrafficRecord): IHttpTrafficRecord | undefined;
	GetMeaning(): { [segment: string]: ISegmentMeaning };
	GetTrafficFinish(): Date | undefined;
	GetTrafficStart(): Date | undefined;
	Length(): number;
}
