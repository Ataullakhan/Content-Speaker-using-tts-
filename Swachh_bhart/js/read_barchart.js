function same_level_graph(filtered_data,relevant_column) {
  console.log('same_level_graph is called')
  var content = ''
  var content1 = ''
  if(same_level_graph.length > 1) {
        filtered_data.forEach(function(d, i){
          if(i != 0) {
            content += ' and ' + d[relevant_column]
          }
          else {
            content = d[relevant_column]
          }
        })
      }
  return content //give the all  x-axis values of graph relavent max and min graph values.
}
var text_re = "";
function text_generator(processed_data, x_axis, y_axis){
  
  var x_axis = x_axis[0];
  var y_axis = y_axis[0];
  var max_y_axis = d3.max(processed_data, function(d) { return d[y_axis] });
  var min_y_axis = d3.min(processed_data, function(d) { return d[y_axis] });
  var min_x_axis = _.filter(processed_data, function(d) { return d[y_axis] == min_y_axis})
  var max_x_axis = _.filter(processed_data, function(d) { return d[y_axis] == max_y_axis})
  var content = same_level_graph(max_x_axis, 'label')
  var content1 = same_level_graph(min_x_axis, 'label')
  
  text_re = "here in sales deshboard The highest bar of  " +  content +  " and the value is " + max_y_axis + " and lowest bar  of "+ content1 + "and the value is " + min_y_axis
  return text_re
      }
(text_generator(data, ['label'], ['value']))