# Outbound-Calendar
Javscript calendar using moments.js to support outbound sales reps with their follow-ups during their core calling time
3 different views: Day, Week, Month
2 timezones with added holidays: New York and Berlin
3 blocks/day defined by Settings (modal)
Clickable blocks to add clients (modal) 

(BUGS)
Berlin holidays return wrong JSON
New York timezone does not change
function function weekButtonClicked(firstDay) returns firstDay as undefined
currently add new client modal pops up on the wrong spot 

(TBD)
Blocks to show how much full they are according to "max calls/power hour" specified in Settings (traffic light method)
Weekdays should only show working days
Holidays should show up with different font-style
Previous and Next Button to work on the different views
CSS on Modals
CSS on dayView
CSS in general
