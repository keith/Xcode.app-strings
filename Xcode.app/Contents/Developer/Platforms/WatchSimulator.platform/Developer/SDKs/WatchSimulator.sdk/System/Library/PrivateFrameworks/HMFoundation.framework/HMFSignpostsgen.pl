#! /usr/bin/perl
use strict;
use IO::File;
use Data::Dumper;
if(scalar(@ARGV)!=3 or $ARGV[0]=~/^-h/)
    print("HMSignpostgen.pl - generate .plist and .h file from a defintion ".
          "file.\n");
    print("\n");
    print("usage:\n");
    print("   HMSignpostgen.pl <.txt input> <.h output> <.plist output>\n");
    print("\n");
    print("Output files are always overwriten in the case of success.\n");
    print("See HMSignpost.txt for details of the syntax and behavior.\n");
    exit(1);
# Total trace code range from 0 to 16383.
my($section_id_range)=2048;
my($homekit_group)=28;
my($in)=IO::File->new($ARGV[0], 'r');
my($linein);
my(@tags, @previous);
my($line)=0;
while(defined($linein=<$in>))
    chomp($linein);
    $line++;
    if($linein=~/^(?:#.*|\s*)$/)
    {
        next;
    }
    if(!($linein=~/^([0-9A-Za-z_]+)\s+(\S+)\s*(?:(\S*)\s*)?/x))
    {
        die("unable to parse line $line of ".$ARGV[0]);
    }
    my($name, $type, $options, %options)=($1, $2, $3);
    if($type eq "SECTION")
    {
        if ($name eq '')
        {
            die("Section prefix shouldn't be empty!");
        }
        if ($options eq '')
        {
            print("WARNING: Section name is empty. Will use section prefix as section name in .plist!");
            $options = $name;
        }
        push(@tags, { line => $line, section_prefix => $name, type => $type, section_name => $options });
        next;
    }
    # Tighten the rules since non-section-name lines should not contain lower-case letters.
    if(!($linein=~/^([0-9A-Z_]+)\s+(\S+)\s*(?:(\S*)\s*)?/x))
    {
        die("unable to parse line $line of ".$ARGV[0]);
    }
    if(!($type=~/^(?:INTERVAL|IMPULSE|LEVEL|DELTALEVEL)$/))
    {
        die("signpost on line $line has an invalid type (should be ".
            "'INTERVAL', 'IMPULSE', 'LEVEL', or 'DELTALEVEL').");
    }
    @previous=grep { ${$_}{name} eq $name && ${$_}{type} eq $type } @tags;
    if(scalar(@previous))
    {
        die("a $type signpost named $name was previously defined on ".
            "line ".${$previous[-1]}{line});
    }
    while($options ne '')
    {
        if(!($options=~/\s*([^=,]+)(?:=([^,]*))?,?(.*)/x)) {
            die("unable to parse remainder of options line '$options' at ".
                "line $line of ".$ARGV[0]);
        }
        $options{$1}=$2;
        $options=$3;
    }
    push(@tags, { line => $line, tag => $name, type => $type, options => { %options }} );
my($_tag, %tag);
my(@plist, @header);
my($section_prefix)="NA";
my($id, $section_number)=(0, 0);
foreach $_tag (@tags) {
    %tag=%{$_tag};
    if($tag{type} eq 'SECTION')
    {
        $section_prefix = $tag{section_prefix};
        if($id ne 0)
        {
            push(@plist, "     </array>");
            push(@plist, "</dict>");
            push(@header, "");
            $section_number++;
            if ($id >= $section_number * $section_id_range)
            {
                die("Current trace code $id is larger than the pre-defined section range $section_id_range!");
            }
            $id = $section_number * $section_id_range;
        }
        push(@plist, "<dict>");
        push(@plist, "    <key>Name</key>");
        push(@plist, sprintf("    <string>%s</string>", $tag{section_name}));
        push(@plist, "    <key>Children</key>");
        push(@plist, "    <array>");
        next;
    }
    push(@plist, "        <dict>");
    push(@plist, "            <key>Name</key>");
    push(@plist, sprintf("            <string>%s_%s_%s</string>", $section_prefix, $tag{tag}, $tag{type}));
    push(@plist, "            <key>Component</key>");
    push(@plist, sprintf("            <string>%d</string>", $homekit_group));
    push(@plist, "            <key>EventsMatchedBy</key>");
    push(@plist, "            <string>Process</string>");
    push(@plist, "            <key>Type</key>");
    if($tag{type} eq 'INTERVAL')
    {
        if(exists(${${tag}{options}}{tag}))
        {
            push(@header, sprintf("#define HMS_%s_%s_ENTER(_X_) kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, _X_, 0, 0);", $section_prefix, $tag{tag}, $homekit_group, $id));
            push(@header, sprintf("#define HMS_%s_%s_EXIT(_X_) kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, _X_, 0, 0);", $section_prefix, $tag{tag}, $homekit_group, $id+1));
        }
        else
        {
            push(@header, sprintf("#define HMS_%s_%s_ENTER kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, 0, 0, 0);", $section_prefix, $tag{tag}, $homekit_group, $id));
            push(@header, sprintf("#define HMS_%s_%s_EXIT kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, 0, 0, 0);", $section_prefix, $tag{tag}, $homekit_group, $id+1));
        }
        push(@plist, "            <string>Interval</string>");
        push(@plist, "            <key>CodeBegin</key>");
        push(@plist, sprintf("            <string>%d</string>", $id));
        push(@plist, "            <key>CodeEnd</key>");
        push(@plist, sprintf("            <string>%d</string>", $id+1));
        $id++;
    }
    elsif($tag{type} eq 'IMPULSE')
    {
        if(exists(${${tag}{options}}{tag}))
        {
            push(@header, sprintf("#define HMS_%s_%s_IMPULSE(_X_) kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, _X_, 0, 0);", $section_prefix, $tag{tag}, $homekit_group, $id));
        }
        else
        {
            push(@header, sprintf("#define HMS_%s_%s_IMPULSE kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, 0, 0, 0);", $section_prefix, $tag{tag}, $homekit_group, $id));
        }
        push(@plist, "            <string>Impulse</string>");
        push(@plist, "            <key>Code</key>");
        push(@plist, sprintf("            <string>%d</string>", $id));
    }
    elsif($tag{type} eq 'LEVEL')
    {
        if(exists(${${tag}{options}}{tag}))
        {
            push(@header, sprintf("#define HMS_%s_%s_LEVEL(_X_, _Y_) kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, _X_, 0, _Y_);", $section_prefix, $tag{tag}, $homekit_group, $id));
        }
        else
        {
            push(@header, sprintf("#define HMS_%s_%s_LEVEL(_Y_) kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, 0, 0, _Y_);", $section_prefix, $tag{tag}, $homekit_group, $id));
        }
        push(@plist, "            <string>Level</string>");
        push(@plist, "            <key>Code</key>");
        push(@plist, sprintf("            <string>%d</string>", $id));
        push(@plist, "            <key>LevelArg</key>");
        push(@plist, "            <string>Arg4</string>");
    }
    elsif($tag{type} eq 'DELTALEVEL')
    {
        if(exists(${${tag}{options}}{tag}))
        {
            push(@header, sprintf("#define HMS_%s_%s_DELTALEVEL(_X_, _Y_) kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, _X_, 0, _Y_);", $section_prefix, $tag{tag}, $homekit_group, $id));
        }
        else
        {
            push(@header, sprintf("#define HMS_%s_%s_DELTALEVEL(_Y_) kdebug_trace(ARIADNEDBG_CODE(%d, %d), __LINE__, 0, 0, _Y_);", $section_prefix, $tag{tag}, $homekit_group, $id));
        }
        push(@plist, "            <string>DeltaLevel</string>");
        push(@plist, "            <key>Code</key>");
        push(@plist, sprintf("            <string>%d</string>", $id));
        push(@plist, "            <key>LevelArg</key>");
        push(@plist, "            <string>Arg4</string>");
    }
    $id++;
    push(@plist, "        </dict>");
#print(Data::Dumper::Dumper(\@header));
#print(Data::Dumper::Dumper(\@plist));
my($header)=IO::File->new($ARGV[1], 'w') || die("unable to open $ARGV[1] for writing ($!).");
my($plist)=IO::File->new($ARGV[2], 'w') || die("unable to open $ARGV[2] for writing ($!).");
$header->print(join("\n", @header)."\n\n");
$plist->print("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
$plist->print(" <!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n");
$plist->print(" <plist version=\"1.0\">\n");
$plist->print(" <array>\n");
$plist->print("     ".join("\n     ", @plist)."\n");
$plist->print("         </array>\n");
$plist->print("     </dict>\n");
$plist->print(" </array>\n");
$plist->print(" </plist>\n");
exit(0);
