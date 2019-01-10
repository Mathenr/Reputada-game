import * as Game from "./gameBuild.js";

export let cardList = [
  {
    "id": 0,
    "bgUrl": "https://taylorpictures.net/albums/albums/reputation/posters/normal_002.jpg"
  },
  {
    "id": 1,
    "bgUrl": "https://i0.wp.com/portalpopline.com.br/wp-content/uploads/2017/08/12.png?resize=600%2C801"
  },
  {
    "id": 2,
    "bgUrl": "https://taylorpictures.net/albums/photoshoots/2015/gq/normal_004.jpg"
  },
  {
    "id": 3,
    "bgUrl": "https://taylorpictures.net/albums/candids/2018/7-20arrivingatherapartment/normal_008.jpg"
  },
  {
    "id": 4,
    "bgUrl": "https://pbs.twimg.com/media/DOtjS7xXkAADVaD.jpg"
  },
  {
    "id": 5,
    "bgUrl": "https://abrilcapricho.files.wordpress.com/2017/11/dnsnavewkaeb7rq.jpg"
  },
  {
    "id": 6,
    "bgUrl": "https://taylorpictures.net/albums/photoshoots/2016/usweekly/normal_004.JPG"
  },
  {
    "id": 7,
    "bgUrl": "https://taylorpictures.net/albums/photoshoots/2016/att/normal_001.jpg"
  },
  {
    "id": 8,
    "bgUrl": "https://taylorpictures.net/albums/photoshoots/2015/gq/normal_006.jpg"
  },
  {
    "id": 9,
    "bgUrl": "https://taylorpictures.net/albums/products/incrediblethings/promoshoot/normal_001.jpg"
  }
]

$('.easy').on('click', function(){
  Game.initGame(1)
});
$('.medium').on('click', function(){
  Game.initGame(2)
});
$('.hard').on('click', function(){
  Game.initGame(3)
});