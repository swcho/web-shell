
# web-shell

Shell service can run shell command or get a file via node js powered web server.

# Install & Run

```shell
$ git clone https://github.com/swcho/web-shell.git; cd web-shell; npm install

$ node app.js
```

# Usages

## Run shell command

Copy & paste next URL into browser

### As HTML

* http://localhost:6154/run?cmd=ls -al --color

or

* http://localhost:6154/run?cmd=ls%20-al%20--color

### As raw data

* http://localhost:6154/run?cmd=ls -al --color&raw=true

## Get a file

Copy & paste next URL into browser

* http://localhost:6154/get?file=package.json

## Run example

Copy & paste next URL into browser

* http://localhost:6154/run?cmd=./example_shell.sh James
* http://localhost:6154/run?cmd=python example_python.py James
