#!/bin/sh
# compile-proto.sh
# NanoPassbook
# Created by Morgan Grainger on 2/5/14.
# Copyright 2014 Apple Inc. All rights reserved.
# (Copied from GeoServices)
cd `dirname $0`
PROTO_DIR=.
LOOKUP=$PROTO_DIR/RequestTypeCodes.plist
PBB_OUTDIR=.
compile()
PROTO="$1"
OUTDIR="$2"
shift
shift
echo
echo +++++++ COMPILING $PROTO +++++++
echo
if [ ! -e "$OUTDIR" ] ; then
mkdir -p "$OUTDIR"
xcrun -sdk iphoneos protocompiler \
--outputDir $OUTDIR \
--proto $PROTO $@ \
--emitDeprecated=NO \
--arc
ret=$?
if [ "$ret" -ne "0" ] ; then
echo "Compilation failed with exit code $ret"
exit $ret
# # Search, Directions, Geocoding
compile $PROTO_DIR/BeamBridge.proto $PBB_OUTDIR
exit 0
