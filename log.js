// 3 = debug
// 2 = info
// 1 = warn
// 0 = error

logLevel = 3

function setLogLevel(newLogLevel) {
    logLevel = newLogLevel
}

function debug(...message) {
    if (logLevel >= 3)
        log('debug', ...message)
}

function log(level, ...message) {
    console.log(`[${level}] ${message.join(' ')}`);
}