$(function(){
  var scenes = [{
    container: 'scene-one',
    points: [{
      name: 'point-one',
      position: 'TL',
      background: 'black',
      color: 'white',
      html_text: "\
        <h2>HTML Sample tip</h2>\
        <p>I'm a tooltip message</p>\
        <p>This is new</p>",
      offset: ["0","-220"]
    },{
      name: 'point-two',
      position: 'TL',
      css: { "color":"red"},
      class_tag: "special-point",
      text: "simple text-based tip",
      offset: ["30","-260"]
    },{
      name: 'point-three',
      position: 'BL',
      text: "Third point!",
      offset: ["20","0"]
    },{
      name: 'point-four',
      position: 'BL',
    }]
  },{
    container: 'scene-two',
    points:[{
      name: 'point-five',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-six',
      position: 'TL',
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
        $(".icon").css({"background-color":""});
        icon_el.css({"background-color":"red"});
      }
    }
  });
});
