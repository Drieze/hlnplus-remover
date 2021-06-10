function save_options() {
    var shop = document.getElementById('shop').checked;
    var footer = document.getElementById('footer').checked;
    var comments = document.getElementById('comments').checked;

    chrome.storage.sync.set(
        { properties: {
            hideShop: shop,
            hideFooter: footer,
            hideComments: comments
    }});
}
  
function restore_options() {
    chrome.storage.sync.get(
        {properties: defaults}, function(items) {
        document.getElementById('shop').checked = items.properties.hideShop;
        document.getElementById('footer').checked = items.properties.hideFooter;
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