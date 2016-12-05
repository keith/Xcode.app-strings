#!/usr/bin/perl
# $Log: CallbackGenerator.pl,v $
# Revision 1.2  1999/04/01 23:59:04  ericsc
# Do not generate glue for callbacks that are not in Carbon.
# Revision 1.1  1999/03/23 01:44:23  wilkes
# Moved from CarbonCore.
# Revision 1.1.1.1  1999/03/22 06:54:16  jiarocci
# Initial checkin.
# Revision 1.1  1999/03/10 01:19:24  wilkes
# Moved from UnixTools/scripts, which no longer exists.
# Revision 1.2  1998/12/06 04:50:05  ganatra
# Make the include paths a little easier to read and stuff.
# Revision 1.1  1998/12/06 04:46:45  ganatra
# New today
local($gScanForTypeEnabled) = 0;
local($gNotInThisBlock) = 0;
local($gFoundType) = "";
local($gFoundCallProc) = "";
local($gFoundParams) = "";
local($gCurrentHeader) = "";
# Start by printing the input files as #includes.
print "\/\* This file was created by CallbackGenerator Perl script as part of the build. \*\/\n";
print "\/\* Modifying it is likely to be futile. \*\/\n\n";
print "\#define MIXEDMODE_CALLS_ARE_FUNCTIONS 1\n";
print "\n";
foreach $gCurrentHeader (@ARGV)
local($trimmedfile) = $gCurrentHeader;
$trimmedfile =~ s/((\S*)\/)*//g;
# Strip all characters except the final pathname
# Whoa!  I got this line right on the first try!
# Sometimes you feel like a nut, sometimes you don't
print "\#include \<" . $trimmedfile . "\>\n";
print "\n";
foreach $gCurrentHeader (@ARGV)
&ProcessHeader();
# The guts, baby.
sub ProcessHeader
open (gCurrentHeader) || die "Can't open the header: $gCurrentHeader\n";
print "/* " . $gCurrentHeader . " */\n\n";
while (<gCurrentHeader>)
SWITCH:
m/^\s*\#if\s+MIXEDMODE_CALLS_ARE_FUNCTIONS\s*/
&& !$gNotInThisBlock &&
# Start looking for function calls now that the MIXEDMODE_CALLS_ARE_FUNCTIONS
# conditional has been found.
$gScanForTypeEnabled = 1;
last  SWITCH;
m/\s*EXTERN_API\s*\((\S+)\)\s*\n$/
&& $gScanForTypeEnabled && do
# The return type has been found in "EXTERN_API(<RightHere>)"
$gFoundType = $1;
last  SWITCH;
m/^\s*Call(\S+)Proc\s*\(\s*(.+)([\,\)\;]+)$/
&& $gFoundType && do
local($oneParameter);
local($tmpParams) = ($2);
# The CallXXXProc and the first parameters were found in
# "CallOldCanCalibrateProc (OldCanCalibrateUPP userRoutine,"
$gFoundCallProc = $1;
$oneParameter = ($3 =~ m/\;/);
if ($oneParameter)
$gFoundParams = $tmpParams;
chop($gFoundParams);
$gFoundParams .= " ";
###################### print "One Param: gFoundParams is" . $gFoundParams . "\n";
&DumpContents();
else
$gFoundParams = $2 . " " . $3 . " ";
last  SWITCH;
m/^\s*(.+)\,$/
&& $gFoundCallProc && do
# More parameters were found in "OldCanCalibrateUPP userRoutine,"
$gFoundParams .= $1 . " " . $2 . ", ";
last  SWITCH;
m/^\s*(.+)\)\;$/
&& $gFoundCallProc && do
# The closing parameter was found in "OldCanCalibrateUPP userRoutine);"
# so dump the whole shebang along with the NewXXXProc call.
&DumpContents();
last  SWITCH;
m/^\s*\#else\s*$/
&& $gScanForTypeEnabled && do
# The #else keyword was found, so stop searching for CallXXXProc calls
$gScanForTypeEnabled = 0;
$gFoundParams = "";
$gCurrentHeader = "";
last  SWITCH;
m/^\s*\#if OLDROUTINENAMES\s*/
&& do
# CMCalibrator.h needs this, because life would be too good without needing it.
$gNotInThisBlock = 1;
last  SWITCH;
m/^\s*\#endif\s*\/\*\s*OLDROUTINENAMES\s*\*\/\s*/
&& do
# #endif indicator for OLDROUTINENAMES
$gNotInThisBlock = 0;
last  SWITCH;
m/^\s*\#if CALL_NOT_IN_CARBON\s*/
&& do
# Don't generate glue for callbacks that aren't in Carbon.
$gNotInThisBlock = 1;
last  SWITCH;
m/^\s*\#endif\s*\/\*\s*CALL_NOT_IN_CARBON\s*\*\/\s*/
&& do
# #endif indicator for CALL_NOT_IN_CARBON
$gNotInThisBlock = 0;
last  SWITCH;
# Prints a function in the form:
# SomeTypeUPP NewSomeTypeProc(SomeTypeProcPtr userRoutine)
return (SomeTypeUPP) userRoutine;
sub PrintNewXXXProc
print "$gFoundCallProc" . "UPP New" . $gFoundCallProc . "Proc(" . $gFoundCallProc . "ProcPtr userRoutine)\n";
print "{\n";
print "\treturn ($gFoundCallProc" . "UPP) userRoutine;\n";
print "}\n";
print "\n";
sub DumpContents
local($foldedparams);
local($arrayindex) = 0;
local($callprocparams);
$gFoundParams .= $1 . " " . $2;
$foldedparams = $gFoundParams;
$foldedparams =~ s/ \,/\,/g;
# strip all spaces around comma chars
$foldedparams =~ s/(\S*)\*\s*/$1 \*/g;
# format all params to be "Type *name"
$foldedparams =~ s/\s+/ /g;
# fold all multi-whitespace chars into one
chop($foldedparams);
# get rid of that last space
&PrintNewXXXProc();
# print out the NewXXXProc routine.
print "$gFoundType Call" . $gFoundCallProc . "Proc(" . $foldedparams . ")\n";
$foldedparams =~ s/\s*\*\s*/ /g;
$foldedparams = $foldedparams . ",";
@locarray = split(/ /,$foldedparams);
# Scan for the first parameter, because we have to put a special parameter right
# after it.
for ($[ .. $#locarray)
$arrayindex = $_;
if ($locarray[$_] =~ m/(\S+),/)
last;
$arrayindex = $arrayindex + 1;
for ($arrayindex .. $#locarray)
if ($locarray[$_] =~ m/(\S+),/)
$callprocparams .= $locarray[$_] . " ";
chop($callprocparams);
chop($callprocparams);
print "{\n\t";
if (!($gFoundType =~ m/^void$/))
print "return ($gFoundType) ";
print "(*($gFoundCallProc" . "ProcPtr) userRoutine)($callprocparams);\n";
print "}\n";
print "\n";
$gFoundCallProc = "";
$gFoundType = "";
