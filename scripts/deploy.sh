#!/bin/bash

rsync -a --exclude=.DS_Store build/ root@kennethaasan.no:/var/www/byggreal-app
