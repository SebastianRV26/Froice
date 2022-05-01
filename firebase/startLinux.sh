#!/bin/sh

npx kill-port 7000
npx kill-port 8080
firebase emulators:start