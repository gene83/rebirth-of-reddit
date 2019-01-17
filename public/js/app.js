'use strict';

const main = document.querySelector('#main');

const subReqHandler = function() {
  const subObj = JSON.parse(this.responseText);

  for (let i = 0; i < subObj.data.children.length; i++) {
    const post = subObj.data.children[i].data;

    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    main.appendChild(postDiv);

    const thumbNail = document.createElement('img');
    let image;
    if (post.thumbnail && post.thumbnail !== 'self') {
      image = post.thumbnail;
    } else {
      image = 'https://www.redditstatic.com/new-icon.png';
    }
    thumbNail.className = thumbNail;
    thumbNail.src = image;
    postDiv.appendChild(thumbNail);

    const title = post.title;
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'title';
    titleHeader.innerHTML = title;
    postDiv.appendChild(titleHeader);

    const author = post.author;
    const time = moment.unix(post.created_utc).fromNow();
    const upVotes = post.ups;
    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = `by ${author} &bull; ${time} &bull; ${upVotes} up votes`;
    postDiv.appendChild(details);

    const text = post.selftext;
    const textDiv = document.createElement('div');
    textDiv.className = 'text';

    if (post.selftext) {
      textDiv.innerHTML = text;
    }

    postDiv.appendChild(textDiv);
  }
};

const displaySub = function() {
  const subReq = new XMLHttpRequest();

  main.innerHTML = '';
  subReq.addEventListener('load', subReqHandler);

  if (this.dataset.random) {
    const randomNumber = Math.floor(Math.random() * 10);
    const randomURL = randomSubArray[randomNumber];

    subReq.open('get', randomURL);
  } else {
    subReq.open('get', this.dataset.url);
  }

  subReq.send();
};

const randomSubArray = [
  'https://www.reddit.com/r/HumansBeingBros/.json',
  'https://www.reddit.com/r/showerthoughts/.json',
  'https://www.reddit.com/r/AccidentalRenaissance/.json',
  'https://www.reddit.com/r/CryptoCurrency/.json',
  'https://www.reddit.com/r/ProgrammerHumor/.json',
  'https://www.reddit.com/r/MealPrepSunday/.json',
  'https://www.reddit.com/r/Futurology/.json',
  'https://www.reddit.com/r/therewasanattempt/.json',
  'https://www.reddit.com/r/UNBGBBIIVCHIDCTIICBG/.json',
  'https://www.reddit.com/r/pics/.json'
];

const snacks = document.querySelector('#snacks');
snacks.addEventListener('click', displaySub);

const superPowers = document.querySelector('#superP');
superPowers.addEventListener('click', displaySub);

const sliceLife = document.querySelector('#slice');
sliceLife.addEventListener('click', displaySub);

const random = document.querySelector('#random');
random.addEventListener('click', displaySub);

displaySub.apply(superPowers);
