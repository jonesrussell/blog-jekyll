const NRP = require('node-redis-pubsub');
const url = process.env.REDIS_URL;

const config = {
  url
};

// create node-redis-pubsub client
const nrp = new NRP(config);

const postDetails = {
  url: 'https://blog.jonesrussell42.xyz/feed.json',
  date: new Date().toISOString
};

nrp.emit('blog:post', postDetails);

nrp.quit();
