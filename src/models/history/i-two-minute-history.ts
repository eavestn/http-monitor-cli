import IHttpTrafficRecordQueue from "../../services/traffic-containers/interfaces/i-http-traffic-record-queue";

export default interface ITwoMinuteHistory {
	EnqueueHistory(batchId: string): ITwoMinuteHistory;
}
