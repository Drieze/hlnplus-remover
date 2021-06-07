chrome.storage.sync.get("properties", ({ properties }) => {
    properties = Object.assign({
        hidePlusArticles: true,
        hideAdvertisement: true,
        hideShop: true,
        hideFooter: true,
        hideComments: false,
        stack: true
    }, properties);
    if(properties.hidePlusArticles) {
        var plusArticles = $('.plus-label').closest('article, li');
        removeArticles(plusArticles);

        //the invitation to buy a subscription
        $('*[data-temptation-position]').hide();
        //Hide Exclusief voor abonnees
        $('*:contains("Exclusief voor abonnees")').closest('section').parent().hide();
        $('*.article__paragraph:contains("(+)")').hide();
    }
    if(properties.hideAdvertisement) {
        var advertisements = $('article.ankeiler--advertisement');

        removeArticles(advertisements);
        $('advertisement').hide();
    }   
    if(properties.hideShop) {
        //Hide HLN shop
        $('span:contains("HLN Shop")').closest('.widget').hide();
    }   
    if(properties.hideFooter) {
        //Hide Footer
        $('footer.page-main-footer').hide();
    }   
    if(properties.hideComments) {
        //Hide Comments and Comments counters
        $('#comments').hide();
        $('.comments-counter').hide();
    }  
    if(properties.hidePlusArticles || properties.hideAdvertisement) {
        stackTiles();
    }
  });

function stackColumns() {
    var firstPrimaryCol = $('.col--primary').first();
    $('.col--primary').each(function (index, element) {
        if (index > 0) {
            firstPrimaryCol.append(element.children);
        }
    });
    var firstSecondaryCol = $('.col--secondary').first();
    $('.col--secondary').each(function (index, element) {
        if (index > 0) {
            firstSecondaryCol.append(element.children);
        }
    });
}

function stackTiles() {
    $('.tile-grid').each((index, element) => {
        for (i = 0; i < element.children.length; i++) {
            var className = findMatchingClass(element.children[i].classList);
            if(className) {
                element.children[i].classList.remove(className);
                if(element.children[i].is(":visible")) {
                    element.children[i].classList.add('tile--' + (i+1));
                }
            }
          }   
        });
}
function findMatchingClass(classList) {
    for(className in classList) {
        if(className.startsWith('tile--')) {
            return className;
        }
    }
    return null;
}
function removeArticles( selectors ) {
    selectors.hide();
    selectors.closest('li.tile, li.results__list-item, .sections-dossier__primary').hide();
}