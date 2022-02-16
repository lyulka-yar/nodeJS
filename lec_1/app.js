// const helper = require('./helper');
// const {greeting} = require('./helper');
//
// greeting("yar");
// helper.greeting('yar');
// console.log(helper);
//
//GLOBAL variables//
//const {fileName, dirName} = require('./helper'); //подключение нужных данных
// console.log('__')
// console.log(__dirname);
// console.log('__')
// console.log(__filename);
// console.log('__')
// console.log('__')
// console.log('***')
// console.log('process CWD',process.cwd()); // путь к папке где запускался арр
// console.log('***')
// fileName(); // путь к фалу где запускался арр
// console.log('***')
// dirName(); // путь к папке где запускался арр
// console.log('***')
//
//global.name = 'andriy'; // собственные переменные, так же нужно експортировать,
// видна только в файле в котором об`являлась.  так лучше не делать === var
//console.log(name);
//
// const path = require('path');
//
// let joinPath = path.join(__dirname,'test','test2','test3','test4','text.txt');
// унификация путей на разных системах
//                                     dirname => наш текст
// C:\Users\Professional\Desktop\nodeJS\ls_1\test\test2\test3\test4\text.txt
// console.log(joinPath);
// let normalizePath = path.normalize('test///test2///test3\/test4//text.txt');
// test\test2\test3\test4\text.txt  исправление пути
// console.log(normalizePath);
//
// let resolvePath = path.resolve('test///test2///test3\/test4//text.txt');
// C:\Users\Professional\Desktop\nodeJS\ls_1\test\test2\test3\test4\text.txt
// исправление и возврат глобального пути
// console.log(resolvePath);
// const os = require('os');
//
// console.log(os.cpus().length); // чтоб понимать и отслеживать загруженность ядер
// console.log(os.cpus()); //даные о системи
const path = require('path');
const fs = require('fs'); //file system module read write delete
//создание файл синхронно путь к папке __dirname, 'files',
// расширение 'files.txt', наполнение файла - не гуд
 fs.writeFileSync(path.join(__dirname, 'files', 'files.txt'),'creating first file');
//-----------
//cоздание асинхронно использовать только ТАК, синхронно не юзать
// fs.writeFile(path.join(__dirname, 'files', 'files2.txt'), 'test text',
//     (err)=> {
//  if (err) {
//   console.log(err);
//   throw err; // аналог Return не даёт коду идти дальше
//  }
//     }
// );
//                                                        с buffer в utf8
// fs.readFile(path.join(__dirname, 'files', 'files.txt'),'utf8',
//     (data,err)=>{
//  if (err) {
//   console.log(err);
//   throw err;
//  }
//      console.log(data)
// });
// запись в файл
// fs.writeFile(path.join(__dirname, 'files', 'files.txt'),'\new data',{ flag: 'a' }, (err)=> {
//  if (err) {
//   console.log(err);
//   throw err;
//  }
// });

// for (let i = 0; i < 1000; i++) {
////w флаг для перезаписи всего что есть в файле 1 раз
////а флаг для перезаписи всего что есть в файле  стоит по дефолту можно не писать
//  fs.writeFile(path.join(__dirname, 'files', 'files.txt'),'\n new data',{ flag: 'a' }, (err)=> {
//   if (err) {
//    console.log(err);
//    throw err;
//   }
//  });
// }
// //// удаление файла
// fs.unlink(path.join(__dirname, 'files', 'files2.txt'), (err)=> {
//  if (err) {
//   console.log(err);
//  }
// });

//// {recursive: true} флаг не обязательный, но если создавать папки в папке котрых не существует это обязательно,
//// для создание 1 папки это не нужно
// fs.mkdir(path.join(__dirname, 'test','test2','test3'), {recursive: true},(err)=>{
//  if (err) {
//   console.log(err);
//  }
// });
//// удаление папки, рекурсивно удаляет только последнюю если пепредавать много
// fs.rmdir(path.join(__dirname, 'testDel'), (err)=>{
//  if (err) {
//   console.log(err);
//  }
// });
////чтение папки типа ls или dir в консоли
// fs.readdir(path.join(__dirname, 'files'),(err,data)=> {
//  if (err) {
//   console.log(err);
//   throw err;
//  }
//  console.log(data);
// });

// переименовать файл и переместить в нужную папку
// fs.rename(path.join(__dirname, 'files', 'files.txt'),
//     path.join(__dirname, 'test','test2','test3', 'files4.txt'), (err)=> {
//  if (err) {
//   console.log(err);
//   throw err;
//  }
//  ////чтение папки
//  fs.readdir(path.join(__dirname, 'test','test2','test3'),(err,data)=> {
//   if (err) {
//    console.log(err);
//    throw err;
//   }
//   console.log(data);
//  });
// });



