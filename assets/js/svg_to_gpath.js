


$(document).ready(function(){

$("#input-code").html(`<svg width="144" height="168" xmlns="http://www.w3.org/2000/svg">
 <g>
  <title>wrench</title>
  <rect fill="none" id="canvas_background" height="170" width="146" y="-1" x="-1"/>
  <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
  </g>
 </g>
 <g>
  <title>Layer 1</title>
  <path id="svg_1" d="m113.14357,77.89882c6.30427,-7.24078 7.57114,-17.12182 4.14189,-25.43174l-12.65578,14.74366l-12.4756,-2.42308l-4.13335,-12.00538l12.6235,-14.70961c-8.68346,-2.18244 -18.24962,0.45235 -24.52604,7.66453c-6.61898,7.60315 -7.70222,18.13226 -3.60543,26.67488l-32.98861,37.89742c-3.51,4.02928 -3.08239,10.14036 0.95093,13.64584c4.03329,3.50272 10.1492,3.07935 13.65794,-0.94995l32.94992,-37.86025c9.07004,2.92064 19.41106,0.39165 26.06064,-7.2463l0,0z" stroke-width="1.5" stroke="#000" fill="#fff"/>
 </g>
</svg>`)
//var $output_coordinates = $("#output-coordinates");
var $get_coordinates = $("#get-coordinates");
var $clear_output = $("#clear-output");
var $output_coordinates_wrapper = $("#output-coordinates-wrapper");
var $output_code = $("#output-code");

var output_coordinates_wrapper = document.getElementById("output-coordinates-wrapper");
//get coordinates event handler

$get_coordinates.click(function(){

  var $input_code = $("#input-code").val();
  console.log($input_code);
$("#svg-wrapper").html($input_code);
  var $raw_svg_input = $("path");
var coordinates_array = [];
var segments_array = [];

  //for the proof of concept we are only going to 
  //work with one path at a time
var segments = $raw_svg_input[0].pathSegList; 
  
  for(var i = 0; i < segments.length; i++){
   //for now I am going to make the array of segments first
    //in the event that we want to get more information
    //about the segments, aside from just the coordinates, later
    segments_array.push(segments.getItem(i));  
    //console.log(segments.getItem(i).x);
  }
  
  //test block
  //console.log($raw_svg_input);
  console.log(segments);
//create the absolute starting point and push it into the coordinates array
//translate the point from upper-left, to middle of the pebble coord. map
 var starting_point_x = Math.round(segments_array[0].x - 72);
 var starting_point_y = Math.round(segments_array[0].y - 84);
 coordinates_array.push(`{${starting_point_x}, ${starting_point_y}}`);
  
  //calculate the next point in absolute terms
  var next_absolute_point_x = Math.round(segments_array[1].x + starting_point_x); 
  var next_absolute_point_y = Math.round(segments_array[1].y + starting_point_y); 
  coordinates_array.push(`{${next_absolute_point_x},${next_absolute_point_y}}`);

  
//now that we have drawn the first segment, we wil cycle through the remaining paths
//and draw our shape
  for(var i = 2; i < segments_array.length-1; i++){
        
    console.log(segments_array[i].pathSegType);
    //calculate the next point based based on the relative position to the last point.
    var next_absolute_point_x = Math.round(segments_array[i].x + next_absolute_point_x);
    var next_absolute_point_y = Math.round(segments_array[i].y + next_absolute_point_y);
  
    //push this next point on to the array.
    coordinates_array.push(`{${next_absolute_point_x},${next_absolute_point_y}}`);

  }

 
  var output_string_opener = `static const GPathInfo YOUR_NEW_POLYGON = {
${coordinates_array.length},
(GPoint []) {`;
  
  var output_string_closer = `}
};`;
  
var coordinate_pairs = "";
  
  coordinates_array.forEach(function(element, index, array){
    coordinate_pairs += (element + ", ");
 ///   console.log(coordinate_pairs);
    });

var final_output_string = output_string_opener + coordinate_pairs + output_string_closer;
  
$output_code.val(final_output_string);

$("#svg-wrapper").addClass("show");
//console.log(final_output_string)

//var offset

});

//empty output container using jquery
$clear_output.click(function(){
$output_code.val("");
$("svg").remove();
$("#svg-wrapper").removeClass("show");
});
 
});
