const counter = (tweet, name) => {
    const limit = (250 - 24);
    if(tweet.length > limit) {
        //console.log(limit, tweet.length, name, tweet);
    }
    return (tweet.length <= limit);
};
    let list = Array.from(document.querySelectorAll('.signature'));
let tweetList = [];
list.forEach((item) => {
    let name = item.querySelector('.signature__name').innerText;
    let location = item.querySelector('.signature__location').innerText;
    let msg = item.querySelector('.signature__answer').innerText;
    if(msg && msg !== ''
        && name && name !== 'name not displayed'
        && counter(msg, name)){
        let details = {}
        // details['name'] = name;
        // details['location'] = location;
        // details['msg'] = msg;
        details['title'] = `"${msg}" -${name} from ${location}`;
        details['hashtags'] = ['RockAndRollHOF', '311HOF'];
        tweetList.push(details);
    }
});
console.log(tweetList);
console.log(JSON.stringify(tweetList));