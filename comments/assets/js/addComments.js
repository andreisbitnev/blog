var cmt = (function cmtScripts() {
    var postName, containerId;
    function init() {
        containerId = document.querySelector('script[data-cmt-id]').getAttribute('data-cmt-id')
        var pathNameArr = window.location.pathname.split("/")
            .filter(function(str) {
                return !!str
            });
        postName = pathNameArr[pathNameArr.length - 1];
        getComments();
    }
    function getComments() {
        fetch('/comments/'+ postName)
        .then(function(res) {
            return res.text();
        }).then(function(html) {
            document.getElementById(containerId).innerHTML = html;
        })
    }
    function getJsonFromForm(form) {
        var formData = new FormData(form);
        var obj = {};
        for (const [key, value]  of formData.entries()) {
            obj[key] = value;
        }
        return JSON.stringify(obj);
    }
    function submitComment(e) {
        e.preventDefault();
        var body = getJsonFromForm(e.target);
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var request = new Request('/comments/'+ postName, {
            method: 'POST',
            body: body,
            headers
        });
        fetch(request)
        .then(function(res) {
            if(res.status === 200) {
                getComments();
            }
        }).catch(function(err) {
            alert(err.message)
        });
    }
    init();
    return {
        submitComment
    }
})();