function save_options() {
    var plus = document.getElementById('plus').checked;
    var advertisement = document.getElementById('advertisement').checked;
    var shop = document.getElementById('shop').checked;
    var footer = document.getElementById('footer').checked;
    var compact = document.getElementById('compact').checked;
    var comments = document.getElementById('comments').checked;

    chrome.storage.sync.set(
        { properties: {
            hidePlusArticles: plus,
            hideAdvertisement: advertisement,
            hideShop: shop,
            hideFooter: footer,
            compact: compact,
            hideComments: comments
    }});
}
  
function restore_options() {
    chrome.storage.sync.get(
        {properties: defaults}, function(items) {
        document.getElementById('plus').checked = items.properties.hidePlusArticles;
        document.getElementById('advertisement').checked = items.properties.hideAdvertisement;
        document.getElementById('shop').checked = items.properties.hideShop;
        document.getElementById('footer').checked = items.properties.hideFooter;
        document.getElementById('compact').checked = items.properties.compact;
        document.getElementById('comments').checked = items.properties.hideComments;

    });
}

function init() {
    restore_options();
    $('input').on("change", function() {
        save_options();
    });
}
document.addEventListener('DOMContentLoaded', init);