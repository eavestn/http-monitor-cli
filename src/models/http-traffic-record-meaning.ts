import IHttpTrafficRecord from "./http-traffic-record";
import ISegment from "./segments/segment";

// occurrence paths: [number]
// associated root
// TODO: change Url structure

export default interface IHttpTrafficRecordMeaning extends IHttpTrafficRecord {
	ISegment: ISegment[];
}
