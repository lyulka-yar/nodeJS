const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, "main");
const subFolders = {
    online: 'online',
    inPerson: 'inPerson'
};


const onlineUsers = [
    {
        name: 'Oleh', age: 55, city: 'Kyiv'
    },
    {
        name: 'Piter', age: 25, city: 'Odessa'
    },
    {
        name: 'Severus', age: 31, city: 'Lviv'
    },
];
const inPersonUsers = [
    {
        name: 'Taras', age: 15, city: 'Zhytomur'
    },
    {
        name: 'Kate', age: 33, city: 'Mariupol'
    },
    {
        name: 'Vector', age: 131, city: 'Donezk'
    }
];

/*checking if folder main exists*/

fs.access(folder, (err) => {
    if (!err) {
        deleteFolder(folder);

        console.log('The main folder was deleted \n re-run your app');
    } else {
        console.log('The main folder exists \n creating...\n');

        creator(onlineUsers, inPersonUsers, subFolders);
    }
});

fs.access(folder, (err) => {
    if (!err) {
        console.log('Any data exists');
    } else {
        mover(subFolders);
    }
});

/*functions - helpers start*/
const parser = (data, sub) => {
    for (let i = 0; i < data.length; i++) {
        fs.appendFile(path.join(folder, sub, `${sub}Users.txt`),
            ` name: ${data[i].name}\n age: ${data[i].age}\n city: ${data[i].city}\n\n`,
            {flag: 'a'},
            (err) => {
                if (err) {
                    console.log(err.message);
                    throw err;
                }
            });
    }
}

const readWriteData = (valInPerson, valOnline) => {
    fs.readFile(path.join(folder, valOnline, `${valOnline}Users.txt`),
        (err, data) => {
            if (err) {
                console.log(err.message);
                throw err;
            }
            fs.appendFile(path.join(folder, valInPerson, `${valInPerson}Users.txt`),
                `${data}`,
                {flag: 'w'},
                (err) => {
                    if (err) {
                        console.log(err.message);
                        throw err;
                    }
                });
        });
}
/*functions - helpers end*/

function deleteFolder(folder) {

    let files = [];

    if (fs.existsSync(folder)) {
        files = fs.readdirSync(folder);

        files.forEach(function (file) {
            let curPath = `${folder}/${file}`;

            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folder);
    }
}

function creator(online, inPerson, sub) {
    fs.mkdir(path.join(folder, sub.online),
        {recursive: true},
        (err) => {
            if (err) {
                console.log(err.message);
                throw err;
            }
            fs.mkdir(path.join(folder, sub.inPerson),
                (err) => {
                    if (err) {
                        console.log('error', err.message);
                        throw err;
                    }
                    console.log(`folders: \n main; \n ${sub.online}; \n ${sub.inPerson} \n was created successfully\n`);
                });
        });

    setTimeout(() => {

        parser(onlineUsers, sub.online);
        parser(inPersonUsers, sub.inPerson);

        console.log(`files: \n ${sub.online}Users.txt \n ${sub.inPerson}Users.txt \n created successfully \n data was write in files successfully\n`);

    }, 100);
}

const mover = (sub) => {
    setTimeout(() => {
        readWriteData(subFolders.inPerson, subFolders.online);
        readWriteData(subFolders.online, subFolders.inPerson);
        console.log('--------------\n', `data was transferred between files: \n ${sub.online}Users.txt \n ${sub.inPerson}Users.txt\n`)
    }, 500)
}
