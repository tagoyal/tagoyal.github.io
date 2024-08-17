$(document).on('click', '.dropdown', function (e) {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$(document).on('focusout', '.dropdown', function (e) {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});

$(document).on("click", '.dropdown-menu-model li', function (e) {
    $(this).parents('.dropdown-menu-model').find('span').text($(this).text());
    console.log();
    if ($(this).parents('.dropdown-menu-model')[0]['id'] == 'dataset-dropdown-human'){
        document.getElementById('dataset-current-human').innerHTML = $(this).attr('dataset-name');
    } else {
        document.getElementById('dataset-current').innerHTML = $(this).attr('dataset-name');
    }
    
    console.log($(this).attr('dataset-name'))
});


function unhighlightButtonClass(classname){
  var elements = document.getElementsByClassName(classname);
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('button-hover');
  }
}


function highlightButton(buttonid) {
    element = document.getElementById(buttonid);
    element.classList.add('button-hover');
}



function updateArticleSummary(dataset_name, id) {
  var url = "https://tagoyal.github.io/zero-shot-explorer/" + dataset_name + ".json"
  $.ajax({
    url: url,
    dataType: "json"
  }).done(function(result) {
    let article = result[id]['article'];
    let brio = result[id]['brio'];
    let pegasus = result[id]['pegasus'];
    let t0 = result[id]['t0'];
    let gpt3 = result[id]['gpt3'];

    var articlecontainer = $("#article-display-box");
    var pegasuscontainer = $("#pegasus-summary");
    var briocontainer = $("#brio-summary");
    var t0container = $("#t0-summary");
    var gpt3container = $("#gpt3-summary");

    articlecontainer.text(article);
    pegasuscontainer.html('<strong>Pegasus Summary:</strong> ' + pegasus);
    briocontainer.html('<strong>BRIO Summary: </strong>' + brio);
    t0container.html('<strong>T0 Summary: </strong>' + t0);
    gpt3container.html('<strong>GPT-3 Summary: </strong>' + gpt3);

  });
}

$(document).on("click", '.button-sample', function (){
    dataset_name = document.getElementById("dataset-current").innerHTML;
    id = $(this).attr("id");
    id = id.split('-').at(-1);
    updateArticleSummary(dataset_name, id);
});


$(document).on("click", '#random-sample', function (e){
  dataset_name = document.getElementById("dataset-current").innerHTML;
  let id = Math.floor(Math.random() * 20);
  updateArticleSummary(dataset_name, id);
});


function updateAnnotator(dataset_name, id, annotatorid) {
var url = "https://tagoyal.github.io/zero-shot-explorer/" + dataset_name + "_human.json"
  $.ajax({
    url: url,
    dataType: "json"
  }).done(function(result) {

    let best_summary = result[id]['annotators'][annotatorid]['best_summary'] 
    let worst_summary = result[id]['annotators'][annotatorid]['worst_summary'] 
    console.log(best_summary[0])

    var best_summary_container = $("#best-summary");
    var worst_summary_container = $("#worst-summary");

    best_summary_container.text('Best Summary: ' + best_summary);
    worst_summary_container.text('Worst Summary: ' + worst_summary);
  });
}


$(document).on("click", '.button-annotator', function (){
    dataset_name = document.getElementById("dataset-current").innerHTML;
    articleid = document.getElementById("article-current-human").innerHTML;
    annotatorelemid = $(this).attr("id");
    annotatorid = annotatorelemid.split('-').at(-1) - 1;
    updateAnnotator(dataset_name, articleid, annotatorid);
    unhighlightButtonClass('button-annotator');
    highlightButton(annotatorelemid);
});


function updateArticleSummaryHuman(dataset_name, id) {
  var url = "https://tagoyal.github.io/zero-shot-explorer/" + dataset_name + "_human.json"
  $.ajax({
    url: url,
    dataType: "json"
  }).done(function(result) {
    let article = result[id]['article'];
    let brio = result[id]['brio']['text'];
    let t0 = result[id]['t0']['text'];
    let gpt3 = result[id]['gpt3']['text'];

    var articlecontainer = $("#article-display-box-human");
    var briocontainer = $("#brio-summary-human");
    var t0container = $("#t0-summary-human");
    var gpt3container = $("#gpt3-summary-human");

    articlecontainer.text(article);
    briocontainer.html('<strong>BRIO Summary: </strong>' + brio);
    t0container.html('<strong>T0 Summary: </strong>' + t0);
    gpt3container.html('<strong>GPT-3 Summary: </strong>' + gpt3);

  });
}


$(document).on("click", '.button-sample-human', function (){
    dataset_name = document.getElementById("dataset-current-human").innerHTML;
    elemid = $(this).attr("id");
    id = elemid.split('-').at(-1);
    updateArticleSummaryHuman(dataset_name, id);
    updateAnnotator(dataset_name, id, 0);
    document.getElementById('article-current-human').innerHTML = id;
    unhighlightButtonClass('button-sample-human');
    highlightButton(elemid);
    unhighlightButtonClass('button-annotator');
    highlightButton('annotator-1');
});


$(document).on("click", '#random-sample-human', function (e){
  dataset_name = document.getElementById("dataset-current-human").innerHTML;
  let id = Math.floor(Math.random() * 10);
  updateArticleSummaryHuman(dataset_name, id);
  updateAnnotator(dataset_name, id, 0);
  document.getElementById('article-current-human').innerHTML = id;
  unhighlightButtonClass('button-sample-human');
  unhighlightButtonClass('button-annotator');
  highlightButton('annotator-1');
});



window.addEventListener("pageshow", () => {
  var url = window.location.href;
  var subpage1 = url.split('/').at(-1);
  console.log(subpage1);


    updateArticleSummaryHuman('cnn', 1);
    updateAnnotator('cnn', 1, 0);
    highlightButton('sample-human-1');
    highlightButton('annotator-1');

    updateArticleSummary('cnn', 1);
    highlightButton('sample-1');
  
});