import IHttpTrafficRecordBatchContainer from "./interfaces/i-http-traffic-record-batch-container";
import IHttpTrafficRecordQueue from "./interfaces/i-http-traffic-record-queue";

// count validation (are we missing anything) - can aggregate as we role
export default class HttpTrafficRecordBatchContainer implements IHttpTrafficRecordBatchContainer {
    private _recordHashMap: { [hash: string]: IHttpTrafficRecordQueue };
    
    public constructor(
    ) {
        this._recordHashMap = new Object() as { [hash: string]: IHttpTrafficRecordQueue };
    }

    public AddRecordBatch(queue: IHttpTrafficRecordQueue): string {
        // in below assignment, force cast to Date as we know - at this stage - that a record batch should at
        // least have a start (and also a finish).
        let batchTrafficStart: string = 
            (queue.GetTrafficStart() as Date)
                .getTime()
                .toString();
        let hash: string = `id-${batchTrafficStart}`;

        // This is garbage code to attempt to avoid collisions. Were the implementation of this solution to
        // change or were we to choose to import a library, this code would not be necessary. Quick and dirty.
        while (this._recordHashMap[hash]) {
            hash = `id-${batchTrafficStart}-${(Math.random() * 1000).toString()}`
        }
        
        console.log(hash);
        this._recordHashMap[hash] = queue;

        return hash;
    }

    public GetRecordBatch(id: string): IHttpTrafficRecordQueue | undefined {
        return this._recordHashMap[id];
    }
}
