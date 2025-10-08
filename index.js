#!/usr/bin/env node

import { askUser } from './service/ask.service.js';
import { Replacer } from './service/replacer.js';

const app = async () => {
  console.log('Программа поиска и замены строк в .txt файлах');

  const { dir, search, replace } = await askUser();

  const replacer = new Replacer(dir, search, replace);

  replacer.on('done', () => {
    console.log('Замена завершена!');
  });

  replacer.on('error', (err) => {
    console.error('Ошибка во время замены:', err.message);
  });

  await replacer.replaceInFiles();
};

app();


/*
Программа поиска и замены текста в файлах
Необходимо создать полезную утилиту, которая будет искать и заменять
указанную строку в текстовых файлах в директории.
Это CLI программа, которая будет пошагово опрашивать пользователя.

Пользователь должен будет задать:
Путь к директории
Строка поиска
Строка замены

После программа ищет все текстовые файлы (txt) в папке и заменяет
все вхождения заданной строки в текстовых файлах в этой директории.
*/
