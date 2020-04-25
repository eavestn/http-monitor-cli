import HttpTrafficRecordQueue from "./http-traffic-record-queue";

// count validation (are we missing anything) - can aggregate as we role
export default class HttpTrafficRecordBatchContainer {
    public constructor(
        private _recordHashMap: { [hash: string]: HttpTrafficRecordQueue },
    ) {
        // do nothing ...
    }

    public AddRecordBatch(record: HttpTrafficRecordQueue): string {
        // in below assignment, force cast to Date as we know - at this stage - that a record batch should at
        // least have a start (and also a finish).
        let batchTrafficStart: string = 
            (record.GetTrafficStart() as Date)
                .getMilliseconds()
                .toString();
        let hash: string = `id-${batchTrafficStart}`;

        // This is garbage code to attempt to avoid collisions. Were the implementation of this solution to
        // change or were we to choose to import a library, this code would not be necessary. Quick and dirty.
        while (this._recordHashMap[hash]) {
            hash = `id-${batchTrafficStart}-${(Math.random() * 1000).toString()}`
        }
        
        this._recordHashMap[hash] = record;

        return hash;
    }

    public GetRecordBatch(id: string): HttpTrafficRecordQueue | undefined {
        return this._recordHashMap[id];
    }
}
