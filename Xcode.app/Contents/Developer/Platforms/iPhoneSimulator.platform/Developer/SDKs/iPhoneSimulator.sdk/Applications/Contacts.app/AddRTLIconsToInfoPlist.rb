#!/usr/bin/env ruby
# Magic comment, don't delete
# Encoding: utf-8
Encoding::default_external = Encoding::UTF_8
require 'rexml/document'
class InfoPlistBundleIconsRtlManager
# Plist defines
# TODO: Perhaps parse this as an argument?
    PLIST_FILE_PATH = ENV['BUILT_PRODUCTS_DIR'] + '/' + ENV['PRODUCT_NAME'] + '.app/'
PLIST_FILE_NAME = 'Info.plist'
# XML node defines
CF_BUNDLE_ICON_FILES_TEXT_NODE_VALUE = 'CFBundleIconFiles'
CF_BUNDLE_ICON_FILES_TEXT_NODE_RTL_VALUE = 'CFBundleIconFilesRightToLeft'
ICON_FILE_NAME_PREPEND_STRING = 'RTL-'
class << self
def plist_full_path
return PLIST_FILE_PATH + PLIST_FILE_NAME
def icon_file_dict_node_to_rtl(node)
new_node = node.deep_clone
# Inefficient, but the plist is so small it's irrelevant
new_node.get_elements("/key[text()='#{CF_BUNDLE_ICON_FILES_TEXT_NODE_VALUE}']").each { |e|
# Set the value of the file key
e.text = CF_BUNDLE_ICON_FILES_TEXT_NODE_RTL_VALUE
# Down the rabbit hole we go!
# Append the RTL prefix to the image asset file names
e.get_elements('following-sibling::array').first.get_elements('string').each { |s|
s.text = "#{ICON_FILE_NAME_PREPEND_STRING}#{s.text()}"
return new_node
# Public attributes
attr_reader :doc
def initialize(args={})
# Just look pretty for now ...
# Reads the XML document into memory
def parse!
plist_path = self.class.plist_full_path
# PlistHelper will exit the execution of this script if plutil returns a non-zero exit status
# However, the XML processor can ignore and propogate comments; I can re-work the logic to 
# still not fully fail unless REXML barfs an error
xml_doc_string = PlistHelpers.read_plist_at_path(plist_path)
if xml_doc_string.nil? or xml_doc_string.empty?
puts "Fail: The '#{plist_path}' appears to be empty"
exit(1)
@doc = REXML::Document.new(xml_doc_string)
# Provisions the RTL image nodes to the XML document
def add_rtl_icon_properties!
_remove_all_rtl_icon_properties!
rtl_nodes = _icon_file_dict_nodes.each { |node|
rtl_node = InfoPlistBundleIconsRtlManager.icon_file_dict_node_to_rtl(node)
rtl_node.elements.each { |rn|
node.add_element(rn)
private
# File pointer to the plist
@__fp
# Returns an array of REXML::Element of XML type key whose text node 
# matches the CFBundleIconFiles plist key name
def _icon_file_dict_nodes
return _search("//key[text()='#{CF_BUNDLE_ICON_FILES_TEXT_NODE_VALUE}']").map { |e|
e.parent
}.compact
# Searches self with an xpath_query
# Supply optionally a list of variable bindings
Variable binding names begin with $
#   See REXML documentation for more information
def _search(xpath_query, variable_bindings_hash={})
return REXML::XPath.match(@doc, xpath_query, variable_bindings_hash)
# Returns the <key>CFBundleIconFiles</key> nodes
def _ltr_icon_property_key_nodes
return _search("//key[text()='#{CF_BUNDLE_ICON_FILES_TEXT_NODE_VALUE}']")
# Returns the <key>CFBundleIconFilesRightToLeft</key> nodes
def _rtl_icon_property_key_nodes
return _search("//key[text()='#{CF_BUNDLE_ICON_FILES_TEXT_NODE_RTL_VALUE}']")
# Removes all of the RTL icon property nodes (notably so that we can guarantee 
# all current LTR icon properties be written on each execution of this script)
def _remove_all_rtl_icon_properties!
rtl_key_nodes = _rtl_icon_property_key_nodes.each { |n|
parent = n.parent
value_node = n.get_elements("following-sibling::array").first
parent.delete_element(value_node)
parent.delete_element(n)
class PlistHelpers
class << self
# Returns a string representing the XML content of a plist (binary, JSON, or XML)
# This method can be reworked such that the process doesn't crash when a plist has preprocessor macros embedded
def read_plist_at_path(path)
xml_content = nil
if File.exists?(path)
subproc_stdout_contents = IO.popen("plutil -convert xml1 '#{path}' -o -") { |plutil| plutil.read }
if !$?.success?
_propogate_subprocess_error("plutil", subproc_stdout_contents)
exit(1)
else
# TODO: This method shouldn't fail the execution of the entire process
puts "Fail: File '#{path}' does not exist"
exit(1)
return subproc_stdout_contents
# !!*** WILL CLOBBER THE FILE AT THE GIVEN PATH IF IT EXISTS ***!!
# Writes the supplied contents to a plist file at path
# Supply a format optionally (man plutil for more information on formats)
def write_plist_contents_at_path(contents, path, format="binary1")
subproc_stdout_contents = IO.popen("plutil -convert '#{format}' - -o -", 'r+') { |plutil| 
plutil << contents
plutil.close_write
plutil.read
if !$?.success?
_propogate_subprocess_error("plutil", subproc_stdout_contents)
exit(1)
fp = File.new(InfoPlistBundleIconsRtlManager.plist_full_path, 'wb')
fp.write(subproc_stdout_contents)
fp.close
return true
private
# Common method for bubbling subproc error messages and codes
def _propogate_subprocess_error(proc_name, error_string, error_code=1)
puts "Fail: #{proc_name} subprocess failed with error: \n#{error_string}"
if __FILE__ == $0
# Set up the manager
$manager = InfoPlistBundleIconsRtlManager.new
$manager.parse!
$manager.add_rtl_icon_properties!
# Reformat the XML plist with the new RTL elements provisioned
$formatter = REXML::Formatters::Pretty.new(2)
$formatter.compact = true # This formats the plist like Apple does, with text nodes inline with attribute tags
$plist_contents = String.new # Must be an empty string
$formatter.write($manager.doc, $plist_contents) # Write to a variable masquerading as a stream (String can do this)
PlistHelpers.write_plist_contents_at_path($plist_contents, InfoPlistBundleIconsRtlManager.plist_full_path, format="binary1") 
