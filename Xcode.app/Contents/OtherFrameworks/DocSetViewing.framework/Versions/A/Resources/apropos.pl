#! /usr/bin/perl -w
use FindBin qw ($Bin);
use strict;
my $debugging = 0;
my $searchString;
my $inputString;
if ($debugging) {
#    $searchString = "uplevel";
#    $inputString = "uplevel(n)               - Execute a script in a different stack frame";
#    $searchString = "chmod";
#    $inputString = "chmod(1)                 - change file modes\nchmod(2), fchmod(2)      - change mode of file";
    $searchString = "scr_dump";
    $inputString = "scr_dump(3x), scr_restore(3x), scr_init(3x), scr_set(3x) - read (write) a curses screen from (to) a file";
} else {
    $searchString = $ARGV[0];
    $inputString = $ARGV[1];
my @inLines = split(/\n/, $inputString);
my @outLines;
my $postLink = "</a> ";
foreach my $inLine (@inLines) {
    my $commandString;
    my $description;
    ($commandString, $description) = split(/\s+\-\s+/, $inLine);
    my @commands = split(/, /, $commandString);
    my $linkedCommandString;
    # all commands are on the same page, the one with the name of the first command
    # so we grab the first command
    my ($command, $section) = &getCommandAndSection($commands[0]);
    my $preAnchor = "<a href=\"man://$command/$section\">";
    my $postAnchor = "</a>";
    $linkedCommandString = join(", ", @commands);  # put commas between links
    $linkedCommandString = $preAnchor.$linkedCommandString.$postAnchor;
    if(!defined($description)){$description = " ";}; # some pages are missing descriptions
    my $newLine = "$linkedCommandString - $description";
    push (@outLines, $newLine);
my $preamble = "<html>\n<head>\n\t<title>Search Results for $searchString</title>\n</head>\n<body>\n<h1>Search Results for  <tt>$searchString</tt></h1><hr>\n<blockquote>\n";
my $postamble = "\n</blockquote>\n</body>\n</html>\n";
my $searchBody = join("<br>\n", @outLines);
my $outputString = $preamble.$searchBody.$postamble;
print $outputString;
sub getCommandAndSection {
    my $commandString = shift;
    
    $commandString =~ /([^(]+)\((.*)\)/;
    my $command = $1;
    my $section = $2;
    if (!length($section)) {$section=1;};
    return ($command, $section);
