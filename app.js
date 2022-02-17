const fs = require('fs');
const path = require('path');

const defaultFolder = path.join(__dirname);
const task1Path = path.join(__dirname, 'task-1');
const task2Path = path.join(__dirname, 'task-2');
const task3Path = path.join(__dirname, 'task-3');

const names = {
	task1: 'task-1',
	task2: 'task-2',
	task3: 'task-3',
	new: '_new',
	extensions: {
		txt: '.txt',
		mp3: '.mp3',
		jpeg: '.jpeg'
	}
}

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
//     дані які ви отримали запишіть їх в інший файл,
//     в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так
// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//старий файл видаліть після того як все завершиться. Також вийде callback hell


fs.mkdir(path.join(task1Path),
	(err) => {
		if (err) {
			throw err;
		}
		readWriteHelper(task1Path, names.task1, names.new, names.extensions.txt)
		
		fs.mkdir(path.join(task2Path),
			(err) => {
				if (err) {
					throw err;
				}
				readWriteHelper(task2Path, names.task2, names.task2, names.extensions.txt);
				fs.readFile(path.join(task2Path, names.task2 + names.extensions.txt),
					(err, data) => {
					if (err) {
						// console.log(err);
					}
					});
				fs.mkdir(path.join(task3Path),
					(err) => {
						if (err) {
							throw err;
						}
					});
			});
	});


const readWriteHelper = async (curPath, fileName, newName, extension) => {
	
	try {
		let i = 20;
		while (i > 0) {
			i--;
			await fs.writeFile(path.join(curPath, fileName + extension),
				'someData\n', {flag: 'a'},
				
				(err) => {
					if (err) {
						throw err;
					}
				});
			fs.readFile(path.join(curPath, fileName + extension),
				'utf-8',
				(err, data) => {
					if (err) {
						throw err;
					}
					if (fileName !== newName) {
						fs.writeFile(path.join(curPath, newName + extension),
							`${data}`,
							{flag: 'w'},
							(err) => {
								if (err) {
									throw err;
								}
							});
					}
				});
		}
	} catch (e) {
		console.log(e, 'error from readWriteHelper');
	}
}

const changeDir = (curPath, fileName) => {

}
