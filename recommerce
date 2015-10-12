#!/bin/bash

start(){
        echo "Starting ..."
        /bin/sh /root/recommerce/postreboot.txt &
}

stop(){
        echo "Stopping jboss... (doing nothing)"
        
}

restart(){
        stop
        # give stuff some time to stop before we restart
        sleep 30
        # protect against any services that can't stop before we restart (warning this kills all Java instances running as 'jboss' user)
        # if the 'su -l ...' command fails try:
        #   sudo -u jboss killall java
        start
}

case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        restart
        ;;
  *)
        echo "Usage: jboss {start|stop|restart}"
        exit 1
esac

exit 0
