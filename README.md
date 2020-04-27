# HTTP CLI Monitor

## Introduction

This project reads in a file from a configurable location - currently defaulted to the `/logs` folder in this project with a sample input file. The file is expected in CSV format. The file is expected to contain records where each record describes an [individual HTTP-based request](./src/models/traffic/interfaces/raw-http-traffic-record.ts). The file is consumed by a series of services responsible for reporting on trends in the CSV HTTP history.

For more information on the structure of this project consult the [**Motivations And Problems** Section](#motivation-and-problems), below. Given the project's parsing of the file into digestible models, more could certainly be accomplished (as well as improved). For more information, please consult the [**Next Steps** Section](#next-steps).

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

Two configurations are necessary to run this project (as seen above): `PATH_TO_HTTP_STREAM_LOG_CSV` and `AVG_TRAFFIC_PER_SECOND`.

Consult the below table for their meaning:

|         Configuration         | Description                                                                                           |
| :---------------------------: | :---------------------------------------------------------------------------------------------------- |
| `PATH_TO_HTTP_STREAM_LOG_CSV` | The path to the `.csv` file containing the traffic logs for a period of HTTP requests.                |
|   `AVG_TRAFFIC_PER_SECOND`    | The expected average number of requests per second. Above and below which an alert will be triggered. |

## Running

## Motivations And Problems

## Next Steps

-   Build out pipeline for decomposition into JavaScript
-   Clean Up code - probably over engineered.
-   integrate a library for semantic logging
-   Interpreation in class
    Functionality isolation and responsibility isolation at the eventual cost of bad relationships.

7x acquisition based
11,400
