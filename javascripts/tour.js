$(function(){
  var scenes = [{
    container: 'scene-one',
    points: [{
      name: 'point-one',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-two',
      position: 'TL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-three',
      position: 'TL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-four',
      position: 'TL',
      background: 'black',
      color: 'white'
    }]
  },{
    container: 'scene-two',
    points:[{
      name: 'point-five',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-six',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-seven',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-eight',
      position: 'TR',
      background: 'black',
      color: 'white'
    }]
  },{
    container: 'scene-three',
    points:[{
      name: 'point-nine',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-ten',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-eleven',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-twelve',
      position: 'TR',
      background: 'black',
      color: 'white'
    }]
  },{
    container: 'scene-four',
    points:[{
      name: 'point-thirteen',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-fourteen',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-fifteen',
      position: 'TR',
      background: 'black',
      color: 'white'
    },{
      name: 'point-sixteen',
      position: 'TR',
      background: 'black',
      color: 'white'
    }]
 
  }];

  $('#wrapper').scrollingTour(scenes);
});
