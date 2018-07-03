if [ "$PLATFORM_NAME" = "appletvos" ]; then
TESTDEF_PLIST_SRC="${SRCROOT}/SiriViewService/PPTTestDefinitions/testDefinitions-tv.plist"
TESTDEF_PLIST_DEST="${BUILT_PRODUCTS_DIR}/SiriViewService.app/testDefinitions.plist"
cp "$TESTDEF_PLIST_SRC" "$TESTDEF_PLIST_DEST"
elif [ "$PLATFORM_NAME" = "iphoneos" ]; then
TESTDEF_PLIST_SRC="${SRCROOT}/SiriViewService/PPTTestDefinitions/testDefinitions-ios.plist"
TESTDEF_PLIST_DEST="${BUILT_PRODUCTS_DIR}/SiriViewService.app/testDefinitions.plist"
cp "$TESTDEF_PLIST_SRC" "$TESTDEF_PLIST_DEST"
