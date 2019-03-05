const buildTweet = (msg, name, location) => {
    const limit = 250,
        extras = 58;
    let tweetLength = msg.length + name.length + location.length,
        tweet = ``;

    if(tweetLength > (limit-extras)){
        let trimTweet = msg.substring(0, (limit-extras-3)); // tweet max - hashtags - ellipses
        tweet = `${trimTweet}... -${name} from ${location}`;
        // console.warn(tweet.length, tweet);
    } else {
        tweet = `"${msg}" -${name} from ${location}`;
        // console.log(tweet.length, tweet);
    }

    return tweet;
};
let list = Array.from(document.querySelectorAll('.signature'));
let tweetList = [];
list.forEach((item) => {
    let name = item.querySelector('.signature__name').innerText;
    let location = item.querySelector('.signature__location').innerText;
    let msg = item.querySelector('.signature__answer').innerText;
    if(msg && msg !== ''){
        if(name && name !== 'name not displayed') {
            name = 'Excitable'
        }
        let details = {};
        details['title'] = buildTweet(msg, name, location);
        details['hashtags'] = ['RockAndRollHOF', '311HOF'];
        tweetList.push(details);
    }
});
console.log(tweetList);
console.log(JSON.stringify(tweetList));