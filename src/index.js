import Dotenv from 'dotenv';
import Twitter from 'twitter';
import NodeSchedule from 'node-schedule';
import log4js from 'log4js';

Dotenv.config();

log4js.configure({
    appenders: { tweet: { type: 'file', filename: './logs/tweet.log' } },
    categories: { default: { appenders: ['tweet'], level: 'trace' } }
});

const log = log4js.getLogger('tweet'),
    tweets = require('../tweets.json'),
    canTweet = (process.env.CAN_TWEET && process.env.CAN_TWEET === 'true'),
    client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_KEY_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_KEY_SECRET,
});

let count = process.env.TWEET_START || 0;

log.debug(`====================== SYSTEM STARTING ======================`);
log.debug(`Starting: Tweeting every "${process.env.TWEET_TIMER}"`);
log.debug(`Starting with Tweet #${count}`);
log.debug(`${(canTweet) ? 'We have the permission to tweet! 🐦' : 'Sorry, we cannot tweet right now 🐔'}`);

const scheduler = NodeSchedule.scheduleJob(process.env.TWEET_TIMER, () => {
    if(tweets[count]) {
        let {hashtags, title} = tweets[count],
            hashtagString = '';

        (hashtags).forEach(element =>
            hashtagString += `#${element} `
        );

        if(canTweet){
            const tweet = `${title} ${hashtagString}`,
                tweetObj = {status: tweet};
            client.post('statuses/update', tweetObj, (error) => {
                if(error){
                    log.error(error);
                } else{
                    log.debug(`🐦 #${count}/${tweets.length}: ${tweet}`);
                }
            });
        } else {
            log.info(`🐔 #${count}/${tweets.length}: ${title} ${hashtagString}`);
        }
        ++count;

    } else {
        scheduler.cancel();
        log.warn('All tweets have been published, stopping scheduler');
    }
});

