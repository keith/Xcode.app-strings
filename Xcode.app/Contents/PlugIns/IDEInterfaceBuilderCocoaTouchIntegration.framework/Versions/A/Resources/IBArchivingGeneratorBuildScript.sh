#!/bin/sh
#  IBArchivingGeneratorBuildScript.sh
#  IDEInterfaceBuilder
#  Created by Jonathan Hess on 4/4/11.
#  Copyright 2011 Apple Inc. All rights reserved.
installedGenerator=${IDE_DEVELOPER_DIR_FOR_BUILD}/AppleInternal/Tools/IBDocumentArchivingGenerator
builtGenerator=${BUILT_PRODUCTS_DIR}/IBDocumentArchivingGenerator
generator=""
if [ -f "${builtGenerator}" ]
then
    generator=$builtGenerator
elif [ -f "${installedGenerator}" ]
then
    generator=$installedGenerator
else
    echo "Could not locate IBDocumentArchivingGenerator at either" $builtGenerator " or " $installedGenerator ". It should have been built with the IDEInterfaceBuilder project."
    exit -1
"${generator}" "${INPUT_FILE_PATH}" "${DERIVED_FILES_DIR}/${INPUT_FILE_BASE}DocumentArchiving.h" "${DERIVED_FILES_DIR}/${INPUT_FILE_BASE}DocumentArchiving.m" "${DERIVED_FILES_DIR}/${INPUT_FILE_BASE}DocumentArchivingSchema.plugindata"
