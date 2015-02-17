
function fillWithTemplate() {
    var xhr = new XMLHttpRequest(),
        sanitizedResponse = '';
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200) {
            sanitizedResponse = xhr.responseText.replace(/\r\n|\n|\r/g, "\\n");
            chrome.tabs.executeScript(null, {
                code:"document.getElementById(\"pull_request_body\").value = '" + sanitizedResponse + "';"
            });
        }
    }
    xhr.open("GET","https://raw.githubusercontent.com/akoskaaa/lazypr/master/templates/standard.md",true);
    xhr.send();
};


document.addEventListener('DOMContentLoaded', function () {
    var standardTemplate = document.getElementById('i-template-standard');
    standardTemplate.addEventListener('click', fillWithTemplate);
});
