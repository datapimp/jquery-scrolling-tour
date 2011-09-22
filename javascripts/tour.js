$(function(){
  var scenes = [{
    container: 'scene-one',
    points: [{
      name: 'point-one',
      position: 'BL',
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
      position: '',
      background: 'black',
      color: 'white'
    },{
      name: 'point-six',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-seven',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-eight',
      position: 'BL',
      background: 'black',
      color: 'white'
    }]
  },{
    container: 'scene-three',
    points:[{
      name: 'point-nine',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-ten',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-eleven',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-twelve',
      position: 'BL',
      background: 'black',
      color: 'white'
    }]
  },{
    container: 'scene-four',
    points:[{
      name: 'point-thirteen',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-fourteen',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-fifteen',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-sixteen',
      position: 'BL',
      background: 'black',
      color: 'white'
    }]
 
  }];

  $('#wrapper').scrollingTour(scenes,{
    onPointChange: function(previousPoint, currentPoint) {
      var point_el = $('#' + currentPoint.name ),
          icon = point_el.data('icon'),
          icon_el = $('#' + icon );
      
      if( icon_el.length >= 1){
        icon_el.css({"background-color":"red"});
      }
    }
  });
});
