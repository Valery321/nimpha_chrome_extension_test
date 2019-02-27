document.addEventListener('DOMContentLoaded', function() {
	"use strict";
	
	var hostUrl = "http://localhost/myhost/nimpha_chrome_extension_test/php/i.php";
	
	showCommandSetDiv(); // Т.к. не указал, какой блок набора команд показывать, то скроется все.
	document.getElementById("result_box_id").classList.add("display_none"); 
	
	(function () { // nav
		var arrSendButtonElements = document.querySelectorAll(".buttons_box_td .send_button");
		
		for (var i = 0, sendButtonElements_length = arrSendButtonElements.length; i < sendButtonElements_length; i++) {
			arrSendButtonElements[i].onclick = function() {
				var elSendButtonActive = document.querySelector(".buttons_box_td .send_button_active");
				
				if (elSendButtonActive)
					elSendButtonActive.classList.remove("send_button_active");
				
				this.classList.add("send_button_active");
				runSendButton(this);
				
				return false;
			};
		}
	}());
	
	function runSendButton(el) {
		switch (el.id) {
			case "sending_3_requests_id": // 1
				sending3RequestsController();
				break;
			case "sending_10_requests_id": // 2
				sending10RequestsController();
				break;
			case "sending_5_requests_id": // 3
				sending5RequestsController();
				break;
			case "all_book_api_request_id": // 4
				allBookApiRequestController();
		}
	}
	
	//begin: Controllers
	function sending3RequestsController() {
		showCommandSetDiv("command_set_div_id_1");
		document.getElementById("result_box_id").classList.add("display_none"); 
		document.getElementById("sending_3_requests_reset_id").onclick = sending3RequestsController;
		
		buildCommandSetLi(
			"command_set_div_id_1", // strCommandSetDivId,
			3 // numberOfLi
		);
		
		document.getElementById("sending_3_requests_submit_id").onclick = function () {
			if (checkEmptySelectError(this)) // Проверка на ошибки заполнения.
				return;
			
			var queryDataArray = getQueryDataArray(this); // Наполнение массива данных запроса.
			
			//begin: Вывод результатов в любом порядке после получения всех ответов.
			var arrayOfAnswers = [],
				answerNumber = 0;
			
			for (var i = 0, queryDataArrayLenfth = queryDataArray.length; i < queryDataArrayLenfth; ++i) {
				sendJsonPost(
					hostUrl, // uri,
					queryDataArray[i], // jsonObj,
					
					function (answer) {
						arrayOfAnswers.push(JSON.parse(answer));
						++answerNumber;
						
						if (answerNumber === queryDataArrayLenfth) {
							showResultAfterLastResponse(arrayOfAnswers);
						}
					}
				);
			}
			//end: Вывод результатов в любом порядке после получения всех ответов.
		};
	}
	
	function sending10RequestsController() {
		showCommandSetDiv("command_set_div_id_2");
		document.getElementById("result_box_id").classList.add("display_none"); 
		document.getElementById("sending_10_requests_reset_id").onclick = sending10RequestsController;
		
		buildCommandSetLi(
			"command_set_div_id_2", // strCommandSetDivId,
			10 // numberOfLi
		);
		
		document.getElementById("sending_10_requests_submit_id").onclick = function () {
			if (checkEmptySelectError(this)) // Проверка на ошибки заполнения.
				return;
			
			var queryDataArray = getQueryDataArray(this); // Наполнение массива данных запроса.
			
			//begin: Вывод результатов в порядке их составления сразу после получения последнего ответа.
			var arrayOfAnswers = [],
				answerNumber = 0,
				queryDataArrayLenfth = queryDataArray.length;
			
			function sendJPost() {
				sendJsonPost(
					hostUrl, // uri,
					queryDataArray[answerNumber], // jsonObj,
					
					function (answer) {
						arrayOfAnswers.push(JSON.parse(answer));
						++answerNumber;
						
						if (answerNumber < queryDataArrayLenfth) {
							sendJPost();
						} else {
							showResultAfterLastResponse(arrayOfAnswers);
						}
					}
				);
			}
			
			sendJPost();
			//end: Вывод результатов в порядке их составления сразу после получения последнего ответа.
		};
	}

	function sending5RequestsController() {
		showCommandSetDiv("command_set_div_id_3");
		document.getElementById("result_box_id").classList.add("display_none"); 
		document.getElementById("sending_5_requests_reset_id").onclick = sending5RequestsController;
		
		buildCommandSetLi(
			"command_set_div_id_3", // strCommandSetDivId,
			5 // numberOfLi
		);
		
		document.getElementById("sending_5_requests_submit_id").onclick = function () {
			if (checkEmptySelectError(this)) // Проверка на ошибки заполнения.
				return;
			
			var queryDataArray = getQueryDataArray(this); // Наполнение массива данных запроса.
			
			//begin: Вывод результатов в любом порядке как только получен ответ от сервера.
			var newOl = document.createElement("ol"),
				resultDiv = document.getElementById("result_div_id");
			
			resultDiv.innerHTML = "";
			resultDiv.appendChild(newOl);
			document.getElementById("result_box_id").classList.remove("display_none"); // Показать коробку результата.
			
			for (var i = 0, queryDataArrayLenfth = queryDataArray.length; i < queryDataArrayLenfth; ++i) {
				sendJsonPost(
					hostUrl, // uri,
					queryDataArray[i], // jsonObj,
					
					function (answer) {
						var answerObj = JSON.parse(answer),
							newLi = document.createElement("li");
						
						newOl.appendChild(newLi);
						buildAnswerResultItem(newLi, answerObj);
					}
				);
			}
			//end: Вывод результатов в любом порядке как только получен ответ от сервера.
		};
	}

	function allBookApiRequestController() {
		showCommandSetDiv("command_set_div_id_4");
		document.getElementById("result_box_id").classList.add("display_none"); 
		
		document.getElementById("all_book_api_requests_submit_id").onclick = function () {
			var elAuthorIdInput = document.getElementById("all_book_api_authorid_id"),
				elLimitInput = document.getElementById("all_book_api_limit_id");
			
			var authorIdNum = elAuthorIdInput.value;
			
			if (inputNumErrorTest("ID автора", authorIdNum))
				return;
			
			if (authorIdNum === "") {
				alert("Не заполнено текстовое поле \"ID автора\".");
				return;
			}
			
			var limit = elLimitInput.value;
			
			if (inputNumErrorTest("LIMIT", limit))
				return;
			
			sendGet(
				hostUrl + "?action=getAllBookData",
				buildAllBookAnswer
			);
			
			var answerObj;
			
			function buildAllBookAnswer(answer) {
				answerObj = JSON.parse(answer);
				
				sendGet(
					"partials/all_book_answer_content.html",
					buildAllBookAnswer1
				);
			}
			
			function buildAllBookAnswer1(partialAnswer) {
				var resultDiv = document.getElementById("result_div_id");
				
				resultDiv.innerHTML = partialAnswer;
				
				var elAuthorFullName = resultDiv.querySelector(".author_full_name_js"),
					elBookNameTemplate = resultDiv.querySelector(".book_name_template_js"),
					elemPattern = elBookNameTemplate.parentNode;
				
				elAuthorFullName.removeAttribute("class");
				elBookNameTemplate.removeAttribute("class");
				elemPattern.removeChild(elBookNameTemplate);
				elAuthorFullName.innerHTML = "";
				
				for (var i = 0, answerObjLength = answerObj.length; i < answerObjLength; ++i) {
					if (answerObj[i].authorId == authorIdNum) {
						elAuthorFullName.innerHTML = answerObj[i].authorFullName;
						
						for (var j = 0, bookNamesLength = answerObj[i].bookNames.length; j < bookNamesLength; ++j) {
							if (limit !== "" && limit == j) {
								break;
							}
							
							var newLi = elBookNameTemplate.cloneNode(true);
							
							newLi.innerHTML = answerObj[i].bookNames[j];
							elemPattern.appendChild(newLi);
						}
						
						break;
					}
				}
				
				document.getElementById("result_box_id").classList.remove("display_none"); // Показать коробку результата.
			}
		};
	}
	//end: Controllers
	
	function checkEmptySelectError(el) { // true -- есть выпадающие списки без выбора; false -- нет ошибок. (Для проверки наполнения правой панели для пунктов (1), (2), (3) левой панели.)
		var arrSelectElements = el.parentElement.querySelectorAll("select");
		
		for (var i = 0, selectElements_length = arrSelectElements.length; i < selectElements_length; ++i) {
			if (arrSelectElements[i].value === "") {
				alert("Не во всех выпадающих списках сделан выбор.");
				return true;
			} else if (arrSelectElements[i].value === "bookInfo" || arrSelectElements[i].value === "authorInformation") {
				var inputEl = arrSelectElements[i].parentElement.querySelector("input");
				
				if (inputEl.value === "") {
					alert("Одно или несколько текстовых полей, обязательных к заполнению, -- не заполнены.");
					return true;
				}
				
			} else {
				var arrInputElements = arrSelectElements[i].parentElement.querySelectorAll("input");
				
				for (var j = 0; j < arrInputElements.length; ++j) {
					if (!/^\d*$/.test(arrInputElements[j].value) || arrInputElements[j].value === "0") {
						alert("Ошибка заполнения текстового поля.");
						return true;
					}
				}
			}
		}
		
		return false;
	}
	
	function showCommandSetDiv(strCommandSetDivId) { // Показ набора команд, для отправки на сервер. (Правая панель.)
		var arrCommandSetDivElements = document.querySelectorAll(".res_box_td .command_set_div"),
			elementForDisplay = document.getElementById(strCommandSetDivId);
		
		for (var i = 0, commandSetDivElements_length = arrCommandSetDivElements.length; i < commandSetDivElements_length; i++) {
			arrCommandSetDivElements[i].classList.add("display_none");
		}
		
		elementForDisplay && elementForDisplay.classList.remove("display_none");
	}
	
	//begin: Построения контентов для запросов на сервер.
	function buildRequestContent( // Построения блоков, соответствующих выбранному пунту выпадающего списка.
			partialsHtmlName,
			divElement
		) {
		sendGet(
			"partials/" + partialsHtmlName + ".html",
			function (answer) {
				divElement.innerHTML = answer;
			}
		);
	}
	
	function buildCommandSetLi(strCommandSetDivId, numberOfLi) { // Наполнитель ol в наборе команд для сервера.
		sendGet(
			"partials/li_select_option.html",
			function (answer) {
				var
					strOlInnerHtml = (function (){
							for (var i = 0, strOlInnerHtml = ""; i < numberOfLi; ++i) {
								strOlInnerHtml += answer;
							}
							return strOlInnerHtml;
						}()
					),
					elOl = document.querySelector("#" + strCommandSetDivId + " ol");
				
				elOl.innerHTML = strOlInnerHtml;
				
				//begin: Прикрепление onchange к select.
				var arrOfSelectElements = elOl.querySelectorAll("select");
				
				for (var i = 0, selectElements_length = arrOfSelectElements.length; i < selectElements_length; ++i) {
					arrOfSelectElements[i].onchange = function () {
						var divElement = this.parentElement.querySelector("div"); // Блок для составления запроса на сервер.
						
						switch (this.value) {
							case "authorsList":
								buildRequestContent(
									"authors_list_request_content",
									divElement
								);
								
								break;
							case "bookList":
								buildRequestContent(
									"book_list_request_content",
									divElement
								);
								
								break;
							case "bookInfo":
								buildRequestContent(
									"book_info_request_content",
									divElement
								);
								
								break;
							case "authorInformation":
								buildRequestContent(
									"author_information_request_content",
									divElement
								);
						}
					};
				}
				//end: Прикрепление onchange к select.
			}
		);
	}
	//end: Построения контентов для запросов на сервер.
	
	function getQueryDataArray(el) {
		var arrSelectElements = el.parentElement.querySelectorAll("select"),
			queryDataArray = [],
			queryDataArrayItem,
			limitInputEl,
			inputEl;
		
		for (var i = 0, selectElements_length = arrSelectElements.length; i < selectElements_length; ++i) {
			queryDataArrayItem = {};
			
			switch (arrSelectElements[i].value) {
				case "authorsList":
					queryDataArrayItem.action = "getAuthorsList";
					
					var bookIdInputEl = arrSelectElements[i].parentElement.querySelector("input.book_id_class_js");
					
					limitInputEl = arrSelectElements[i].parentElement.querySelector("input.limit_class_js");
					
					if (bookIdInputEl.value !== "")
						queryDataArrayItem.bookId = bookIdInputEl.value;
					
					if (limitInputEl.value !== "")
						queryDataArrayItem.limit = limitInputEl.value;
					
					break;
				case "bookList":
					queryDataArrayItem.action = "getBookList";
					
					var authorIdInputEl = arrSelectElements[i].parentElement.querySelector("input.author_id_class_js");
					
					limitInputEl = arrSelectElements[i].parentElement.querySelector("input.limit_class_js");
					
					if (authorIdInputEl.value !== "")
						queryDataArrayItem.authorId = authorIdInputEl.value;
					
					if (limitInputEl.value !== "")
						queryDataArrayItem.limit = limitInputEl.value;
					
					break;
				case "bookInfo":
					inputEl = arrSelectElements[i].parentElement.querySelector("input");
					
					queryDataArrayItem = {
						action: "getBookInfo",
						bookId: inputEl.value
					};
					
					break;
				case "authorInformation":
					inputEl = arrSelectElements[i].parentElement.querySelector("input");
					
					queryDataArrayItem = {
						action: "getAuthorInformation",
						authorId: inputEl.value
					};
			}
			
			queryDataArray.push(queryDataArrayItem);
		}
		
		return queryDataArray;
	}
	
	function buildAuthorsListAnswerContent(parentBox, arrayOfAuthorData) {
		sendGet(
			"partials/authors_list_answer_content.html",
			function (partialAnswer) {
				fillingTable(
					parentBox,
					partialAnswer,
					arrayOfAuthorData
				);
			}
		);
		
		function fillingTable(
			parentBox,
			partialAnswer,
			arrayOfAuthorData
		) {
			parentBox.innerHTML = partialAnswer;
			
			var elTemplate = parentBox.querySelector(".template_js"),
				elemPattern = elTemplate.parentNode,
				elSerialNumber = elTemplate.querySelector(".serial_number_js"),
				elFullName = elTemplate.querySelector(".full_name_js"),
				elAuthorId = elTemplate.querySelector(".author_id_js");
			
			elemPattern.removeChild(elTemplate);
			elSerialNumber.removeAttribute("class");
			
			for (var i = 0, answersLength = arrayOfAuthorData.length; i < answersLength; ++i) {
				elSerialNumber.innerHTML = i + 1;
				elFullName.innerHTML = arrayOfAuthorData[i].authorFullName;
				elAuthorId.innerHTML = arrayOfAuthorData[i].authorId;
				
				var newTr = elTemplate.cloneNode(true);
				
				elemPattern.appendChild(newTr);
			}
		}
	}
	
	function buildBooksListAnswerContent(parentBox, arrayOfBookData) {
		sendGet(
			"partials/books_list_answer_content.html",
			function (partialAnswer) {
				fillingTable(
					parentBox,
					partialAnswer,
					arrayOfBookData
				);
			}
		);
		
		function fillingTable(
			parentBox,
			partialAnswer,
			arrayOfBookData
		) {
			parentBox.innerHTML = partialAnswer;
			
			var elTemplate = parentBox.querySelector(".template_js"),
				elemPattern = elTemplate.parentNode,
				elSerialNumber = elTemplate.querySelector(".serial_number_js"),
				elFullName = elTemplate.querySelector(".book_name_js"),
				elAuthorId = elTemplate.querySelector(".book_id_js");
			
			elemPattern.removeChild(elTemplate);
			elSerialNumber.removeAttribute("class");
			
			for (var i = 0, answersLength = arrayOfBookData.length; i < answersLength; ++i) {
				elSerialNumber.innerHTML = i + 1;
				elFullName.innerHTML = arrayOfBookData[i].bookName;
				elAuthorId.innerHTML = arrayOfBookData[i].bookId;
				
				var newTr = elTemplate.cloneNode(true);
				
				elemPattern.appendChild(newTr);
			}
		}
	}
	
	function buildBookInfoAnswerContent(parentBox, bookName) {
		sendGet(
			"partials/book_info_answer_content.html",
			function (partialAnswer) {
				parentBox.innerHTML = partialAnswer;
				
				var elBookNameDiv = parentBox.querySelector(".book_name_js");
				
				elBookNameDiv.innerHTML = bookName;
				elBookNameDiv.removeAttribute("class");
			}
		);
	}
	
	function buildAuthorInfoAnswerContent(parentBox, authorFullName) {
		sendGet(
			"partials/author_info_answer_content.html",
			function (partialAnswer) {
				parentBox.innerHTML = partialAnswer;
				
				var elBookNameDiv = parentBox.querySelector(".author_full_name_js");
				
				elBookNameDiv.innerHTML = authorFullName;
				elBookNameDiv.removeAttribute("class");
			}
		);
	}
	
	function buildAnswerResultItem(parentBox, answerObj) {
		switch (answerObj.responseId) {
			case "authorsListData":
				buildAuthorsListAnswerContent(parentBox, answerObj.authorsList);
				break;
			case "bookListData":
				buildBooksListAnswerContent(parentBox, answerObj.booksList);
				break;
			case "bookInfoData":
				buildBookInfoAnswerContent(parentBox, answerObj.bookName);
				break;
			case "authorInfoData":
				buildAuthorInfoAnswerContent(parentBox, answerObj.authorFullName);
		}
	}
	
	function showResultAfterLastResponse(arrayOfAnswers) {
		var newOl = document.createElement("ol"),
			resultDiv = document.getElementById("result_div_id");
		
		resultDiv.innerHTML = "";
		resultDiv.appendChild(newOl);

		for (var j = 0, answersLength = arrayOfAnswers.length; j < answersLength; ++j) {
			var newLi = document.createElement("li");
			
			newOl.appendChild(newLi);
			buildAnswerResultItem(newLi, arrayOfAnswers[j]);
		}
		
		document.getElementById("result_box_id").classList.remove("display_none"); // Показать коробку результата.
	}
	
	function inputNumErrorTest(inputName, val) {
		if (!/^\d*$/.test(val) || val === "0") {
			alert("Ошибка заполнения поля \"" + inputName + "\".");
			return true;
		}
		
		return false;
	}
	
	function sendJsonPost(uri, jsonObj, callbackFun) {
		var xhr = new XMLHttpRequest();
		
		xhr.open('POST', uri, true);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		
		xhr.onreadystatechange = function() {
			if (this.readyState != 4)
				return;
			
			if (this.status != 200) {
				alert(this.status + ': ' + this.statusText);
				return;
			}
			callbackFun(this.responseText);
		};
		
		xhr.send(JSON.stringify(jsonObj));
	}

	function sendGet(uri, callbackFun) {
		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', uri, true);
		
		xhr.onreadystatechange = function() {
			if (this.readyState != 4)
				return;
			
			if (this.status != 200) {
				alert('error: ' + (this.status ? this.statusText : 'request failed'));
				return;
			}
			callbackFun(this.responseText, this.responseXML);
		};
		
		xhr.send();
	}
}, false);
