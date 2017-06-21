#!/usr/bin/env python
# encoding: utf-8
import  argparse
from    CoreAutomation
import *
from    tests
import *
from    presub              import *
from    systempass          import *
from    customtest          import *
def check_arguments(interfaces, wifi_network):
    all_good = True
    
    if ('w' in interfaces) and (not wifi_network):
        all_good = False
        print 'Must specify wifi network name and password to test WiFi and AWDL.'
    return all_good
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Script for multidevice Multipeer Connectivity testing.")
    subparsers = parser.add_subparsers(dest='command',      help='sub-command help')
    
    parser_parent       = argparse.ArgumentParser(add_help=False)
    parser_parent.add_argument("-w", "--wifi-network",      help="WiFi network name.")
    parser_parent.add_argument("-p", "--wifi-password",     help="WiFi password.")
    parser_parent.add_argument("-i", "--interfaces",        default="x",
                                                            help="Select interfaces to test: a - AWDL, "
                               "w - WiFi and AWDL, b = Bluetooth, "
                               "x - all, m = mixed")
    parser_parent.add_argument("--include-host",            action='store_true',
                                                            help="Include macOS host machine in the test.")
                               
    # custom test parser
    parser_custom 
= subparsers.add_parser('custom',   help='Run individual tests.', parents=[parser_parent])
    parser_custom.add_argument("testName", choices=MCGetTestNames(), help="Name test to run.")
    # presub parser
    parser_presub 
= subparsers.add_parser('presub',   help='Run presubmission test.', parents=[parser_parent])
    
    parser_presub.add_argument("-r", "--runs",              default=1,
                                                            help="Number of runs.")
                                                            
    # systempass parser
    syspass_presub 
= subparsers.add_parser('systempass',
                                                            help='Run system pass test.', parents=[parser_parent])
    
    args            = parser.parse_args()
    command         = args.command
    wifi_network
= args.wifi_network
    wifi_password   = args.wifi_password
    interfaces      = args.interfaces
    include_host    = args.include_host
    
    if interfaces:
        interfaces = interfaces.lower()
    
    args_are_good   = check_arguments(interfaces, wifi_network)
    if not args_are_good:
        sys.exit(1)
    
    # perform command
    if      command == 'custom':
        test_name       = args.testName
    
        custom_test(test_name, wifi_network, wifi_password, interfaces, include_host)
    
    elif    command == 'presub':
        runs            = args.runs
        presub(wifi_network, wifi_password, runs, interfaces, include_host)
    elif    command == 'systempass':
        systempass(wifi_network, wifi_password, interfaces, include_host)
