
function percentage(total, num)  
  {   var percent_max = 0 , percent_min = 0;
    console.log("called ");
    percent_max = (Number(num/total)*100).toFixed(2)
    return percent_max  
  }              
  
function same_level_graph(filtered_data,relevant_column) {
  console.log('same_level_graph is called')
  var content_max = '', content_min = ''
    if(same_level_graph.length > 1) {
        filtered_data.forEach(function(d, i){
          if(i != 0) {
            content_max += ' and ' + d[relevant_column]
            }
          else {
            content_max = d[relevant_column]
            }
            })
          }
      return content_max
}

function text_generator(processed_data, x_axis, y_axis){
  var text_re = "";
  console.log('text gen is called')
  var x_axis = x_axis[0];
  var y_axis = y_axis[0];
  var max_y_axis = d3.max(processed_data, function(d) { return d[y_axis] });
  var min_y_axis = d3.min(processed_data, function(d) { return d[y_axis] });
  var total_y_axis = d3.sum(processed_data, function(d) { return d[y_axis] });
  var min_x_axis = _.filter(processed_data, function(d) { return d[y_axis] == min_y_axis})
  var max_x_axis = _.filter(processed_data, function(d) { return d[y_axis] == max_y_axis})
  var content_max = same_level_graph(max_x_axis, 'label')
  var content_min = same_level_graph(min_x_axis, 'label')
  var percent_max = percentage(total_y_axis, max_y_axis)
  var percent_min = percentage(total_y_axis, min_y_axis)
     
  text_re =     content_max +  " have highest distribution of " + percent_max+"% ("+max_y_axis+")" + " and "+ content_min + " has lowest distribution of " + percent_min+"% ("+min_y_axis+")"
    return text_re
  }
    document.write(text_generator(data, ['label'], ['value']))
      