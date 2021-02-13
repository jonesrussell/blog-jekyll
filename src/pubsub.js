const NRP = require('node-redis-pubsub');
const url = process.env.REDIS_URL;

console.log(url);

const config = {
  url: url
};

const nrp = new NRP(config); // This is the NRP client

nrp.emit('blog:post', {
  url: 'https://blog.jonesrussell42.xyz/feed.json',
  hello: 'world'
});

nrp.quit();
