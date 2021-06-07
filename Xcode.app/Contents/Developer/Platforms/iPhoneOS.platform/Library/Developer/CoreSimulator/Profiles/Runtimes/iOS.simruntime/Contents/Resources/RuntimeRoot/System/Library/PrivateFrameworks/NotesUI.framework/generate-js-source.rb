#!/usr/bin/ruby
# generate-js-source.rb
# Created by Jason Townsend on 9/19/2017.
# Copyright 2010-2017 Apple Inc. All rights reserved.
# Stolen from Safari's gemnerate-reader-source.rb
# Usage: generate-js-source.rb [mode]
#         --generate-embed FILE        Generate embedded C++ source and header for FILE
#         --help                       Display this screen
# Run this script to re-generate NotesWKWebViewUserScript.h, NotesWKWebViewUserScript.m anytime you modify the NotesWKWebViewUserScript.js file
# Makes it much easier to debug the Javascript.
require 'base64'
require 'enumerator'
require 'erb'
require 'open3'
require 'optparse'
# Define the ERB template used to generate the header source file.
@headerFileTemplate = %q{
  //
  //  <%= className %>.h
  //  Notes
  //
  //  Created by Jason Townsend on <%= Time.now.strftime(fmt="%m/%d/%Y") %>.
  //  Copyright <%= Time.now.strftime(fmt="%Y") %> Apple Inc. All rights reserved.
  //
  extern NSString *const <%= className %>String;
}.gsub(/\A\n|^  /, '')
# Define the ERB template used to generate the .m source file.
@sourceFileTemplate = %q{
  //
  //  <%= className %>.m
  //  Notes
  //
  //  Created by Jason Townsend on <%= Time.now.strftime(fmt="%m/%d/%Y") %>.
  //  Copyright <%= Time.now.strftime(fmt="%Y") %> Apple Inc. All rights reserved.
  //
  #import "<%= dstHeaderPath %>"
  NSString *const <%= className %>String = @""
      "<%= source %>"
}.gsub(/\A\n|^  /, '')
def generateSourceToEmbed(sourceFile)
  className = File.basename(sourceFile, ".js")
  dstHeaderPath = className + ".h"
  dstSourcePath = className + ".m"
    source = IO.read(sourceFile).gsub(/\\/, "\\\\\\").gsub(/[\"]/, "\\\"").gsub(/[\n]/, "\\n\"\n    \"")
  # Generate the header file from the template and write it to disk.
  File.open(dstHeaderPath, "w") do |file|
    headerFileERB = ERB.new(@headerFileTemplate, 0, "%<>")
    file.write(headerFileERB.result(binding))
  end
  # Generate the source file from the template and write it to disk.
  File.open(dstSourcePath, "w") do |file|
    sourceFileERB = ERB.new(@sourceFileTemplate, 0, "%<>")
    file.write(sourceFileERB.result(binding))
  end
# Parse the command-line arguments and actually execute the script.
options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: generate-js-source.rb [mode]"
  opts.on("--generate-embed FILE", "Generate embedded Objective-C source and header for FILE") do |file|
    generateSourceToEmbed(file)
  end
  opts.on("--help", "Display this screen") do
    puts opts
  end
  if ARGV.empty?
    puts opts
  end
end.parse!
