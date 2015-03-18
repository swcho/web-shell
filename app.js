

var express = require('express');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var readline = require('readline');
var colors = require('colors');
var Convert = require('ansi-to-html');
var convert = new Convert({
    stream: true
});

var app = express();

function run_cmd(aCommand, aArgs, aLineCb, aCb) {

    var child = child_process.spawn(aCommand, aArgs);

    var stdout = readline.createInterface({
        input: child.stdout,
        output: child.stdin
    });

    var stderr = readline.createInterface({
        input: child.stderr,
        output: child.stdin
    });

    stdout.on('line', function (line) {
        console.log(line);
        aLineCb(false, line);
    });

    stderr.on('line', function (line) {
        console.log(line.red);
        aLineCb(true, line);
    });

    child.on('close', function (exitCode) {
        aCb(exitCode);
    });
}

app.get('/', function(req, res) {
    res.send('Hi');
});

app.get('/run', function(req, res) {
    var cmd = req.param('cmd');
    var raw = req.param('raw') ? true: false;
    console.log('cmd: %s, raw: %s', cmd, raw);

    if (raw) {
        res.contentType('application/vnd.terminal');
    } else {
        res.contentType('text/html');
        res.write(
            '<html>' +
            '<head>' +
            '<style> body {font-family: "monospace"}' +
            '</style>' +
            '</head>'
        );
    }
    run_cmd('bash', ['-c', "PYTHONUNBUFFERED=x " + cmd],
        function(err, line) {
            line = err ? line.red: line;
            if (raw) {
                res.write(line);
            } else {
                res.write(convert.toHtml(line) + '<br/>');
            }
        },
        function () {
            res.end();
        }
    )

});

app.get('/get', function(req, res) {
    var file = req.param('file');
    console.log('get    : %s', file);
    if (!fs.existsSync(file)) {
        res.sendStatus(404);
    } else {
        res.setHeader('Content-disposition', 'attachment; filename=' + path.basename(file));
        res.sendfile(file);
    }
});

app.get('/get_test_result', function(req, res) {

    console.log('artifacts: %s', req.param('artifacts'));

    res.sendfile('sample-junit.xml');

});

var server = app.listen(6154, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});