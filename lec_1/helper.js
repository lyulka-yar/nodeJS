function greeting(name) {
    console.log(`Hello my name is ${name}`)
}
function dirName() {
    console.log('dir',__dirname)
}
function fileName() {
    console.log('file',__filename)
}

// module.exports = greeting;
module.exports = {greeting, dirName, fileName};
