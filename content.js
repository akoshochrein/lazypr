

function fillWithTemplate(templateId) {
    var xhr = new XMLHttpRequest(),
        sanitizedResponse = '';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            sanitizedResponse = xhr.responseText.replace(/\r\n|\n|\r/g, "\\n");
            chrome.tabs.executeScript(null, {
                code:"document.getElementById(\"pull_request_body\").value = '" + sanitizedResponse + "';"
            });
        }
    }
    xhr.open('GET', 'https://raw.githubusercontent.com/akoskaaa/lazypr/master/templates/' + templateId + '.md', true);
    xhr.send();
};


document.addEventListener('DOMContentLoaded', function () {
    var standardTemplate = document.getElementById('i-template-standard'),
        frontendTemplate = document.getElementById('i-template-frontend');

    standardTemplate.addEventListener('click', function () {
        fillWithTemplate('standard');
    });

    frontendTemplate.addEventListener('click', function () {
        fillWithTemplate('frontend');
    });
});
