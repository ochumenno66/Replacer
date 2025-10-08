import readline from "node:readline/promises";
import process from "node:process";
import fs from "node:fs/promises";
import path from "node:path";

export const askUser = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const dir = await rl.question("Введите путь к директории: ");
  const search = await rl.question("Введите строку для поиска: ");

  try {
    const files = await fs.readdir(dir);
    const txtFiles = files.filter(f => path.extname(f) === ".txt");

    let found = false;

    for (const file of txtFiles) {
      const filePath = path.join(dir, file);
      const content = await fs.readFile(filePath, "utf8");
      if (content.includes(search)) {
        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`Замена невозможна! Строка "${search}" не найдена ни в одном .txt файле.`);
      process.exit(0);
    }

  } catch (err) {
    console.log(`Ошибка при проверке файлов: ${err.message}`);
    process.exit(1);
  }

  const replace = await rl.question("Введите строку для замены: ");

  rl.close();

  return { dir, search, replace };
};
