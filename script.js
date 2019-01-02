function buildUrl(appendix) {
	let key = {
		'api-key': 'f7577550d7614407b908f355b3bd8254'
	};
	let link = 'https://api.nytimes.com/svc/' + appendix;
	return link += '?' + $.param(key);
}

function getData(url) {	
	if (url.indexOf('topstories') > -1) {
		$.get(url, function(data){
		console.log(data);
		outputData(data, 'title', 'abstract', 'multimedia', 3, 'url', null, null, 'updated_date', 'url');
		});
	} else if (url.indexOf('mostpopular') > -1) {
		$.get(url, function(data){
		console.log(data);
		outputData(data, 'title', 'abstract', 'media', 0, 'media-metadata', 1, 'url', 'published_date', 'url');
		});
	}
}

function outputData(data) {
	clearData('main');

	let len = data.results.length;
	let main = document.getElementById('main');

	for (let i = 0; i < len; i++) {
	let newsWindow = document.createElement('div');
	newsWindow.className = 'news-window';

	let h2 = document.createElement('h2');
	h2.innerHTML = data.results[i][arguments[1]];

	let newsTextImg = document.createElement('div');
	newsTextImg.className = 'news-text-img';

	let newsTextSection = document.createElement('div');
	newsTextSection.className = 'news-text-section';

	let pNewsText = document.createElement('p');
	pNewsText.className = 'news-text';
	pNewsText.innerHTML = data.results[i][arguments[2]];

	let newsImageSection = document.createElement('div');
	newsImageSection.className = 'news-img-section';

	let image = document.createElement('img');
	if (arguments[5] && arguments[6] === null) {
		image.src = data.results[i][arguments[3]][arguments[4]][arguments[5]]
	} else {image.src = data.results[i][arguments[3]][arguments[4]][arguments[5]][arguments[6]][arguments[7]]};

	let pLastUpdated = document.createElement('p');
	pLastUpdated.className = 'last-updated';
	pLastUpdated.innerHTML = 'Published: ' + data.results[i][arguments[8]].slice(0, 10);

	let readMore = document.createElement('span');
	readMore.className = 'read-more';

	let a = document.createElement('a');
	a.href = data.results[i][arguments[9]];
	a.innerHTML = 'Read more';

	newsWindow.appendChild(h2);
	newsWindow.appendChild(newsTextImg);
	newsTextImg.appendChild(newsTextSection);
	newsTextSection.appendChild(pNewsText);
	newsTextImg.appendChild(newsImageSection);
	newsImageSection.appendChild(image);
	newsWindow.appendChild(pLastUpdated);
	pLastUpdated.appendChild(readMore);
	readMore.appendChild(a);
	main.appendChild(newsWindow);
	}
}

function clearData(element) {
	let elem = document.getElementById(element);
	elem.innerHTML = null;
}

function bindButtonToGetData(currentClass, link, appendix) {
	let buttons = document.getElementsByClassName(currentClass);
	let len = buttons.length;
	for (let i = 0; i < len; i++) {
		buttons[i].addEventListener('click', function() {
			getData(buildUrl(link + this.id + appendix));
		})
	}
}

// visual
function showMenu() {
	let showMenu = document.getElementById('showmenu');
	let menu = document.getElementById('menu');
	showMenu.addEventListener('click', function(){
		menu.style.width = '50%';
	});	
}

function hideMenu() {
	let closeMenu = document.getElementById('closemenu');
	let menu = document.getElementById('menu');
	closeMenu.addEventListener('click', function(){
		menu.style.width = '0';
	});	
}

function bindButtonToChangeStyle(currentClass, newClass) {
	let buttons = document.getElementsByClassName(currentClass);
	let len = buttons.length;	
	for (let i = 0; i < len; i++) {
		buttons[i].addEventListener('click', function() {
			unchangeButton(currentClass, newClass);
			changeButton(this, newClass);
		})
	}
}

function changeButton(button, newClass) {
	button.className = newClass;
}

function unchangeButton(currentClass, newClass) {
	let activeButton = document.getElementsByClassName(newClass);
	activeButton[0].className = currentClass;
}

(function invokeFunctions() {
	bindButtonToGetData('topstories-btn', 'topstories/v2/', '.json');
	bindButtonToGetData('mostpopular-btn', 'mostpopular/v2/mostviewed/', '/1.json');
	bindButtonToChangeStyle('side-btn', 'side-btn-active');
	bindButtonToChangeStyle('menu-btn', 'menu-btn-active');
	getData(buildUrl('topstories/v2/opinion.json'));
	showMenu();
	hideMenu();
})();

