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
    document.getElementById('dataset-current').innerHTML = $(this).attr('dataset-name');
    console.log($(this).attr('dataset-name'))
});

$(document).on("click", '.dropdown-menu-ID li', function (e) {
    $(this).parents('.dropdown-menu-ID').find('span').text($(this).text());
    document.getElementById('example_id').innerHTML = $(this).attr('ID-name');
    view_example();
});



// handle click and add class
$(document).on("click", '#random-sample', function (e){

  //dataset_name = document.getElementById("dataset-current").innerHTML;
  dataset_name = 'cnn';
  var articlecontainer = $("#article-display-box");
  var pegasuscontainer = $("#pegasus-summary");
  var briocontainer = $("#brio-summary");
  var t0container = $("#t0-summary");
  var gpt3container = $("#gpt3-summary");

  var url = "https://tagoyal.github.io/zero-shot-explorer/" + dataset_name + ".jsonl"
  console.log(dataset_name)
  $.ajax({
    url: url,
    dataType: "json"
  }).done(function(result) {
    let id = Math.floor(Math.random() * 2);
    let article = result[id]['article'];
    let brio = result[id]['brio'];
    let pegasus = result[id]['pegasus'];
    let t0 = result[id]['t0'];
    let gpt3 = result[id]['gpt3'];

    articlecontainer.text(article);
    pegasuscontainer.text('Pegasus Summary: ' + pegasus);
    briocontainer.text('BRIO Summary: ' + brio);
    t0container.text('T0 Summary: ' + t0);
    gpt3container.text('GPT-3 Summary: ' + gpt3);

  });

});