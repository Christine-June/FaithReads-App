document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const categoryGrid = document.getElementById('categoryGrid');
    const booksGrid = document.getElementById('booksGrid');

    const categories = [
        { name: "Apologetics", icon: "fa-cross", subject: "christian_apologetics" },
        { name: "Christian Living", icon: "fa-hands-praying", subject: "christian_living" },
        { name: "Devotionals", icon: "fa-book-open-reader", subject: "devotionals" },
        { name: "Bible Study", icon: "fa-bible", subject: "bible_study" },
        { name: "Christian Fiction", icon: "fa-book", subject: "christian_fiction" }
    ];

    function displayCategories() {
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
    }

    function searchByCategory(subject) {
        booksGrid.innerHTML = '<div class="loading">Loading...</div>';
        fetch(`https://openlibrary.org/subjects/${subject}.json?limit=10`)
            .then(response => response.json())
            .then(data => displayBooks(data.works))
            .catch(error => {
                console.error('Error:', error);
                booksGrid.innerHTML = '<p class="no-results">Failed to load books. Please try again.</p>';
            });
    }

    function searchBooks(query) {
        booksGrid.innerHTML = '<div class="loading">Searching...</div>';
        fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&subject=christianity&limit=10`)
            .then(response => response.json())
            .then(data => displayBooks(data.docs))
            .catch(error => {
                console.error('Error:', error);
                booksGrid.innerHTML = '<p class="no-results">Search failed. Please try again.</p>';
            });
    }

    function displayBooks(books) {
        booksGrid.innerHTML = '';

        if (!books || books.length === 0) {
            booksGrid.innerHTML = '<p class="no-results">No books found. Try a different search.</p>';
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            const coverId = book.cover_i || (book.cover && book.cover.cover_i);
            const coverUrl = coverId 
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
                : 'https://via.placeholder.com/250x300?text=No+Cover';
            
            const title = book.title || 'Untitled';
            const author = book.authors ? book.authors[0].name : 'Unknown Author';
            
            bookCard.innerHTML = `
                <img src="${coverUrl}" alt="${title}">
                <div class="book-info">
                    <h3 class="book-title">${title}</h3>
                    <p class="book-author">${author}</p>
                </div>
            `;
            
            booksGrid.appendChild(bookCard);
        });
    }

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchBooks(query);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchBooks(query);
            }
        }
    });

    displayCategories();
});