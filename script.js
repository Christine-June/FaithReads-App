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