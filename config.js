var convict = require('convict');
var fs = require('fs');


var config = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'development', 'test'],
        default: 'test',
        env: 'NODE_ENV',
        arg: 'env'
    },
    server: {
        port: {
            doc: 'HTTP port to bind',
            format: 'port',
            default: 8003,
            env: 'PORT'
        },
        bodyParser: {
            limit: {
                doc: 'maximum request body size',
                format: String,
                default: '10000kb'
            }
        }
    },
    cluster: {
		workerCount: {
			doc: 'No of worker Thread',
			format: Number,
			default: 1
		}
	},
    logger: {
        httpLogFormat: {
            doc: 'HTTP log format',
            format: String,
            default: ':remote-addr - :remote-user [:date] Protocol - :protocol ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
        },
        httpLogFileName: {
            doc: 'HTTP log File name',
            format: String,
            default: 'http.log'
        },
        logFileName: {
            doc: 'Log File name',
            format: String,
            default: 'logs.log'
        },
        exceptionLogFileName: {
            doc: 'Exception log File name',
            format: String,
            default: 'exceptions.log'
        },
        logFileSize: {
            doc: 'logs File Max File size',
            format: Number,
            default: 5242880
        }
    },
    git: {
        username: {
            doc: 'git user name',
            format: String,
            default: 'jankimodi2204'
        },
        password: {
            doc: 'git password',
            format: String,
            default: 'Jankimodi@2210'
        },
    },
    couchbase: {
        host: {
            doc: 'Couchbase cluster nodes.',
            format: String,
            default: 'couchbase://localhost',
        },
        buckets: {
            taxDbBucket: {
                doc: 'tax db bucket name',
                format: String,
                default: 'tax_db'
            },
            taxTransmissionBucket: {
                doc: 'tax transmission bucket name',
                format: String,
                default: 'tax_transmission'
            }
        }
    }
});

config.loadFile('./config-' + config.get('env') + '.json');

// validate
config.validate();

module.exports = config;