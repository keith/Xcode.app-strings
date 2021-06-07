#!/bin/bash
for filename in $(find . -type f -name "_params.cat.xml")
cp $filename ${filename}.bak
cat ./temp.scr |ed $filename
echo $filename
done
