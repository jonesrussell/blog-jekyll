const NRP = require('node-redis-pubsub');
const url = process.env.REDIS_URL;

const config = {
  url: url
};

const nrp = new NRP(config); // This is the NRP client

const postDetails = {
  url: 'https://blog.jonesrussell42.xyz/feed.json',
  date: new Date().toISOString
};

nrp.emit('blog:post', postDetails);

nrp.quit();
