$('article').hide()

function showSingleArticle(e) {

  // Disabling default behaviour of link element and hiding all articles
  e.preventDefault()
  $('.short-entries').hide()
  $('article').hide()

  // Defining target article and showing it
  var target = '#' + $(this).attr('data-target')
  $(target).show()

}

$('.entry-heading a').click( showSingleArticle );
$('.more-btn').click( showSingleArticle );

// Back to articles
$('.back-btn').click( function(e) {

  // Disabling default behaviour of link element and hide article content
  e.preventDefault()
  $('article').hide()

  // Show all articles
  $('.short-entries').show()

})


  $('.deleted').click(function() {
    $('.single-entry:first').remove()
  })
