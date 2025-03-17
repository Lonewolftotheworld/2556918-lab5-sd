const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

let books = [];

app.get('/whoami', (req, res) => {
    res.json({ studentNumber: '2556918' });
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

app.post('/books', (req, res) => {
    const { title } = req.body;
    console.log(title);
    if (!title) {
        return res.status(400).json({ error: 'Bad Request' });
    }
    const newBook = {
        id: String(books.length + 1),
        title,
        details: [],
    };
    books.push(newBook);
    res.status(201).json(newBook); 
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        book.title = req.body.title || book.title;
        res.json(book);
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(200).json({ message: 'Book deleted' });
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        const { author, genre, publicationYear } = req.body;
        const newDetail = {
            id: String(book.details.length + 1),
            author,
            genre,
            publicationYear,
        };
        book.details.push(newDetail);
        res.status(201).json(newDetail);
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
        if (detailIndex !== -1) {
            book.details.splice(detailIndex, 1);
            res.status(200).json({ message: 'Detail deleted' });
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
