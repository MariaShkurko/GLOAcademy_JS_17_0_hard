// определения функций
const filterByType = (type, ...values) => values.filter(value => typeof value === type),	// функция принимает тип и список значений
																							// фильтруем список значений по типу, возвращаем массив значений только заданного типа

	// функция создает массив из div-контейнеров с классом .dialog__response-block, перебирает их в массиве и скрывает каждый с помощью стилей
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// функция принимает на вход селектор блока, текст сообщения и селектор блока сообщений
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// вызывается функция скрытия блоков вывода результата
		hideAllResponseBlocks();
		// получается блок по переданному селектору и показывается на странице (свойство display меняется с none на block)
		document.querySelector(blockSelector).style.display = 'block';
		// если селектор спана был передан, получаем его со страницы и записываем в него сообщение
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// функция вывода сообщения об ошибке
	// получает на вход текст сообщения
	// вызывает функцию показа блока результата
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// функция вывода сообщения результата
	// получает на вход текст сообщения
	// вызывает функцию показа блока результата
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// функция вывода блока без результата
	// получает на вход текст сообщения
	// вызывает функцию показа блока результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// оснавная функция
	// принимает на вход необходимый тип и значения для фильтрации
	tryFilterByType = (type, values) => {
		// открывается блок отлова ошибок
		try {
			// создаем переменную, которая запустит функцию filterByType, передаст в неё type и values и разобьет полученный результат по запятым
			// в итоге в переменной будет лежать массив введенных данных
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// создаем переменную сообщения результа
			// если массив результата не пустой, выводим название типа и список данных, иначе сообщаем об отсутствии данных такого типа
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			// вызываем функцию вывода результата
			showResults(alertMsg);
		} catch (e) {
			// если поймали ошибку, вызываем функцию вывода сообщения об ошибке
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');	// получаем кнопку с id=filter-btn

// добавляем на кнопку слушатель события click (нажатие) с анонимной функцией
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');	// получаем инпуты с id=type и id=data
	const dataInput = document.querySelector('#data');

	// при пустом поле данных выводим браузерную подсказку и запускаем функцию showNoResult, которая выводит блок отсутствия результата
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {	// при введенных данных убираем браузерную подсказку, отменяем стандартное поведение браузера и запускаем функцию tryFilterByType
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());	// запускаем функцию и передаем в неё значения полей type и data, 
																			// предварительно обрезав лишние пробелы в начале и конце строки
	}
});