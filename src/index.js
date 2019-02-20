import Dotenv from 'dotenv';
import Twitter from 'twitter';
import NodeSchedule from 'node-schedule';

Dotenv.config();

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_KEY_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_KEY_SECRET,
});
const tweets = require('../tweets.json'),
    tag = (process.env.TWEET_TAG) ? process.env.TWEET_TAG : null,
    canTweet = (process.env.CAN_TWEET && process.env.CAN_TWEET === 'true');

let count = process.env.TWEET_START || 0;

console.log(`Starting: Tweeting every "${process.env.TWEET_TIMER}"`);
console.log(`Starting with Tweet #${count}`);
console.log(`Tagging with ${tag}`);

const scheduler = NodeSchedule.scheduleJob(process.env.TWEET_TIMER, () => {
    if(tweets[count]) {
        let {hashtags, title} = tweets[count],
            hashtagString = '';

        (hashtags).forEach(element =>
            hashtagString += `#${element} `
        );


        if(canTweet){
            const tweet = {status: `${title} ${hashtagString} ${(tag) ? tag : ''}`};
            client.post('statuses/update', tweet, (error) => {
                if(error){
                    console.log(error);
                } else{
                    console.log(`Tweet #${count}: '${title}'`);
                }
            });
        } else {
            console.log(`🐦 Tweet #${count}: '${title}'`);
        }
        ++count;

    } else {
        scheduler.cancel();
        // count = 0;
        console.log('All tweets have been published, stopping scheduler');
    }
});

