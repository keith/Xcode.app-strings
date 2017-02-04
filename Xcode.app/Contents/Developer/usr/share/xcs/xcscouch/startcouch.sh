#!/bin/bash
ulimit -n 4096
cd /Library/Developer/XcodeServer/CurrentXcodeSymlink/Contents/Developer/usr/share/xcs/CouchDB
exec ./bin/couchdb -a /Library/Developer/XcodeServer/Configuration/xcscouch.ini
