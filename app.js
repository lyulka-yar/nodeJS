const fs = require('fs');
const path = require('path');

const defaultFolder = path.join(__dirname);

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
//     дані які ви отримали запишіть їх в інший файл,
//     в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так


// fs.mkdir(path.join(defaultFolder, 'task-1'),
//     (err) => {
//         if (err) {
//             throw err;
//         }
//         fs.mkdir(path.join(defaultFolder, 'task-2'),
//             (err) => {
//                 if (err) {
//                     throw err;
//                 }
//                 fs.mkdir(path.join(defaultFolder, 'task-3'),
//                     (err) => {
//                         if (err) {
//                             throw err;
//                         }
//                     });
//             });
//     });
//
// let i = 20;
// while (i > 0) {
//     i--;
//     fs.writeFile(path.join(defaultFolder, 'task-1', 'task-2.txt'),
//         'someData\n', {flag: 'a'},
//
//         (err) => {
//             if (err) {
//                 throw err;
//             }
//         });
//     fs.readFile(path.join(defaultFolder, 'task-1', 'task-2.txt'),
//         'utf-8',
//         (err, data) => {
//             if (err) {
//                 throw err;
//             }
//             fs.writeFile(path.join(defaultFolder, 'task-1', 'newFile.txt'),
//                 `${data}`,
//                 {flag: 'w'},
//                 (err) => {
//                     if (err) {
//                         throw err;
//                     }
//                 });
//         });
// }

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//старий файл видаліть після того як все завершиться. Також вийде callback hell

fs.mkdir(path.join(defaultFolder, 'task-2', 'taskCopy'),
    {recursive: true},
    (err) => {
        if (err) {
            throw err;
        }
        let i = 20;
        while (i > 0) {
            i--;
            fs.writeFile(path.join(defaultFolder, 'task-2', 'task-2.txt'),
                'someData\n', {flag: 'a'},

                (err) => {
                    if (err) {
                        throw err;
                    }
                    fs.readFile(path.join('task-2', 'task-2.txt'),
                        (err, data) => {
                            if (err) {
                                throw err;
                            }
                            fs.writeFile(path.join(defaultFolder, 'task-2', 'taskCopy', 'taskCopy.txt'),
                                `${data}`,
                                {flag: 'a'},
                                (err) => {
                                    if (err) {
                                        throw err;
                                    }
                                });
                        });
                });
        }
    });


