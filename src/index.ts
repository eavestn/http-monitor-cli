// read CSV
// validate structure
//  - if it's garbage, log a warning (discount it from aggregation; semantic logging)
// Task(s):
// - identify potentially problematic IPs
//      o Request type? [GET, POST]
// - watch for overloaded endpoints
// - ENV-based configuration (??) for threshold
// 
// need a way to determine the last period of time
// epochs ?? current time (start time of monitoring window) - time logged
// 
// https://www.npmjs.com/package/csv-parser
// parse to class
// do I conform?
// queue-ish behavior - timebound queue? JS?
// queue-stores the time 
// event-emitting queue stores the values and updates aspects -- properties associated with it
// node-js queue (for sake of time is this a libray) 
// window start - latest entry > 2 min? remove from front of queue, push in, update with q(1)
// need to add tslint
import * as csv from "csv-parser";
import  { createReadStream, PathLike } from "fs";
import { resolve } from "path";
import { config } from "dotenv";
import IRawHttpTrafficRecord from "./models/raw-http-traffic-record";
import HttpTrafficRecordFactory from "./services/http-traffic-record-factory";

const queue: any[] = [];
// init process.env
const conf = config({
    "path": resolve(__dirname, "../.env.dev")
}) as any;


createReadStream(process.env.PATH_TO_HTTP_STREAM_LOG_CSV as PathLike)
    .pipe(csv())
    .on("data", (data: IRawHttpTrafficRecord) => {
        const record = HttpTrafficRecordFactory.CreateHttpTrafficRecord(data);

        console.log(record);
    })
    .on("end", () => {
        console.log(queue)
    })

