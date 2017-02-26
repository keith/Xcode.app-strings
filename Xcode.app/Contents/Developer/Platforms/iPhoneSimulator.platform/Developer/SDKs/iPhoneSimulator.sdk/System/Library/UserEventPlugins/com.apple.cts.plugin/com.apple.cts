@(#)PROGRAM:com.apple.cts  PROJECT:libxpc-972.50.27
distantFuture
timeIntervalSinceReferenceDate
interval
name
setBaseTime:
baseTime
grace_period
setElapsedTime:
setStartTime:
delay
startTime
elapsedTime
loadBaseTime
advanceBaseTime
resetBaseTime
eligibleTime
deadlineTime
markStarted:
markStopped:
totalElapsed
.cxx_destruct
token
setToken:
seqno
setSeqno:
setName:
connection
setConnection:
peer
setPeer:
unmanaged
setUnmanaged:
setInterval:
setDelay:
setGrace_period:
expected_duration
setExpected_duration:
state
setState:
eligible
setEligible:
das_eligible
setDas_eligible:
bundle_id
setBundle_id:
bgwake_count
setBgwake_count:
power_assertion
setPower_assertion:
setPid:
priority
setPriority:
requires_protection_class
setRequires_protection_class:
repeating
setRepeating:
requires_screen_sleep
setRequires_screen_sleep:
requires_user_inactive
setRequires_user_inactive:
allow_battery
setAllow_battery:
exclusive
setExclusive:
power_nap
setPower_nap:
app_refresh
setApp_refresh:
do_it_later
setDo_it_later:
memory_intensive
setMemory_intensive:
cpu_intensive
setCpu_intensive:
may_reboot_device
setMay_reboot_device:
requires_network_connectivity
setRequires_network_connectivity:
requires_inexpensive_network
setRequires_inexpensive_network:
performs_network_upload
setPerforms_network_upload:
expected_network_transfer_size_bytes
setExpected_network_transfer_size_bytes:
communicates_with_paired_device
setCommunicates_with_paired_device:
schedule_rtc_wake
setSchedule_rtc_wake:
duet_power_budgeted
setDuet_power_budgeted:
bgtask_debug
setBgtask_debug:
_unmanaged
_eligible
_das_eligible
_repeating
_requires_screen_sleep
_requires_user_inactive
_allow_battery
_exclusive
_power_nap
_app_refresh
_do_it_later
_memory_intensive
_cpu_intensive
_may_reboot_device
_requires_network_connectivity
_requires_inexpensive_network
_performs_network_upload
_communicates_with_paired_device
_schedule_rtc_wake
_duet_power_budgeted
_bgtask_debug
_bgwake_count
_power_assertion
_pid
_priority
_requires_protection_class
_token
_seqno
_name
_connection
_peer
_interval
_delay
_grace_period
_expected_duration
_baseTime
_startTime
_elapsedTime
_state
_bundle_id
_expected_network_transfer_size_bytes
alloc
init
copy
countByEnumeratingWithState:objects:count:
UTF8String
removeObject:
stringWithUTF8String:
addObject:
setDay:
setMonth:
setValue:forComponent:
isValidDate
month
minute
hour
weekday
setSecond:
calendar
date
nextDateAfterDate:matchingComponents:options:
setCalendar:
parseComponent:inEvent:
setEveryMinuteIfNothingElseSet
resetFireDate
initWithToken:andEvent:
identifier
components
fireDate
_identifier
_components
_fireDate
calendarWithIdentifier:
numberWithUnsignedLongLong:
setObject:forKey:
currentLocale
descriptionWithLocale:
objectForKey:
removeObjectForKey:
objectForKeyedSubscript:
compare:
earlierDate:
timeIntervalSinceNow
CTSActivityTime
CTSActivity
CTSCalendarInterval
v16@0:8
q16@0:8
v24@0:8q16
Q16@0:8
v24@0:8Q16
@16@0:8
v24@0:8@16
B16@0:8
v20@0:8B16
I16@0:8
v20@0:8I16
i16@0:8
v20@0:8i16
@"NSString"
@"NSObject<OS_xpc_object>"
v32@0:8Q16@24
@32@0:8Q16@24
@"NSDateComponents"
@"NSDate"
ActivityBaseDates
com.apple.xpc.activity2
DateCompleted
DateSubmitted
v12@?0i8
com.apple.system.powermanagement.useractivity
AppleSmartBattery
CurrentCapacity
MaxCapacity
com.apple.system.powersources.source
BackgroundTask
MaintenanceWake
PreventUserIdleSystemSleep
TEMP:%s
AssertName
PlugInBundleID
com.apple.xpc.activity
AssertType
TimeoutAction
TimeoutActionTurnOff
TimeoutSeconds
AssertLevel
AssertionOnBehalfOfPID
token
TQ,N,V_token
seqno
TQ,N,V_seqno
T@"NSString",&,N,V_name
connection
T@"NSObject<OS_xpc_object>",&,N,V_connection
peer
T@"NSObject<OS_xpc_object>",&,N,V_peer
unmanaged
TB,N,V_unmanaged
interval
Tq,N,V_interval
delay
Tq,N,V_delay
grace_period
Tq,N,V_grace_period
expected_duration
Tq,N,V_expected_duration
baseTime
Tq,N,V_baseTime
startTime
Tq,N,V_startTime
elapsedTime
Tq,N,V_elapsedTime
Tq,N,V_state
TB,N,V_eligible
das_eligible
TB,N,V_das_eligible
bundle_id
T@"NSString",&,N,V_bundle_id
bgwake_count
TI,N,V_bgwake_count
power_assertion
TI,N,V_power_assertion
Ti,N,V_pid
priority
Ti,N,V_priority
requires_protection_class
Ti,N,V_requires_protection_class
repeating
TB,N,V_repeating
requires_screen_sleep
TB,N,V_requires_screen_sleep
requires_user_inactive
TB,N,V_requires_user_inactive
allow_battery
TB,N,V_allow_battery
exclusive
TB,N,V_exclusive
power_nap
TB,N,V_power_nap
app_refresh
TB,N,V_app_refresh
do_it_later
TB,N,V_do_it_later
memory_intensive
TB,N,V_memory_intensive
cpu_intensive
TB,N,V_cpu_intensive
may_reboot_device
TB,N,V_may_reboot_device
requires_network_connectivity
TB,N,V_requires_network_connectivity
requires_inexpensive_network
TB,N,V_requires_inexpensive_network
performs_network_upload
TB,N,V_performs_network_upload
expected_network_transfer_size_bytes
Tq,N,V_expected_network_transfer_size_bytes
communicates_with_paired_device
TB,N,V_communicates_with_paired_device
schedule_rtc_wake
TB,N,V_schedule_rtc_wake
duet_power_budgeted
TB,N,V_duet_power_budgeted
bgtask_debug
TB,N,V_bgtask_debug
com.apple.xpc.activity.unmanaged
v16@?0@"NSObject<OS_xpc_object>"8
com.apple.xpc.activity.control
v8@?0
Idle
Active
Battery
com.apple.xpc.activity.debug.trigger
DisableSmartPowerNap
true
act.eligibleTime <= time_now()
is_bgwake() && act.bgtask_debug
false
act.exclusive && running_activity_count > 0
exclusive_activity_count > 0 && act.state != XPC_ACTIVITY_STATE_RUN
eligible
name
state
SoftwareUpdate
Do It Later,%s
Do It Later @ %s,%s
BGTask:%s,%s
background task [%s] @ %s,%s
AppRefresh:%s,%s
app refresh [%s] @ %s,%s
Requirements
ClientInfo
Do It Later
DebugDoItLater
%s (RUNNING)
%s,%s
Smart 
Command
Identifier
List
Debug
Flags
Result
State
BaseTime
Eligible
Deadline
ElapsedTime
SequenceNumber
Interval
GracePeriod
Delay
Priority
Maintenance
Utility
AllowBattery
Repeating
PowerNap
AppRefresh
Exclusive
DoItLater
MayRebootDevice
RequireUserInactive
CPUIntensive
DuetPowerBudgeting
MemoryIntensive
Effective Criteria
<Unknown>
BaseIntervals
BaseSleepInterval
IOPMrootDomain
DarkWakeServices
SleepServices
SleepServicesModes
ModeA
ModeB
ModeC
Expiration
IOEthernetController
IO80211Controller
IOService
IONetworkInterface
IOInterfaceState
BatteryFloor
Month
Hour
Minute
Weekday
com.apple.launchd.calendarinterval
identifier
T@"NSString",R,V_identifier
TQ,V_token
components
T@"NSDateComponents",R,V_components
fireDate
T@"NSDate",R,V_fireDate
calendarinterval
failed to register user idle notification
Control channel connection: %d
evaluating activities
activity timer fired
User %s
%s Power
activities are suspended
Setting %{public}@ eligibility to %s because condition (%s) was met.
Updating XPC Activity: %{public}@ (eligible=%s)
Updating XPC Activity (deferred): %{public}@ (eligible=%s)
%{public}@ state change %ld -> %ld
Initiating XPC Activity: %{public}@
Created temporary power assertion for %{public}@: %d
Deferring XPC Activity: %{public}@
Completed XPC Activity: %{public}@
Rescheduling XPC Activity: %{public}@
releasing power assertion: %d
XPC Activity client connection closed: %{public}@
Unregistered unmanaged XPC Activity: %{public}@
taking power assertion: %{public}@: %d
releasing temporary power assertion: %{public}@: %d
Scheduling activity timer for [%{public}@] in %lld seconds
%{public}s
suspending activities on transition
resuming activities on transition
Do It Later: removing timer
Do It Later: canceling due to time of day
Do It Later: starting in 30s
Running: %{public}@
DebugDoItLater enabled
DebugDoItLater enabled: scheduling wake for now + 30 seconds
DoItLater: delay not specified, scheduling for 2am
DoItLater: delay specified, scheduling for now + %li seconds
next_activity_wake_time: Activity %{public}@ running for %llu seconds with power assertion %d, scheduling immediate wake.
Smart Power Nap Disabled in defaults
%sPower Nap wake in %ld sec
sleep not eligible for Power Nap
Time Change: resubmitting %{public}@
No name in unmanaged activity request. Rejecting request.
Failed to register unmanaged XPC Activity: %{public}s
Registered unmanaged XPC Activity: %{public}@
%{public}s: %{public}s
%{public}@: permissible values for priority are %s or %s
Control Channel: %{public}s %{public}s
Failed to register XPC Activity: %{public}s
Registered XPC Activity: %{public}@
%{public}@: %{public}s
Unregistered XPC Activity: %{public}@
The interval for key "%s" is not between %d and %d (inclusive).
Registered StartCalendarInterval: %{public}@: %{public}@
Unregistered StartCalendarInterval: %s
Running StartCalendarInterval: %{public}@
Rescheduling StartCalendarInterval: %{public}@: %{public}@
