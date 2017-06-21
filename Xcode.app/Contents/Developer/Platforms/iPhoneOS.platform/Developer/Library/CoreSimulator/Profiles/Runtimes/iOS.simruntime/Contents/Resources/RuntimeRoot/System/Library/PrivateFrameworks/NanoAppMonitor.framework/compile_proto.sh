#!/bin/sh
#  compile_proto.sh
#  NanoResourceGrabber
#  Created by Dave Donley on 2/7/14.
#  Copyright (c) 2014 Apple Inc. All rights reserved.
cd `dirname $0`
if [ ! -e ./generated ] ; then
    mkdir ./generated
rm -f ./generated/*
xcrun -sdk iphoneos protocompiler --arc --outputDir ./generated --proto nam.proto
exit $?
