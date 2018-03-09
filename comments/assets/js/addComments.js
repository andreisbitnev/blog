(function addComment() {
    var containerId = document.querySelector('script[data-cmt-id]').getAttribute('data-cmt-id')
    var pathNameArr = window.location.pathname.split("/")
        .filter(function(str) {
            return !!str
        });
    var postName = pathNameArr[pathNameArr.length - 1];
    fetch('/comments/'+ postName)
        .then(function(res) {
            return res.text();
        }).then(function(html) {
            document.getElementById(containerId).innerHTML = html;
        })
})()