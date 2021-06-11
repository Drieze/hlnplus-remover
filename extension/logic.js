//default.js must be import by the manifest.

//Load the properties taking into defaults
chrome.storage.sync.get("properties", ({ properties }) => {
    properties = Object.assign(defaults, properties);

    var plusArticles = $('.plus-label').closest('article, li');
    hideArticles(plusArticles);

    //The tempting offer to buy a subscription
    $('*[data-temptation-position]').hide();
    //Hide Exclusief voor abonnees
    $('*:contains("Exclusief voor abonnees")').closest('section').parent().hide();
    //Links found on the article page just contain (+) as text
    $('*.article__paragraph:contains("(+)")').hide();

    //Hide advertisement spaces
    var advertisements = $('article.ankeiler--advertisement');
    hideArticles(advertisements);
    $('advertisement').hide();

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
    //Make filtered webpage compact
    stackTiles();
    removeEmptyDossiers();
  });


/**
 * Stack the tiles inside each .col-primary (basically a section)
 * into a single big tile-grid.
 */
function stackTiles() {
    $('.col--primary').each(function() {
        var grids = $(this).find('.tile-grid');
        var firstTileGrid = grids.first();
        grids.each(function(index,element) {
            if (index > 0) {
                firstTileGrid.append(this.children);
            }
        });
    });
}


/**
 * Hide the articles and their significant parent
 */
function hideArticles( selectors ) {
    //The paywall is shown when the user has reached a HLN+ article
    //In this case, we let him see it otherwise it's confusing
    if (selectors.siblings('#fjs-paywall-top').length == 0) {
        selectors.hide();
        selectors.closest('li.tile, li.results__list-item, .sections-dossier__primary, .sections-region-favorite__griditem, .sections-dossier__list-item').hide();
    }
}

function removeEmptyDossiers() {
    $('.sections-dossier__list').each(function() {
        if($(this).find('.sections-dossier__list-item:visible').length === 0) {
            $(this).hide();
        }
    });
    $('.sections-dossier, .sections-dossier--full-width').each(function() {
        if($(this).find('.sections-dossier__primary:visible, .sections-dossier__list:visible').length === 0) {
            $(this).hide();
        }
    });
}
