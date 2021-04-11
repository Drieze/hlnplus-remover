var articles = document.querySelectorAll('article');

articles.forEach(function (article) {
	var plusArticle = article.querySelector('span.plus-label');
	if (plusArticle != undefined) {
		article.style.display = "none";
	}
});

var listItems = document.querySelectorAll('li');
listItems.forEach(function (listItem) {
	var plusArticle = listItem.querySelector('span.plus-label');
	if (plusArticle != undefined) {
		listItem.style.display = "none";
	}
});



// console.log("test?");
// console.log(articles);

//span.plus-label