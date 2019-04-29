# Outbound-Calendar
Javscript calendar using moments.js to support outbound sales reps with their follow-ups during their core calling time <br>
3 different views: Day, Week, Month <br>
2 timezones with added holidays: New York and Berlin <br>
3 blocks/day defined by Settings (modal) <br>
Clickable blocks to add clients (modal) <br>
<br>
(BUGS) <br>
Berlin holidays return wrong JSON <br>
New York timezone does not change <br>
currently add new client modal pops up on the wrong spot, most probably because div is not clickable <br>
timeframes function does not create any new div because dayDivElement is not defined globally <br>
<br>
(TBD) <br>
Both modals to trigger task creation in calendar <br>
Creating an array from user inputs <br>
Saving user input to LocalStorage (https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage) <br>
Blocks to show how much full they are according to "max calls/power hour" specified in Settings (traffic light method) <br>
Holidays should show up with different font-style <br>
Previous and Next Button to work on the different views <br>
CSS on Modals <br>
CSS on dayView <br>
CSS in general <br>
