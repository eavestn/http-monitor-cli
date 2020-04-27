# HTTP CLI Monitor

## Introduction

This project reads in a file from a configurable location - currently defaulted to the `/logs` folder in this project with a sample input file. The file is expected in CSV format. The file is expected to contain records where each record describes an [individual HTTP-based request](./src/models/traffic/interfaces/raw-http-traffic-record.ts). The file is consumed by a series of services responsible for reporting on trends in the CSV HTTP history.

For more information on the structure of this project consult the [**Motivations And Problems** Section](#motivations-and-problems), below. Given the project's parsing of the file into digestible models, more could certainly be accomplished (as well as improved). For more information, please consult the [**Next Steps** Section](#next-steps).

## Setup

### Environment Requirements

Setting up `http-monitor-cli` is easy as long as you have the tools on your machine. You will definitely need [Node.js](https://nodejs.org/en/) (at least LTS) and [NPM](https://www.npmjs.com/get-npm) locally to run this project. If you don't have those, please follow the documentation on the respective websites to install on your machine (theoretically NPM is packaged with Node.js). To validate you have both on your machine you can issue the simple version commands:

```
node -v
```

and

```
npm -v
```

If successful, you should see a series of digits logged to your console, such as: `v10.15.3`.

### Project Setup

After cloning this repository, run `npm install` from the root of the project.

```
cd <directory cloned>/http-monitor-cli
npm install
```

Directories and other configurations necessary for this project's execution are read from a `.env` file. Currently, which file is used - [.env.dev](./.env.dev) - is hard coded in [index.ts](./src/index.ts). The provided configuration looks like:

```
PATH_TO_HTTP_STREAM_LOG_CSV=./logs/http-history.csv
AVG_TRAFFIC_PER_SECOND=10
```

Two configurations are necessary to run this project (as seen above): `PATH_TO_HTTP_STREAM_LOG_CSV` and `AVG_TRAFFIC_PER_SECOND`. Consult the below table for each configuration and its meaning:

|         Configuration         | Description                                                                                           |
| :---------------------------: | :---------------------------------------------------------------------------------------------------- |
| `PATH_TO_HTTP_STREAM_LOG_CSV` | The path to the `.csv` file containing the traffic logs for a period of HTTP requests.                |
|   `AVG_TRAFFIC_PER_SECOND`    | The expected average number of requests per second. Above and below which an alert will be triggered. |

## Running

Running the project requires use of `ts-node` (installed through `npm install` in **Project Setup**); however, you may not have `ts-node` installed globally on your machine. To overcome this, we will run the project using `npx`. To start the project, run the following command:

```
npx ts-node ./src/index.ts
```

## Motivations And Problems

In initially composing this project, my main focus was trying to represent the requirements of the project using familiar data structures and utilizing those data structures to communicate information to the user of the project. The other motivation was to ensure each functional (non-model; service-like) class was as well-encapsulated as possible ensuring that each class accomplished one task and accomplished that task well. The attempt was to compose a series of classes that were extensible or reusable.

A number of the exposed properties on the [models](./src/models) are not used by the curren't project's implemenation. The reason for exposing these is to demonstrate to further contributors what type of data we _are_ currently collecting from the log and are able in the future to report on.

## Next Steps

1. Functionality and responsibility isolation resulted in unclear relationships. These relationships and shared functionalities could be simplified to enable readers of the code to better follow what is happening "under the hood".
1. Currently using `ts-node` - installed as a development `-D` package. This is not intended for production deployment and a transpilation process is needed to create a distributable for this code.
1. Logging is sparse and makes use of the Engine's exposed `console` object. Ideally, logging would be semantic in nature and the output destination configurable, i.e. file or console. This would probably require the integration of a semantic-logging-compliant library.
1. Self documentation could be much stronger.
