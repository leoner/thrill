var createThrill = require('../thrill.js'),
	utils = require('../../utils.js');


var adaptSeajsToThrill = module.exports = function(options){
    if (typeof global === 'undefined') {
        global = this;
    }

	options = options || {};
	var thrill = options.thrill || createThrill();
	createSeajsReporter(thrill, global);
};

function createSeajsReporter(thrill, global){
	var runnerPassed = true,
			runnerStartTime,
			runnerFailCount = 0,
			runnerPassCount = 0,
			pendingCount = 0;


    var typeMapping = {
        'start': function(suite) {
			runnerStartTime = (+new Date());
			thrill.start({
                type: 'seajs'
            });
        },
        'test': function(suite) {
			thrill.test({
				name : suite.suiteName,
				suiteName : suite.suiteName
			});
        },

        'testEnd': function(suite) {
            var passed = suite.fail === 0;
            thrill.testEnd({
				name: suite.suiteName,
				suiteName: suite.suiteName,
				passCount: passed? 1 : 0,
				failCount: passed? 0 : 1,
				log: ''
			});
        },
        'end': function(suite) {
            var timeElapsed = (+new Date()) - runnerStartTime;
			thrill.end({
				passed: false,
				passCount: runnerPassCount,
				failCount: runnerFailCount,
				runtime: timeElapsed
			});
        }
    };

    var baseResult = {pass: 0, fail: 0, error: 0};
    window.publish = global.publish = function(type, name, result) {
        // 计算 result
        if (type === 'testEnd') {
            typeMapping.testEnd(getSuiteResult(result));
            baseResult = result;
            return;
        }

        if (type === 'test') {
            baseResult.suiteName = name;
            return;
        }

        typeMapping[type](baseResult);
    };

    function getSuiteResult(result) {
        return {
            suiteName: baseResult.suiteName,
            pass: result.pass - baseResult.pass,
            fail: result.fail - baseResult.fail,
            error: result.error - baseResult.error
        };
    }
}

// ### AUTO INITIALIZATION
if(typeof THRILL_MANUAL === "undefined" || !THRILL_MANUAL){
	adaptSeajsToThrill();
}

