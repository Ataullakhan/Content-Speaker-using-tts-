function bolbabybol_table1()
{
  // $('table').attr('id', 'table');
  var punc = /[.,]+/
  var array = [];
  var headers = [];
  $('#table th').each(function(index, item) {
      headers[index] = $(item).html();
  });
  $('#table tr').has('td').each(function() {
      var arrayItem = {};
      $('td', $(this)).each(function(index, item) {
          arrayItem[headers[index]] = $(item).html();
      });
      array.push(arrayItem);
  });

  var txt_to_pass_in_api  = (JSON.stringify(array));

    txt_to_pass_in_api = txt_to_pass_in_api.trim().split(punc);
    txt_to_pass_in_api.forEach(function(d)
    {
      setTimeout(function()
      {
        var u = new SpeechSynthesisUtterance(d);
        speechSynthesis.speak(u);
        read_me(d)
        console.log(d)
      }, 1000)
    });
}