const PubNub = require('pubnub');

const credentials = {
	publishKey: 'pub-c-2d2821d0-cf40-48ee-a1ec-c42f0cf6af06',
	subscribeKey: 'sub-c-41c92684-9731-11e9-a293-62d4500be10d',
	secretKey: 'sec-c-OWQ0MzQyZWEtNGEwYy00MjZhLWEyMTItOGQ1MGU5NTY4MGNl'
};

const CHANNELS = {
	TEST: 'TEST'
};

class PubSub {
	constructor() {
		this.pubnub = new PubNub(credentials);

		this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

		this.pubnub.addListener(this.listener());			
	}

	listener(){
		return {
			message: messageObject => {
				const { channel, message } = messageObject;

				console.log(`Message received. Channel: ${channel}. Message: ${message}`);
			}
		};		
	}

	publish({ channel, message }) {
		this.pubnub.publish({ channel, message });
	}
}

// const testPubSub = new PubSub();
// testPubSub.publish({ channel: CHANNELS.TEST, message: 'Hellow Pubnub'});

module.exports = PubSub;