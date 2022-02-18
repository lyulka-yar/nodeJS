const fs = require('fs');
const path = require('path');

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
	json: '.json'
  }
}

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
//     дані які ви отримали запишіть їх в інший файл,
//     в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

fs.mkdir(path.join(task1Path),
  (err) => {
	if (err) {
	  throw err;
	}

	readWriteHelper(task1Path, names.task1, names.new, names.extensions.txt)
	.then(() =>
	  fs.mkdir(path.join(task2Path),
		(err) => {
		  if (err) {
			throw err;
		  }
		  readWriteHelper(task2Path, names.task2, names.task2, names.extensions.txt);
		  changeDir(task2Path, {...names});

		  console.log(`- ${names.task1} passed; \n- ${names.task2} passed;`);
		})
	)
	.then(() => {
	  fs.mkdir(path.join(task3Path),
		(err) => {
		  if (err) {
			throw err;
		  }
		  creatorHelper(task3Path, {...names.extensions});
		  checkEdit(task3Path, {...names.extensions});
		  console.log(`- ${names.task3} passed;`);
		});
	});
  });


const readWriteHelper = async (curPath, fileName, newName, extension) => {

  try {
	let i = 20;
	while (i > 0) {
	  i--;
	  await fs.appendFile(path.join(curPath, fileName + extension),
		'someData\n', {flag: 'a'},
		(err) => {
		  if (err) {
			throw err;
		  }
		});
	  await fs.readFile(path.join(curPath, fileName + extension),
		'utf-8',
		(err, data) => {
		  if (err) {
			throw err;
		  }
		  if (fileName !== newName) {
			fs.writeFile(path.join(curPath, newName + extension),
			  `${data}`,
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

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//старий файл видаліть після того як все завершиться. Також вийде callback hell

const changeDir = async (curPath, fileName) => {
  try {
	await fs.readFile(path.join(curPath, fileName.task2 + fileName.extensions.txt),
	  'utf-8', (err, data) => {
		if (err) {
		  console.log(curPath);
		  throw err;
		}
		fs.mkdir(path.join(curPath, fileName.new + 'Folder'),
		  (err) => {
			if (err) {
			  throw err;
			}
			fs.writeFile(path.join(curPath, fileName.new + 'Folder', fileName.new + fileName.extensions.txt),
			  `${data}`,
			  {flag: 'w'},
			  (err) => {
				if (err) {
				  throw err;
				} else {
				  setTimeout(() => {
					fs.unlink(path.join(curPath, fileName.task2 + fileName.extensions.txt),
					  (err) => {
						if (err) {
						  throw err;
						}
					  });
				  }, 100);
				}
			  });
		  });
	  });
  } catch (e) {
	console.log(e);
  }
}


// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать
// - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки,
// 	вам потрібно їх перейменувати і додати до назви префікс _new

const creatorHelper = (folder, extension) => {
  try {
	let counter = 0;
	for (let i = 1; i < 5; i++) {
	  counter++;
	  fs.mkdir(path.join(folder, `folder_${i}`),
		(err) => {
		  if (err) {
			throw err;
		  }
		});
	  fs.writeFile(path.join(folder,
		  `file_${i}${i % 2 ? extension.txt : extension.json}`),
		`${i % 2 ? `some data` : `[{"name": "Piter", "age": 23}, {"name": "Olya", "age": 42}]`}`,
		(err) => {
		  if (err) {
			throw err;
		  }
		});
	}
	console.log(` app create: \n - ${counter} folders;\n - ${counter / 2} ${extension.txt} files with data; \n - ${counter / 2} ${extension.json} files with data;`)
	console.log(`folders was renamed; \nfiles was cleared;`);
  } catch (e) {
	console.error(e.message);
  }
}

const checkEdit = async (folder, extension) => {
  await fs.readdir(folder, (err, data) => {
	if (err) {
	  throw err;
	}
	data.forEach(value => {
	  if (value.includes(extension.txt) || value.includes(extension.json)) {
		fs.truncate(path.join(folder, value), (err) => {
		  if (err) {
			throw err;
		  }
		});
	  } else {
		fs.rename(
		  path.join(folder, value),
		  path.join(folder, `new_${value}`),
		  (err) => {
			if (err) {
			  throw err;
			}
		  });
	  }
	});
  });
}

