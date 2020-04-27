import ISegment from "./segment";
import ISegmentMeaning from "./i-segment-meaning";

export default class SegmentMeaning implements ISegmentMeaning {
	public Segment: ISegment = {} as ISegment;
	public Hits: number = 0;
	public Codes: { [Status: number]: number } = {};
	public RemoteHosts: { [Host: string]: number } = {};
	public Bytes: number = 0;

	public AdjustOrAddCode(status: number): ISegmentMeaning {
		if (this.Codes[status]) {
			this.Codes[status] += 1;
		} else {
			this.Codes[status] = 1;
		}

		return this;
	}

	public AdjustOrAddRemoteHosts(host: string): ISegmentMeaning {
		if (this.RemoteHosts[host]) {
			this.RemoteHosts[host] += 1;
		} else {
			this.RemoteHosts[host] = 1;
		}

		return this;
	}
}
