(function addComment() {
    const pathNameArr = window.location.pathname.split("/")
        .filter(function(str) {
            return !!str
        });
    let postName = pathNameArr[pathNameArr.length - 1];
    fetch('/comments/'+ postName)
        .then(function(res) {
            return res.text();
        }).then(function(html) {
            document.getElementById('comment-area').innerHTML = html;
        })
})()