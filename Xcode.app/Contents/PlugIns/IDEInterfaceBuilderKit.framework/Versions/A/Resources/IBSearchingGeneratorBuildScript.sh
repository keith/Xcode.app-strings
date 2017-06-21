#!/bin/sh
#  IBSearchingGeneratorBuildScript.sh
#  IDEInterfaceBuilder
#  Created by Tony Ricciardi on 10/14/13.
#  Copyright 2013 Apple Inc. All rights reserved.
installedGenerator=${IDE_DEVELOPER_DIR_FOR_BUILD}/AppleInternal/Tools/IBSearchingGenerator
builtGenerator=${BUILT_PRODUCTS_DIR}/IBSearchingGenerator
generator=""
if [ -f "${builtGenerator}" ]
then
    generator=$builtGenerator
elif [ -f "${installedGenerator}" ]
then
    generator=$installedGenerator
else
    echo "Could not locate IBSearchingGenerator at either" $builtGenerator " or " $installedGenerator ". It should have been built with the IDEInterfaceBuilder project."
    exit -1
"${generator}" "${SCRIPT_OUTPUT_FILE_0}" "${SCRIPT_INPUT_FILE_0}" "${SCRIPT_INPUT_FILE_1}"
