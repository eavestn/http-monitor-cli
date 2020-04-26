import ISegment from "./segment";

export default interface ISegmentMeaning {
	Segment: ISegment;
	Hits: number;
	Codes: { Code: number; Occurences: number }[];
	RemoteHosts: { Host: string; Occurences: number }[];
	Bytes: number;
}
