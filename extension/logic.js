var props = {};
chrome.storage.sync.get("properties", ({ properties }) => {
    props = Object.assign(defaults, properties);
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var debounceUpdate =  debounce(updateHLN, 250);
    eval(debounceUpdate)();
    
    var observer = new MutationObserver(function(mutations, observer) {
        if(mutationsContainArticles(mutations)) {
            eval(debounceUpdate)();
        }
    });
    observer.observe(document, {
      subtree: true,
      attributes: false,
      childList: true
    });
});


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function mutationsContainArticles(mutations) {
    return mutations.some(mutation => {
        for (const node of mutation.addedNodes) {
            if(containsArticles(node)) {
                return true;
            }
        }
        return false;
    });
}

function containsArticles(node) {
    if(node.tagName === 'ARTICLE' || node.classList?.contains('plus-article')) {
        return true;
    } else {
        for (const child of node.childNodes) { 
            if(containsArticles(child)) {
                return true;
            }

        }    
    }
    return false;
}

//Load the properties taking into defaults
function updateHLN() {

        console.log('articles ' + $('article').length);
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

        if(this.props.hideShop) {
            //Hide HLN shop
            $('span:contains("HLN Shop")').closest('.widget').hide();
        }   
        if(this.props.hideFooter) {
            //Hide Footer
            $('footer.page-main-footer').hide();
        }   
        if(this.props.hideComments) {
            //Hide Comments and Comments counters
            $('#comments').hide();
            $('.comments-counter').hide();
        }
        //Make filtered webpage compact
        stackTiles();
        removeEmptyDossiers();
}

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
    selectors.each(function() {
        if($(this).siblings('#fjs-paywall-top').length == 0) {
            selectors.hide();
            selectors.closest('li.tile, li.results__list-item, .sections-dossier__primary, .sections-region-favorite__griditem, .sections-dossier__list-item').hide();
        }   
    });
} 


/**
 * Hide the dossier or dossier list when it's element is invisible.
 */
function removeEmptyDossiers() {
        //Remove the dossier sidebar when there aren't list items
    $('.sections-dossier__list').each(function() {
        if($(this).find('.sections-dossier__list-item:visible').length === 0) {
            $(this).hide();
        }
    });
    $('.sections-region-favorite__left').each(function() {
        if($(this).find('.sections-region-favorite__griditem:visible').length === 0) {
            $(this).hide();
        }
    });
    $('.sections-dossier, .sections-dossier--full-width').each(function() {
        //If we removed the primary, the header will now be displayed over the list
        //We will fix this by moving the list a bit down
        if($(this).find('.header__title').css('display') === 'inline') {
            var visibleListItems = $(this).find('.sections-dossier__list:visible');
            var visibilePrimaries = visibleListItems.prev('.sections-dossier__primary:visible');
            if(visibleListItems.length > 0 && visibilePrimaries.length === 0) {
                var height = $(this).find('header.header--dossier').css("height");
                visibleListItems.css('padding-top', height);
            }
        }

        //Remove the dossier when there aren't any visibile list or primary inside anymore
        if($(this).find('.sections-dossier__primary:visible, .sections-dossier__list:visible').length === 0) {
            $(this).hide();
        }
    });
}
