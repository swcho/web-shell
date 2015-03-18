#!/usr/bin/python

import time
import sys

print "Hi! " + sys.argv[1]

time.sleep(1)

sys.stderr.write("This is error message\n")

time.sleep(1)

print "\x1b[31mLet's try red\x1b[0m"

time.sleep(1)

print "Bye bye~"
