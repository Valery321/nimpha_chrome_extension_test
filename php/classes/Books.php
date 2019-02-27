<?php
class Books {
	public function __construct($db) {
		$this->mysqli = $db->mysqli;
	}
	
	public function get_authors_list() {
		$arrayOfAuthorsList = array();
		
		$authorFullNameSelectQuery =
		"
			SELECT
				authorId, authorFullName
			FROM
				author
		";
		
		if (isset($GLOBALS['jsonData']->bookId)) {
			$authorFullNameSelectQuery =
			"
				SELECT
					author.authorId, author.authorFullName
				FROM
					author,
					author_book
				WHERE
					author.authorId = author_book.authorId
				AND
					author_book.bookId = {$GLOBALS['jsonData']->bookId}
			";
		}
		
		if (isset($GLOBALS['jsonData']->limit)) {
			$authorFullNameSelectQuery .= "LIMIT {$GLOBALS['jsonData']->limit}";
		}
		
		$authorFullNameSelectQuery = Common::get_string_without_extra_spaces($authorFullNameSelectQuery);
		
		if ($authorFullNameResult = $this->mysqli->query($authorFullNameSelectQuery)) {
			while ($authorFullNameRow = $authorFullNameResult->fetch_assoc()) {
				$arrayOfAuthorsList[] = $authorFullNameRow;
			}
		}
		else {
			echo '{"responseId": "failed", "description": "TZxhCBtewYHELGRa"}';
			exit;
		}
		
		$objData = new stdClass();
		$objData->responseId = 'authorsListData';
		$objData->authorsList = $arrayOfAuthorsList;
		echo json_encode($objData); // Передача информации.
		exit;
	}
	
	public function get_book_list() {
		$arrayOfBooksList = array();
		
		$bookNameSelectQuery =
		"
			SELECT
				bookId, bookName
			FROM
				book
		";
		
		if (isset($GLOBALS['jsonData']->authorId)) {
			$bookNameSelectQuery =
			"
				SELECT
					book.bookId, book.bookName
				FROM
					book,
					author_book
				WHERE
					book.bookId = author_book.bookId
				AND
					author_book.authorId = {$GLOBALS['jsonData']->authorId}
			";
		}
		
		if (isset($GLOBALS['jsonData']->limit)) {
			$bookNameSelectQuery .= "LIMIT {$GLOBALS['jsonData']->limit}";
		}
		
		$bookNameSelectQuery = Common::get_string_without_extra_spaces($bookNameSelectQuery);
		
		if ($bookNameResult = $this->mysqli->query($bookNameSelectQuery)) {
			while ($bookNameRow = $bookNameResult->fetch_assoc()) {
				$arrayOfBooksList[] = $bookNameRow;
			}
		} else {
			echo '{"responseId": "failed", "description": "3Js9neCthxTvjkrf"}';
			exit;
		}
		
		$objData = new stdClass();
		$objData->responseId = 'bookListData';
		$objData->booksList = $arrayOfBooksList;
		
		echo json_encode($objData); // Передача информации.
	}
	
	public function get_book_info() {
		$bookNameSelectQuery =
		"
			SELECT
				bookName
			FROM
				book
			WHERE
				bookId = {$GLOBALS['jsonData']->bookId}
		";
		
		$bookNameSelectQuery = Common::get_string_without_extra_spaces($bookNameSelectQuery);
		
		if ($bookNameResult = $this->mysqli->query($bookNameSelectQuery)) {
			if ($bookNameRow = $bookNameResult->fetch_assoc())
			{
				$bookName = $bookNameRow['bookName'];
			}
		} else {
			echo '{"responseId": "failed", "description": "Mgk2vXaKEjx6jtRy"}';
			exit;
		}
		
		$objData = new stdClass();
		$objData->responseId = 'bookInfoData';
		$objData->bookName = $bookName;
		echo json_encode($objData); // Передача информации.
		exit;
	}
	
	public function get_author_information() {
		$authorFullNameSelectQuery =
		"
			SELECT
				authorFullName
			FROM
				author
			WHERE
				authorId = {$GLOBALS['jsonData']->authorId}
		";
		
		$authorFullNameSelectQuery = Common::get_string_without_extra_spaces($authorFullNameSelectQuery);
		
		if ($authorFullNameResult = $this->mysqli->query($authorFullNameSelectQuery)) {
			if ($authorFullNameRow = $authorFullNameResult->fetch_assoc()) {
				$authorFullName = $authorFullNameRow['authorFullName'];
			}
		} else {
			echo '{"responseId": "failed", "description": "x5mhDqdzCcQaA7hm"}';
			exit;
		}
		
		$objData = new stdClass();
		$objData->responseId = 'authorInfoData';
		$objData->authorFullName = $authorFullName;
		echo json_encode($objData); // Передача информации.
		exit;
	}
	
	public function get_all_book_data() {
		$allBookData = array();
		
		$authorsDataSelectQuery =
		"
			SELECT
				authorId, authorFullName
			FROM
				author
		";
		
		$authorsDataSelectQuery = Common::get_string_without_extra_spaces($authorsDataSelectQuery);
		
		if ($authorsDataResult = $this->mysqli->query($authorsDataSelectQuery)) {
			while ($authorsDataRow = $authorsDataResult->fetch_assoc()) {
				$allBookDataItem = new stdClass();
				$allBookDataItem->authorId = $authorsDataRow['authorId'];
				$allBookDataItem->authorFullName = $authorsDataRow['authorFullName'];
				$allBookDataItem->bookNames = array();
				
				//begin: Выборка всех названий книг по authorFullName.
				$bookNameSelectQuery =
				"
					SELECT
						book.bookName
					FROM
						book, author_book
					WHERE
						author_book.authorId = {$allBookDataItem->authorId}
					AND
						author_book.bookId = book.bookId
				";
				
				$bookNameSelectQuery = Common::get_string_without_extra_spaces($bookNameSelectQuery);
				
				if ($bookNameResult = $this->mysqli->query($bookNameSelectQuery)) {
					while ($bookNameRow = $bookNameResult->fetch_assoc()) {
						$allBookDataItem->bookNames[] = $bookNameRow['bookName'];
					}
				} else {
					echo '{"responseId": "failed", "description": "3Js9neCthxTvjkrf"}';
					exit;
				}
				//end: Выборка всех названий книг по authorFullName.
				
				$allBookData[] = $allBookDataItem;
			}
		}
		else {
			echo '{"responseId": "failed", "description": "mFjwAZ2epQbJLEtu"}';
			exit;
		}
		
		echo json_encode($allBookData); // Передача информации.
		exit;
	}
}
