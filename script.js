$(document).ready(function() {

  var number_of_rows = 4;
  var number_of_cols = 4;
  var table_body = '<table >';
  for (var i = 0; i < number_of_rows; i++) {
    table_body += '<tr>';
    for (var j = 0; j < number_of_cols; j++) {
      table_body += '<td>';
      table_body += '<button class="b1" type="button"></button>';
      table_body += '</td>';
    }
    table_body += '</tr>';
  }
  table_body += '</table>';
  $('#tableDiv').html(table_body);
  changeColor();

});

function recolor() {
  $(".b1").each(function() {
      if ($(this).attr("clicked") === "0") {
        $(this).css("background-color", "white");
      } else if ($(this).attr("clicked") === "1") {
        $(this).css("background-color", "red");
      } else if ($(this).attr("clicked") === "2") {
        $(this).css("background-color", "blue");
      } else if ($(this).attr("clicked") === "3") {
        $(this).css("background-color", "#660066");
      } else if ($(this).attr("clicked") === "4") {
        $(this).css("background-color", "black");
      }
    });
  }

  function changeColor() {
    $(".b1").click(function() {
      checkAndIncreaseAttr($(this));
      recolor();
      var row = $(this).closest("tr").index();
      var column = $(this).closest("td").index();
      checkSurroundings(row, column);
      recolor()
      console.log(row + " " + column);
    });

  }


  function checkSurroundings(row, column) {
    table_el = $("table tr");
    choosen_el = table_el.eq(row).find('td').eq(column).find('button');
    next_el_h = choosen_el.parent().next().children();
    prv_el_h = choosen_el.parent().prev().children();
    on_top_el = choosen_el.parent().parent().next().find('td').eq(column).find('button');
    under_el = choosen_el.parent().parent().prev().find('td').eq(column).find('button');
    checkAndIncreaseAttr(next_el_h);
    checkAndIncreaseAttr(prv_el_h);
    checkAndIncreaseAttr(on_top_el);
    checkAndIncreaseAttr(under_el);

  }

  function checkAndIncreaseAttr(selector) {
    if (typeof(selector.attr("clicked")) === "undefined") {
      selector.attr("clicked", "1");
    } else {
      var attrInt = parseInt(selector.attr("clicked"));
      attrInt++;

      selector.attr("clicked", attrInt.toString())
    }
  }
