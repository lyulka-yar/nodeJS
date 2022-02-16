// const {EventEmitter} = require('events');
//
//const eventEmitter = new EventEmitter(); // декларирование
// STREAMS => потоковая загрузка
//ивент принимает параметры, может вызываться несколько раз,
// для одного вызова =>  eventEmitter.onсе
// название ивента можем придумать сами
//
// eventEmitter.on('click', (name) => {
//     console.log('event => click', name);
// });
//
// eventEmitter.on('click2', (name) => {
//     console.log('event => click2', name);
// });
//
// eventEmitter.on('click3', (name) => {
//     console.log('event => click3', name);
// });
//
// eventEmitter.emit('click', 'Oleg');
// /* возвращаетъ масив ивентов на странице */
// // [ 'click', 'click2', 'click3' ]
//
// console.log(eventEmitter.eventNames());
//
// const readStream = fs.createReadStream(path.join(__dirname, 'buffer.txt')); //екземпляр класса иввентЕмитер
// //разбивает на части по 65кб data зарезервированно
// чтение с файла
// readStream.on('data',
//     (chunk) => {
//         console.log(chunk);
//     });
//
//
//const writeStream = fs.createWriteStream(path.join(__dirname, 'file.txt'));
//const readStream = fs.createReadStream(path.join(__dirname, 'buffer.txt'));
//
//
//ЗАПИСЬ в файл
// writeStream.write('new data--------',
//     (err) => {
//         if (err) {
//             throw err;
//         }
//     });
// writeStream.end();
//
// for (let i = 0; i < 3000; i++) {
//     writeStream.write('new data--------\n',
//         (err) => {
//             if (err) {
//                 throw err;
//             }
//     writeStream.end();
//         });
// }
//
// readStream.on('data',
//      (chunk) => {
//          writeStream.write(chunk, (err) => {
//             if (err) {
//                 throw err;
//             }
//              console.log(chunk)
//          });
//          writeStream.end();
//      });
//
//PIPE
//readStream.pipe(writeStream) // аналог всего что выше есть дуплекс - посмотреть в интернете
