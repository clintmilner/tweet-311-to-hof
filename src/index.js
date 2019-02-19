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
const tweets = require('../tweets.json');

let count = 0;

console.log('Starting...', process.env.TWEET_TIMER);

const scheduler = NodeSchedule.scheduleJob(process.env.TWEET_TIMER, () => {
    if(tweets[count]) {
        let {hashtags, title} = tweets[count],
            hashtagString = '';

        (hashtags).forEach(element =>
            hashtagString += `#${element} `
        );

        const tweet = {
            status: `${title} ${hashtagString} @311`,
        };

        client.post('statuses/update', tweet, (error) => {
            if(error){
                console.log(error);
            } else{
                console.log(`Tweet #${count}: '${title}'`);
            }
            ++count;
        });
    } else {
        scheduler.cancel();
        // count = 0;
        console.log('All tweets have been published, resetting counter to 0');
    }
});

