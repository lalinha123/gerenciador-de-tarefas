const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
const db = new sqlite3.Database('./database.db');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

const redireciona = (req, res) => {
    res.redirect('/');
    res.end();
}

app.route('/')
    .get(function(req, res) {
        db.all('SELECT * FROM tarefas ORDER BY id DESC', (err, data) => {
            res.render('index', {data: data});
        });
    })
    .post(function(req, res) {
        db.get('SELECT id FROM tarefas ORDER BY id DESC LIMIT 1', (err, row) => {
            let id_ = !row ? 1 : row.id + 1;
        
            db.run('INSERT INTO tarefas (id, titulo, materia, status) VALUES ($id, $titulo, $materia, $status);',
            {
                $id: id_,
                $titulo: req.body.titulo || 'Sem título',
                $materia: req.body.materia,
                $status: req.body.status
            }, redireciona(req, res));
        })
    });

app.get('/deletar/:id', (req, res) => {
    db.run('DELETE FROM tarefas WHERE id = $id', {$id: req.params.id}, redireciona(req, res));
});

app.post("/editar/:id", (req, res) => {
    db.run('UPDATE tarefas SET titulo = $titulo, materia = $materia, status = $status WHERE id = $id;',
    {
        $id: req.params.id,
        $titulo: req.body.titulo || 'Sem título',
        $materia: req.body.materia,
        $status: req.body.status
    }, redireciona(req, res)); 
});

app.listen(PORT, () => {
    console.log('Server is running at http://localhost:' + PORT);
});
