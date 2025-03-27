document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput')
    const categoryGrid = document.getElementById('categoryGrid')
    const booksGrid = document.getElementById('booksGrid')

    const categories = [
        { name: "Apologetics", icon: "fa-cross", subject: "christian_apologetics" },
        { name: "Christian Living", icon: "fa-hands-praying", subject: "christian_living" },
        { name: "Devotionals", icon: "fa-book-open-reader", subject: "devotionals" },
        { name: "Bible Study", icon: "fa-bible", subject: "bible_study" },
        { name: "Christian Fiction", icon: "fa-book", subject: "christian_fiction" }
    ];

    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <i class="fas ${category.icon}"></i>
            <h3>${category.name}</h3>
        `;
        card.addEventListener('click', () => searchByCategory(category.subject));
        categoryGrid.appendChild(card);
    });
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchBooks(query);
    }
})

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            searchBooks(query);
        }
    }
})

function searchByCategory(subject) {
    fetch(`https://openlibrary.org/subjects/${subject}.json?limit=10`)
    .then(response => response.json())
    .then(data => displayBooks(data.works))
    .catch(error =>('Error:', error));
}

function searchBooks(query) {
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&subject=christianity&limit=10`)
    .then(response => response.json())
    .then(data => displayBooks(data.docs))
    .catch(error => console.error('Error:', error));
}

function displayBooks(books) {
    booksGrid.innerHTML = '';

    if (!books || books.length === 0) {
        booksGrid.innerHTML = '<p>No books found. Try a different search.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
    })

    const coverId = book.cover_i || (book.cover && book.cover.cover_i);
    const coverUrl = coverId 
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
                : 'https://via.placeholder.com/150x200?text=No+Cover';
}