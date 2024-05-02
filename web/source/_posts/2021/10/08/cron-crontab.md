---
title: Cron + Crontab
date: 2021-10-08 10:49:02
author: neverbot
tags:
categories:
  - hexagon
language:
---

Originally, in the old library used on MudOS, we had a handler for functionalities that needed to run periodically, which was `timed.c`. Its operation was somewhat archaic, requiring each desired action to be added manually in a not very intuitive way, and it wasn't very maintainable. We have evolved this towards a `cron` + `crontab` system, similar to how it operates in an operating system.

Now there exists a `crontab` file at `/save/crontab`, structured like this:

```
# Edit this file to introduce tasks to be run by cron.
# 
# Each task to run has to be defined in a single line,
# indicating when it will be run, the file that will be 
# loaded, and the function that will be called in the file.
#
# Times are indicated using values for
# minute (m), hour (h) or use '*' in these fields (for 'any').
# */n for minutes or hours divisible by n

# m h object function

# every minute, update_ventures
* * /lib/handlers/ventures.c update_ventures

# old timed.c checks
*/5 * /lib/handlers/cron.c do_stat_users
* * /lib/handlers/cron.c do_idletest
* * /lib/handlers/cron.c net_dead_purge


# every 23 hours, auto reboot
0 */23 /lib/handlers/shutdown.c auto_reboot

# every ten minutes, check if a reboot is needed 
# if we are using too much memory
*/10 * /lib/handlers/shutdown.c memory_reboot
```

Each line represents a functionality to be executed periodically, a specific function from a specific file. The left values represent the minutes and hours of the day. For example, we can see that `0 */23` means that at hours divisible by 23 (actually eleven at night, we could have just put 23), at 0 minutes (exactly eleven o'clock), an `auto_reboot` will be executed. Or that every hour (`*`), at minutes divisible by 10 (`*/10`), it will check if we are using too much memory or not, to potentially force another reboot.

It doesn't have as many configuration options as a real `crontab` from an operating system, but it's probably sufficient for the needs we're going to have, and it's already much better than what we had before.
