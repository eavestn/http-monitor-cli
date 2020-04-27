import ISegment from "../segment";

export default interface ISegmentMeaning {
	Segment: ISegment;
	Hits: number;
	Codes: { [Status: number]: number };
	RemoteHosts: { [Host: string]: number };
	Bytes: number;

	AdjustOrAddCode(status: number): ISegmentMeaning;
	AdjustOrAddRemoteHosts(host: string): ISegmentMeaning;
}
