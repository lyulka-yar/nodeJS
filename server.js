const path = require('path');
const express = require('express');
const {engine} = require("express-handlebars");

const app = express(); // правила хорошего тона указывать арр

app.use(express.json()); //принятия файлов от пост в формате джейсон
app.use(express.urlencoded({extended: true}));

//ВСЁ пишется единожды в основном переписывается с готового проекта

// КАК БУДЕМ ИСПОЛЬЗОВАТЬ трактовка для ноды

app.use(express.static(path.join(__dirname, 'static'))); // доступ
app.set('view engine', '.hbs') // использовать как ядро двигатель
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

const users = [
    {
        login: 'Tata',
        password: 21,
    },
    {
        login: 'Adatsd',
        password: 21,
    },
    {
        login: 'ЕЕЕЕЕ',
        password: 21,
    },
];

// порт желательно выбирать не зарятые чтоб не было конфликтов
app.listen(5200, () => {
    console.log('Server has started on PORT: http://localhost:5200/') //запуск сервера
});

app.get('/login', (req, res) => {
    res.render('login'); // отрисовать страничку hbs login
});

app.get('/users', (req, res) => {
    res.render('users', { users }); // отрисовать страничку hbs users  { users } передаётся масив в hbs файл
});


app.get('/users/:userId', (req, res) => {

    // console.log(req.params);
    // console.log(req.query); // для фильтрации ?age=12
    const { userId } = req.params; // данные которые получаем с линки
    console.log(userId)
    res.redirect(`/users/${userId}`);
    // res.json(users[userId]); // динамичаская подстановка
});

app.post('/login', (req, res) => {
    // console.log(req.body);
    users.push(req.body); // запись в масив
    res.redirect('/users'); // перенаправление на страничке при сабмите
});


app.use((req, res) => {
    res.render('notFound'); // тот же аутлет  так ка пути не принимает только колбек
}); //app.use пишется только в конце так как он выполняется сразу

// первое путь, принимает реквест и респонс => стримы
// app.get('/start', (req, res) => {
//     res.json(users); // ответ  => разметка
//     res.send('data from server'); // возврат джейсона
// });



