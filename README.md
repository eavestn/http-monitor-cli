# HTTP CLI Monitor

## Introduction

This project reads in a file from a configurable location - currently defaulted to the `/logs` folder in this project with a sample input file. The file is expected in CSV format. The file is expected to contain records where each record describes an [individual HTTP-based request](./src/models/traffic/interfaces/raw-http-traffic-record.ts). The file is consumed by a series of services responsible for reporting on trends in the CSV HTTP history.

For more information on the structure of this project consult the [**Motivations And Problems** Section][#motivation-and-problems], below. Given the project's parsing of the file into digestible models, more could certainly be accomplished (as well as improved). For more information, please consult the [**Next Steps** Section][#next-steps].

## Running

## Setup

-   env
-   npm

## Motivations And Problems

## Next Steps

-   Build out pipeline for decomposition into JavaScript
-   Clean Up code - probably over engineered.
-   integrate a library for semantic logging
-   Interpreation in class
    Functionality isolation and responsibility isolation at the eventual cost of bad relationships.
