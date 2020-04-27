import * as csv from "csv-parser";
import { createReadStream, PathLike } from "fs";
import { resolve } from "path";
import { config } from "dotenv";
import HttpTrafficRecordFactory from "./factories/http-traffic-record-factory";
import HttpTrafficBatchContainer from "./services/traffic-containers/http-traffic-batch-container";
import HttpTrafficBatcher from "./services/traffic-containers/http-traffic-batcher";
import HttpTrafficMeaningMaker from "./services/meaning-makers/http-traffic-meaning-maker";
import HttpTrafficMonitor from "./services/monitors/http-traffic-monitor";
import { EventEmitter } from "events";
import IRawHttpTrafficRecord from "./models/traffic/interfaces/raw-http-traffic-record";
import TwoMinuteHistory from "./models/history/two-minute-history";

const queue: any[] = [];

const conf = config({
	path: resolve(__dirname, "../.env.dev"),
}) as any;

// Pipe up DI - pseudo containerization
const batchContainer = new HttpTrafficBatchContainer();
const monitorEventEmitter = new EventEmitter();
const httpMeaningMaker = new HttpTrafficMeaningMaker();
const twoMinuteHistory = new TwoMinuteHistory(httpMeaningMaker, batchContainer);
const monitor = new HttpTrafficMonitor(monitorEventEmitter, batchContainer, twoMinuteHistory);
const batcher = new HttpTrafficBatcher(monitorEventEmitter, batchContainer, httpMeaningMaker);

createReadStream(process.env.PATH_TO_HTTP_STREAM_LOG_CSV as PathLike)
	.pipe(csv())
	.on("data", (data: IRawHttpTrafficRecord) => {
		const record = HttpTrafficRecordFactory.CreateHttpTrafficRecord(data);
		batcher.BatchRecord(record);
	})
	.on("end", () => {
		console.log(queue);
	});
