<?php
require_once 'config.php';

spl_autoload_register(function ($class) {
    include 'classes/' . $class . '.php';
});

if ('' !== $strJson = file_get_contents('php://input')) { // Если есть принятая строка json. (через POST-запрос)
	$GLOBALS['jsonData'] = json_decode($strJson); // Данные, переданные с клиента, в формате json.
	$action = $GLOBALS['jsonData']->action;
} elseif (isset($_GET["action"])) {
	$action = $_GET["action"];
}

$db = new DataBase(HOST, USERNAME, PASSWORD, DATABASE);
$books = new Books($db);

switch ($action) {
	case 'getAuthorsList':
		$books->get_authors_list();
		break;
	case 'getBookList':
		$books->get_book_list();
		break;
	case 'getBookInfo':
		$books->get_book_info();
		break;
	case 'getAuthorInformation':
		$books->get_author_information();
		break;
	case 'getAllBookData':
		$books->get_all_book_data();
		break;
	default:
		echo 'error';
}
