#!/bin/sh
#  DVTImageSetBuildScriptShim.sh
#  DVTKit
#  Created by Joey Hagedorn on 6/28/12.
#  Copyright (c) 2012-2013 Apple, Inc. All rights reserved.
installedHelper=${SYSTEM_DEVELOPER_DIR}/AppleInternal/Tools/DVTImageSetTool
builtHelper=${BUILT_PRODUCTS_DIR}/DVTImageSetTool
helper=""
if [ -f "${builtHelper}" ]
then
helper=$builtHelper
elif [ -f "${installedHelper}" ]
then
helper=$installedHelper
else
echo "Could not locate DVTImageSetTool at either" $builtHelper " or " $installedHelper ". It should have been built with the DVTKit project."
exit -1
outputPath=$DERIVED_FILES_DIR/$INPUT_FILE_BASE.tiff
"${helper}" --input "${INPUT_FILE_PATH}" --output "${outputPath}"
