function returnHtml(comments) {
    let html = `<!DOCTYPE html>
                <html lang="en">`;
    let head = `<head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                    <style>
                        .avatar {
                            width: 40px;
                            height: 40px;
                            float: left;
                        }
                        .content {
                            float: left;
                            margin-left: 10px;
                        }
                        .comment {
                            margin-left: 10px;
                            margin-top: 10px;
                            clear: both;
                        }
                        .name {
                            font-weight: bold;
                        }
                    </style>
                </head>`;
    let body = `<body>
                    <div class="contianer">`;
    comments.forEach((comment) => {
        body += `<div class="comment">
                    <div class="avatar" style="background-image:url(${comment.avatar})"></div>
                    <div class="content">
                        <div class="name">${comment.name}</div>
                        <div class="date">${comment.timestamp}</div>
                        <div class="text">${comment.text}</div>
                        <div class="comments">${returnHtml(comment.comments)}</div>
                    </div>
                </div>`
    });
    body += `</div>
            <body>`;
    return html += head += body += `</html>`; 
}

module.exports = {
    returnHtml
}