// FUNCTIONS:  Render localStorage
function renderLocalStorage() {

  if ( localStorage.getItem('articles') ) {
    articles = JSON.parse( localStorage.getItem('articles') )
    for( var i = 0; i < articles.length; i++) {
      renderArticle(articles[i].id, articles[i].title, articles[i].url, articles[i].content)
    }
  }

  deleteArticle()
  editArticle()
}

// FUNCTIONS: Render article function
function renderArticle(articleId, title, url, content) {
  var articleWrapper = document.createElement('div')
  var articleTitle = document.createElement('h3')
  var articleContent = document.createElement('p')
  var imgUrl = document.createElement('img')
  var articleEdit = document.createElement('button')
  var articleDelete = document.createElement('button')

  articleTitle.textContent = title

  imgUrl.setAttribute('src', url)
  imgUrl.setAttribute('alt', url)
  articleContent.textContent = content

  articleEdit.innerHTML = '<i class="material-icons">edit</i>'
  articleEdit.setAttribute('class', 'edit-btn')

  articleDelete.innerHTML = '<i class="material-icons">delete_forever</i>'
  articleDelete.setAttribute('class', 'delete-btn')

  articleWrapper.append(articleEdit)
  articleWrapper.append(articleDelete)
  articleWrapper.setAttribute('id', articleId)
  articleWrapper.append(articleTitle)
  articleWrapper.append(imgUrl)
  articleWrapper.append(articleContent)
  articleWrapper.append(imgUrl)

  $('#short-articles').append(articleWrapper)

  deleteArticle()
  editArticle()
}

// FUNCTIONS: Delete article function
function deleteArticle() {

  // Deleting article
  $('.delete-btn').click( function() {

    // Removing div element
    $(this).parent().remove()

    // Removing article from local storage
    var localArticles = JSON.parse( localStorage.getItem('articles') )

    for (var i = 0; i < localArticles.length; i++) {
      if ( $(this).parent().attr('id') == localArticles[i].id ) {
        localArticles.splice(i, 1)
      }
    }

    localStorage.setItem('articles', JSON.stringify(localArticles) )
  })
}

// FUNCTIONS: Edit article function
function editArticle() {

  // Editing article
  $('.edit-btn').click( function() {
    $('#edit-article-form').show()

    var curId = $(this).parent().attr('id')
    var curTitle = $(this).parent().find('h3').text()
    var curUrl = $(this).parent().find('h4').text()
    var curContent = $(this).parent().find('p').text()

    $('#edit-article-id').val(curId)
    $('#edit-article-title').val(curTitle)
    $('#edit-article-url').val(curUrl)
    $('#edit-article-content').val(curContent)

  })

}

// START OF MAIN CODE
var articles = []

renderLocalStorage()

// Toggle add article form
$('#add-article-toggle').click(function(e) {
  $('#add-article-form').toggle("slow")
})

// Adding article
$('#add-article-form').submit(function(e) {
  e.preventDefault()

  var article = {
    id: Math.random().toString(36).substr(2, 9),
    title: $('#add-article-title').val(),
    url: $('#add-article-url').val(),
    content: $('#add-article-content').val(),
  }

  articles.push(article)
  localStorage.setItem( 'articles', JSON.stringify(articles) )

  $('#add-article-title').val('')
  $('#add-article-url').val('')
  $('#add-article-content').val('')

  renderArticle(article.id, article.title, article.url , article.content)
})

// Editing article
$('#edit-article-form').submit(function(e) {
  e.preventDefault()
  var articleId = $('#edit-article-id').val()

  // Change article in local storage
  var localArticles = JSON.parse( localStorage.getItem('articles') )

  for (var i = 0; i < localArticles.length; i++) {
    if ( articleId == localArticles[i].id ) {
      localArticles[i]['title'] = $('#edit-article-title').val()
      localArticles[i]['url'] = $('#edit-article-url').val()
      localArticles[i]['content'] = $('#edit-article-content').val()
    }
  }

  localStorage.setItem('articles', JSON.stringify(localArticles) )

  // Change on frontend
  var formattedId = '#' + articleId
  $(formattedId).find('h3').text( $('#edit-article-title').val() )
  $(formattedId).find('p').text( $('#edit-article-url').val() )

  $(formattedId).find('p').text( $('#edit-article-content').val() )

  $('#edit-article-id').val('')
  $('#edit-article-title').val('')
    $('#edit-article-url').val('')
  $('#edit-article-content').val('')

  $('#edit-modal').hide()

})

$('#close-edit').click( function(e) {
  e.preventDefault()
  $('#edit-article-form').hide()
})
