//   This handles all the scenes on the Course Tour page.
//   if you want to remove a specific tooltip on a scene,
//   just remove it from the array below and it will be
//   skipped when browsing through them
//  
//   points parameters:
//   name -- id of the point to be shown inside the specified
//           scene container.
//   position -- position where the tooltip originally gets displayed.
//     options: T B TL TR BL BR L R LT LB RT RB
//   class_tag -- specifies a class tag that appends onto tooltip
//                for full css customization.
//   css -- passes inline css styles to tooltip for quickly changing text
//          color or anything you see unfit.
//   text -- text to display inside the tooltip.
//   html_text (overrides text) -- html to display inside the tooltip.
//   offset -- adjusts the tooltip's original position in pixels. [x,y]

$(function(){
  var scenes = [{
    container: 'scene-one',
    title: "Tour Demo",
    description: "This is an explanation of what ever is going on and why the user wants to be taking a tour in the first place",
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
    title: "Tour Demo Scene 2",
    description: "This is a description of scene two",
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
    title: "Tour Demo Scene 3",
    description: "This is displaying the third scene, but still on icon 2",
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
    title: "Tour Demo Scene 4",
    points:[{
      name: 'point-thirteen',
      position: 'BL',
      background: 'black',
      color: 'white'
    }]
  },{
    container: 'scene-five',
    title: "Tour Demo Scene 5",
    description: "This is displaying the fifth scene, but still on icon 4. As you can see, Scene 4 doesn't update the description, nor title if they are undefined.",
    points:[{
      name: 'point-fourteen',
      position: 'BL',
      background: 'black',
      color: 'white'
    },{
      name: 'point-fifteen',
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
        $(".icon").removeClass("active");
        icon_el.addClass("active");
      }
    }
  });
});
