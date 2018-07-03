#!/bin/sh
#  IBHelperToolShim.sh
#  Copyright (c) 2012-2018 Apple, Inc. All rights reserved.
helperTool=$1
installedHelper=${SYSTEM_DEVELOPER_DIR}/AppleInternal/Tools/${helperTool}
builtHelper=${BUILT_PRODUCTS_DIR}/${helperTool}
helper=""
if [ -f "${builtHelper}" ]
then
    helper=$builtHelper
elif [ -f "${installedHelper}" ]
then
    helper=$installedHelper
else
    echo "Could not locate ${helperTool} at either" $builtHelper " or " $installedHelper ". It should have been built with the DVTKit project."
    exit -1
outputPath="${DERIVED_FILES_DIR}/${INPUT_FILE_BASE}.${outputFileExtension}"
"${helper}" --input "${INPUT_FILE_PATH}" --output "${SCRIPT_OUTPUT_FILE_0}"
