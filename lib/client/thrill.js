var MESSAGE_TYPE = require('../protocol.js').TESTER_MESSAGE_TYPE;

var create = module.exports = function(socket){
	socket = socket || window.queenSocket || (function(){
		var results = window.location.search.match(/(?:\?|\&)queenSocketId=(.*)(?:\&|$)/);
		if(!results) throw new ReferenceError('Unable to find queen socket id in the url.');
		return window.parent.iframeSockets[results[1]];
	}());

	var thrill = new Thrill(socket);
	return thrill;
};

function Thrill(socket){
	this.isStreaming = !(/(?:\?|\&)disableStream=true(.*)(?:\&|$)/.test(window.location.search) || window.THRILL_STREAM_DISABLE);
	this.batch = [];
	this.socket = socket; 
}

Thrill.prototype.sendToSocket = function(message){
        // fix 中文编码问题. 在 queen 中需要相应的解码.
        if (message[1]) {
            if (message[1].name) {
               message[1].name = encodeURI(message[1].name);
            }

            if (message[1].suiteName) {
               message[1].suiteName = encodeURI(message[1].suiteName);
            }
        }
   
	if(this.isStreaming){
		this.socket(message);
	} else {
		this.batch.push(message);

		// On end, send the batch
		if(message[0] === MESSAGE_TYPE["end"]){
			this.socket([MESSAGE_TYPE["batch"], this.batch]);
		}
	}
};

Thrill.prototype.start = function(data){
	this.sendToSocket([MESSAGE_TYPE["start"], data]);
};

Thrill.prototype.suite = function(data){
	this.sendToSocket([MESSAGE_TYPE["suite start"], data]);
};

Thrill.prototype.test = function(data){
	this.sendToSocket([MESSAGE_TYPE["test start"], data]);
};

Thrill.prototype.testEnd = function(data){
	this.sendToSocket([MESSAGE_TYPE["test end"], data]);
};

Thrill.prototype.suiteEnd = function(data){
	this.sendToSocket([MESSAGE_TYPE["suite end"], data]);
};

Thrill.prototype.end = function(data){
	if(data && data.passed !== void 0){
		this.sendToSocket([MESSAGE_TYPE["end"], data]);
	} else {
		throw new TypeError("A \"passed\" variable is required to end the test");
	}
};
