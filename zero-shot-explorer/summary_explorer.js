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
    console.log('her')
});

$(document).on("click", '.dropdown-menu-ID li', function (e) {
    $(this).parents('.dropdown-menu-ID').find('span').text($(this).text());
    document.getElementById('example_id').innerHTML = $(this).attr('ID-name');
    view_example();
});





// handle click and add class
$(document).on("click", '#random-sample', function (e){

  var articlecontainer = $("#article-display-box");
  var btn = $("#btn1");
  $.ajax({
    url: "https://raw.githubusercontent.com/alv2017/DataSets/master/Europe/europe-capital-cities.json",
    dataType: "json"
  }).done(function(result) {
    let id = Math.floor(Math.random() * 44);
    let country = result['European Capitals'][id]['capital_name'];
    let latitude = result['European Capitals'][id]['latitude'];
    let longitude = result['European Capitals'][id]['longitude'];

    let dstring = "Country name: " + country + ", Latitude: " + latitude + ", Longitude: " + longitude;
    articlecontainer.text(dstring);
  });

});