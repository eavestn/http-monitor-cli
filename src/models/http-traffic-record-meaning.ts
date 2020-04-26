import IHttpTrafficRecord from "./http-traffic-record";
import ISegment from "./segments/segment";

export default interface IHttpTrafficRecordMeaning extends IHttpTrafficRecord {
	Segment: ISegment;
}
