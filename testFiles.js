import fs from 'node:fs/promises';

const testFiles = async () => {
  const dir = './test';

  try {
    await fs.mkdir(dir, { recursive: true });

    const files = [
      {
        name: 'file1.txt',
        content: 'Кот сидит на подоконнике. Кот мурлычет. Кот смотрит в окно.',
      },
      {
        name: 'file2.txt',
        content: 'Привет',
      },
      {
        name: 'notes.md',
        content: 'Этот файл не будет изменён.',
      },
    ];

    for (const file of files) {
      await fs.writeFile(`${dir}/${file.name}`, file.content, 'utf8');
    }

    console.log('Папка test создана и заполнена файлами!');
  } catch (err) {
    console.error('Ошибка при создании тестовых файлов:', err.message);
  }
};

testFiles();
