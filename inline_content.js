

function fillWithTemplate(templateId) {
    var xhr = new XMLHttpRequest(),
        sanitizedResponse = '';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("pull_request_body").value = xhr.responseText;
        }
    }
    xhr.open('GET', 'https://raw.githubusercontent.com/akoskaaa/lazypr/master/templates/' + templateId + '.md', true);
    xhr.send();
};


function clear() {
    document.getElementById("pull_request_body").value = '';
};


var TEMPLATES = {
    'i-template-standard': 'Standard', 
    'i-template-frontend': 'Frontend'
};


var templateSelectorApp = {

    init: function (id) {
        this.id = id;
        this.render();
        this.setupEvents();
    },

    render: function () {
        var topicHeader = document.getElementsByClassName('discussion-topic-header')[0],
            title = document.getElementById('pull_request_title'),
            templateSelect = document.createElement('select');

        title.style.width = '80%';
        title.style.display = 'inline-block';

        templateSelect.id = this.id;
        templateSelect.style.height = '36px';
        templateSelect.style.fontSize = '18px';
        templateSelect.style.WebkitAppearance = 'menulist-button';

        var noneOption = document.createElement('option');
        noneOption.value = 'none';
        noneOption.text = 'Template';
        noneOption.id = 'i-none';
        noneOption.selected = 'selected';
        templateSelect.appendChild(noneOption);
        for (var template in TEMPLATES) {
            if (TEMPLATES.hasOwnProperty(template)) {
                var templateOption = document.createElement('option');
                templateOption.value = TEMPLATES[template];
                templateOption.text = TEMPLATES[template];
                templateOption.id = template;
                templateSelect.appendChild(templateOption);
            }
        }
        topicHeader.appendChild(templateSelect);
    },

    setupEvents: function () {
        var e = document.getElementById(this.id);
        e.addEventListener('change', function (event) {
            var selectedValue = e.options[e.selectedIndex].value;
            if (selectedValue === 'none') {
                clear();
            } else {
                var lowecaseTemplateName = e.options[e.selectedIndex].value.toLowerCase();
                fillWithTemplate(lowecaseTemplateName);
            }
        });
    }
}

templateSelectorApp.init('i-select-template');
