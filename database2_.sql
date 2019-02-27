
--
-- База данных: `database2`
--

-- --------------------------------------------------------

--
-- Структура таблицы `author`
--

CREATE TABLE `author` (
	`authorId` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`authorFullName` VARCHAR(64) NOT NULL UNIQUE
);

--
-- Дамп данных таблицы `author`
--

INSERT INTO `author` (`authorId`, `authorFullName`) VALUES
(8, 'Виктор Гюго'),
(3, 'Ги де Мопассан'),
(1, 'Джон Голсуорси'),
(5, 'Оноре де Бальзак'),
(10, 'Стендаль'),
(6, 'Уильям Сомерсет Моэм'),
(2, 'Уильям Теккерей'),
(7, 'Франц Кафка'),
(4, 'Фрэнсис Скотт Фицджеральд'),
(9, 'Эрих Мария Ремарк');

-- --------------------------------------------------------

--
-- Структура таблицы `author_book`
--

CREATE TABLE `author_book` (
	`authorBookId` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`authorId` INT NOT NULL,
	`bookId` INT NOT NULL
);

--
-- Дамп данных таблицы `author_book`
--

INSERT INTO `author_book` (`authorBookId`, `authorId`, `bookId`) VALUES
(1, 10, 33),
(2, 7, 6),
(3, 6, 49),
(4, 8, 94),
(5, 8, 80),
(6, 9, 57),
(7, 7, 67),
(8, 6, 38),
(9, 7, 8),
(10, 9, 1),
(11, 4, 23),
(12, 9, 78),
(13, 7, 27),
(14, 6, 46),
(15, 1, 81),
(16, 2, 93),
(17, 3, 58),
(18, 2, 44),
(19, 8, 63),
(20, 5, 16),
(21, 1, 10),
(22, 8, 20),
(23, 8, 62),
(24, 7, 14),
(25, 8, 86),
(26, 4, 66),
(27, 5, 61),
(28, 4, 19),
(29, 4, 85),
(30, 10, 30),
(31, 6, 28),
(32, 7, 76),
(33, 9, 70),
(34, 7, 25),
(35, 1, 26),
(36, 1, 72),
(37, 6, 45),
(38, 6, 15),
(39, 1, 31),
(40, 4, 88),
(41, 4, 11),
(42, 10, 36),
(43, 1, 53),
(44, 4, 35),
(45, 5, 56),
(46, 5, 75),
(47, 7, 71),
(48, 4, 54),
(49, 7, 40),
(50, 2, 42),
(51, 2, 24),
(52, 7, 91),
(53, 9, 2),
(54, 3, 82),
(55, 10, 73),
(56, 9, 22),
(57, 5, 5),
(58, 5, 21),
(59, 4, 4),
(60, 3, 37),
(61, 6, 92),
(62, 9, 65),
(63, 3, 55),
(64, 2, 50),
(65, 6, 83),
(66, 5, 87),
(67, 9, 90),
(68, 9, 12),
(69, 5, 34),
(70, 8, 59),
(71, 9, 89),
(72, 3, 43),
(73, 4, 96),
(74, 10, 7),
(75, 6, 77),
(76, 5, 48),
(77, 6, 9),
(78, 10, 51),
(79, 3, 52),
(80, 10, 47),
(81, 2, 95),
(82, 5, 79),
(83, 2, 17),
(84, 6, 13),
(85, 7, 18),
(86, 10, 68),
(87, 1, 84),
(88, 5, 69),
(89, 3, 64),
(90, 3, 29),
(91, 9, 60),
(92, 2, 74),
(93, 3, 3),
(94, 6, 32),
(95, 1, 41),
(96, 10, 39);

-- --------------------------------------------------------

--
-- Структура таблицы `book`
--

CREATE TABLE `book` (
	`bookId` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`bookName` VARCHAR(255) NOT NULL UNIQUE
);

--
-- Дамп данных таблицы `book`
--

INSERT INTO `book` (`bookId`, `bookName`) VALUES
(68, 'Арманс'),
(53, 'Белая обезьяна'),
(37, 'Бесполезная красота (сборник)'),
(75, 'Блеск и нищета куртизанок'),
(92, 'Бремя страстей человеческих'),
(33, 'Ванина Ванини '),
(66, 'Великий Гэтсби'),
(35, 'Великий Гэтсби (сборник)'),
(96, 'Великий Гэтсби. Ночь нежна'),
(22, 'Возлюби ближнего своего'),
(59, 'Гаврош'),
(48, 'Гобсек'),
(87, 'Гобсек. Шагреневая кожа'),
(80, 'Девяносто третий год'),
(18, 'Дневники'),
(5, 'Евгения Гранде'),
(43, 'Жизнь'),
(90, 'Жизнь взаймы, или У неба любимчиков нет'),
(52, 'Жизнь. Милый друг'),
(82, 'Жизнь. Новеллы'),
(88, 'Загадочная история Бенджамина Баттона'),
(91, 'Замок'),
(93, 'Записки Барри Линдона. Книга снобов, написанная одним из них'),
(2, 'Земля обетованная'),
(11, 'Издержки хорошего воспитания'),
(70, 'Искра жизни'),
(38, 'Карусель'),
(17, 'Кольцо и роза'),
(72, 'Конец главы'),
(51, 'Красное и белое'),
(7, 'Красное и черное'),
(39, 'Красное и черное. Пармская обитель'),
(47, 'Красное и черное: Хроника XIX века'),
(81, 'Лебединая песня'),
(13, 'Луна и грош'),
(45, 'Луна и грош. Театр. Рассказы'),
(76, 'Мастер пост-арта'),
(29, 'Милый друг'),
(58, 'Монт-Ориоль'),
(1, 'На западном фронте без перемен'),
(89, 'На Западном фронте без перемен. Три товарища'),
(15, 'Непокоренная'),
(54, 'Новые мелодии печальных оркестров'),
(60, 'Ночь в Лиссабоне'),
(85, 'Ночь нежна'),
(73, 'О любви'),
(3, 'Ожерелье. Новеллы'),
(32, 'Острие бритвы'),
(62, 'Отверженные'),
(79, 'Отец Горио'),
(61, 'Отец Горио. Шагреневая кожа. Гобсек'),
(36, 'Пармская обитель'),
(50, 'Пенденнис'),
(28, 'Пироги и пиво, или Скелет в шкафу'),
(71, 'Письма к Милене'),
(6, 'Письмо к отцу'),
(4, 'По эту сторону рая'),
(46, 'Подводя итоги'),
(63, 'Последний день приговоренного к смерти. Рюи Блаз'),
(23, 'Последний магнат'),
(40, 'Превращение'),
(8, 'Превращение. В исправительной колонии. Новеллы из сборников "Сельский врач" и "Голодарь". Новеллы из наследия'),
(14, 'Превращение. Рассказы'),
(19, 'Прекрасные и проклятые'),
(67, 'Пропавший без вести (Америка)'),
(25, 'Процесс'),
(55, 'Пышка'),
(24, 'Ревекка и Ровена'),
(30, 'Рим, Неаполь и Флоренция'),
(49, 'Рождественские каникулы'),
(84, 'Сага о Форсайтах'),
(41, 'Сага о Форсайтах. В пяти томах. Том 3'),
(26, 'Сага о Форсайтах. В четырех томах. Том 1'),
(10, 'Сага о Форсайтах. Т. 1: Собственник'),
(27, 'Сборник "кары". Новеллы из наследия. Малая проза. Афоризмы'),
(64, 'Сильна как смерть'),
(20, 'Собор Парижской Богоматери'),
(31, 'Современная комедия'),
(77, 'Театр'),
(65, 'Тени в раю'),
(12, 'Три товарища'),
(16, 'Тридцатилетняя женщина'),
(57, 'Триумфальная арка'),
(86, 'Труженики моря'),
(9, 'Узорный покров'),
(83, 'Узорный покров. Рассказы'),
(95, 'Уильям Мейкпис Теккерей - История Генри Эсмонда'),
(69, 'Утраченные иллюзии'),
(94, 'Человек, который смеется'),
(78, 'Черный обелиск'),
(56, 'Шагреневая кожа'),
(21, 'Шагреневая кожа. Неведомый шедевр'),
(34, 'Шагреневая кожа. Эликсир долголетия. Поиски Абсолюта'),
(44, 'Ярмарка тщеславия'),
(42, 'Ярмарка тщеславия. В двух книгах. Книга 1'),
(74, 'Ярмарка тщеславия. В двух книгах. Книга 2');

