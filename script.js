$(document).ready(function() {

  var number_of_rows = 4;
  var number_of_cols = 4;
  var table_body = '<table class="t1" >';
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
      $(this).css("background-color", "rgb(102, 0, 102)");
    } else if ($(this).attr("clicked") === "4") {
      $(this).css("background-color", "black");
    }
  });
}

function changeColor() {
  $(".b1").click(function() {
    $(this).toggleClass("pressed");
    checkAndIncreaseAttr($(this));
    recolor();
    var row = $(this).closest("tr").index();
    var column = $(this).closest("td").index();
    checkSurroundings(row, column);
    recolor();
    checkForVictory();
    console.log(row + " " + column);
  });

}


function checkSurroundings(row, column) {
  table_el = $(".t1 tr");
  choosen_el = table_el.eq(row).find('td').eq(column).find('button');
  next_el_h = choosen_el.parent().next().children();
  prv_el_h = choosen_el.parent().prev().children();
  on_top_el = choosen_el.parent().parent().next().find('td').eq(column).find('button');
  under_el = choosen_el.parent().parent().prev().find('td').eq(column).find('button');


//  Loop it at some point
  if (choosen_el.hasClass("pressed")) {
    increaseSurroundings(next_el_h);
    increaseSurroundings(prv_el_h);
    increaseSurroundings(on_top_el);
    increaseSurroundings(under_el);
  } else if (!(choosen_el.hasClass("pressed"))) {
    decreaseSurrounding(next_el_h);
    decreaseSurrounding(prv_el_h);
    decreaseSurrounding(on_top_el);
    decreaseSurrounding(under_el);
  }
}
// single button with click
function checkAndIncreaseAttr(selector) {
  if (selector.hasClass("pressed") && typeof(selector.attr("clicked")) === "undefined") {
    selector.attr("clicked", 1);
  } else if (selector.hasClass("pressed") && typeof(selector.attr("clicked")) !== "undefined"){
    var attrInt = parseInt(selector.attr("clicked"));
  attrInt++;
  selector.attr("clicked", attrInt.toString());
}
else {
  var attrInt = parseInt(selector.attr("clicked"));
  attrInt--;
  selector.attr("clicked", attrInt.toString())
}

}

function increaseSurroundings(selector) {
  if (typeof(selector.attr("clicked")) === "undefined") {
    selector.attr("clicked", "1");
  } else {
    var attrInt = parseInt(selector.attr("clicked"));
    attrInt++;
    selector.attr("clicked", attrInt.toString())
  }
}

function decreaseSurrounding(selector) {
  if (typeof(selector.attr("clicked")) !== "undefined") {
    var attrInt = parseInt(selector.attr("clicked"));
    if (attrInt > 0) {
      attrInt--;
      selector.attr("clicked", attrInt.toString())
    }

  }
}
function checkForVictory(){
  x=0;
 buttons = document.getElementsByClassName('b1');
 if((buttons[1]).style.backgroundColor == "blue"){
   x++;
 }
 if((buttons[3]).style.backgroundColor == "blue"){
   x++;
 }
 if((buttons[5]).style.backgroundColor == "blue"){
   x++;
 }
 if((buttons[9]).style.backgroundColor == "blue"){
   x++;
 }
 if((buttons[11]).style.backgroundColor == "blue"){
   x++;
 }
 if((buttons[6]).style.backgroundColor == "rgb(102, 0, 102)"){
   x++;
 }
 if(x===6){
   setTimeout(function(){alert("you have won!")}, 5000);
 }
}
