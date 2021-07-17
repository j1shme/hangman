const btnStart = document.getElementById('btn-start');

let startWord = '';
let countOfErrors = 0;
let countOfMatch = 0;
let countOfFindedletters = 0;

const startGame = () => {
	startWord = document.querySelector('input').value.toUpperCase();
	if (startWord.length < 1) {
		alert('Your word is shortly than 1 character, try again!');
		return;
	}
	document.querySelector('input').value = '';
	document.querySelector('input').style.display = 'none';
	document.getElementById('btn-start').style.display = 'none';

	const boxArea = document.getElementById('box-area');
	boxArea.style.width = `${startWord.length * 100}px`;
	boxArea.style.display = 'flex';
	for (let i = 0; i < startWord.length; i++) {
		let box = document.createElement('box');
		box.innerHTML = `<div class='box' id='box${i}'>*</div>`;
		document.getElementById('box-area').append(box);
	}
	document.getElementById('box-area').insertAdjacentHTML('afterend', '<div id="input-letter"><input type="text" placeholder="Введите букву"></div>');
	document.getElementById('input-letter').insertAdjacentHTML('afterend', '<div id="btn-letter"><button onclick="checkLetter()">Send</button></div>');
	document.getElementById('btn-letter').insertAdjacentHTML('afterend', `<div id="counter-of-errors">${refreshCounter(countOfErrors)}</div>`);
}

const btnCheck = document.getElementById('btn-letter');

function checkLetter() {
	let letter = document.getElementById('input-letter').querySelector('input').value.toUpperCase();
	if (letter.length > 1) {
		alert('You entered more than 1 character');
		return;
	}
	for (let i = 0; i < startWord.length; i++) {
		if (startWord[i] == letter) {
			document.getElementById(`box${i}`).innerHTML = `${letter}`;
			countOfMatch++;
		}
	}
	if (countOfMatch === 0) {
		countOfErrors++;
		document.getElementById('counter-of-errors').innerHTML = refreshCounter(countOfErrors);
	}
	countOfFindedletters += countOfMatch;
	console.log(`Count of finded letters: ${countOfFindedletters}`);
	countOfMatch = 0;
	checkFinish();
}

btnStart.addEventListener('click', startGame);

function refreshCounter(count) {
	return `Количество ошибок: ${count}`;
}

function checkFinish() {
	if (countOfErrors === 10)
		alert('You are lose');
	if (countOfFindedletters === startWord.length)
		alert('You won');
}
