#!/bin/bash

# get current date
# DATE=$(date +%Y-%m-%d)
YEAR=$(date +%Y)
MONTH=$(date +%m)
DAY=$(date +%d)
# get current datetime
HOUR=$(date +%H)
MINUTE=$(date +%M)
SECOND=$(date +%S)

# print current date
echo "Creating new miniblog post for $DAY / $MONTH / $YEAR"

# create a directory with the date
mkdir -p web/source/_posts/$YEAR/$MONTH/$DAY

# create new file in the new directory
FILE=web/source/_posts/$YEAR/$MONTH/$DAY/miniblog-$YEAR-$MONTH-$DAY

# while FILE exists
while [[ -f "$FILE.md" ]]
do
  echo "$FILE already exists, incrementing filename..."
  # remove extension
  # FILE="${FILE%.*}"

  # if last characters of the filename are just one digit in the form -x
  if [[ $FILE =~ -[0-9]$ ]]
  then
    # increment the number
    FILE="${FILE%-*}-$((10#${FILE##*-}+1))"
  else
    # add -2
    FILE="${FILE}-2"
  fi

  # # increment the file name
  # FILE=$FILE-2
done

FILE="$FILE.md"
echo "Creating file $FILE"
touch $FILE

# write the file header
echo "---
title: 'miniblog $DAY/$MONTH/$YEAR'
author: neverbot
tags:
  - miniblog
date: $YEAR-$MONTH-$DAY $HOUR:$MINUTE:$SECOND
---" > $FILE

# get all script arguments
TEXT=$@

echo "\n$TEXT" >> $FILE
