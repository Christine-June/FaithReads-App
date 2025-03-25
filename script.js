document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput')
    const categoryGrid = document.getElementById('categoryGrid')
    const booksGrid = document.getElementById('booksGrid')

    const categories = [
        { name: "Apologetics", subject: "christian_apologetics" },
        { name: "Christian Living", subject: "christian_living" },
        { name: "Devotionals", subject: "devotionals" },
        { name: "Bible Study", subject: "bible_study" },
        { name: "Christian Fiction", subject: "christian_fiction" }
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