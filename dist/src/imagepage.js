const API_KEY = 'APIKEY'; // Replace with your Pexels API key
const searchForm = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('image-results');
let currentQuery = '';
let currentPage = 1;
const maxPage = 5;
function renderPagination() {
    const pagination = document.createElement('div');
    pagination.id = 'pagination';
    pagination.style.display = 'flex';
    pagination.style.justifyContent = 'center';
    pagination.style.gap = '0.5rem';
    pagination.style.marginTop = '1rem';
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = ()=>{
        if (currentPage > 1) {
            currentPage--;
            searchImages(currentQuery, currentPage);
        }
    };
    pagination.appendChild(prevBtn);
    for(let i = 1; i <= maxPage; i++){
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i.toString();
        if (i === currentPage) pageBtn.classList.add('active');
        pageBtn.onclick = ()=>{
            currentPage = i;
            searchImages(currentQuery, currentPage);
        };
        pagination.appendChild(pageBtn);
    }
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === maxPage;
    nextBtn.onclick = ()=>{
        if (currentPage < maxPage) {
            currentPage++;
            searchImages(currentQuery, currentPage);
        }
    };
    pagination.appendChild(nextBtn);
    // Clear old pagination and append new one
    const oldPagination = document.getElementById('pagination');
    if (oldPagination) oldPagination.remove();
    results.insertAdjacentElement('afterend', pagination);
}
async function searchImages(query, page = 1) {
    currentQuery = query;
    results.innerHTML = '<p>Loading...</p>';
    try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&page=${page}`, {
            headers: {
                Authorization: API_KEY
            }
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (data.photos.length === 0) {
            results.innerHTML = '<p>No results found.</p>';
            return;
        }
        results.innerHTML = `
	<div class="image-grid">
		${data.photos.map((photo)=>`
			<a href="${photo.url}" target="_blank" class="image-link" data-title="${photo.alt || 'Untitled'}">
				<img src="${photo.src.medium}" alt="${photo.alt}" />
			</a>
		`).join('')}
	</div>
`;
        renderPagination();
    } catch (err) {
        console.error('Error:', err);
        results.innerHTML = `<p>Failed to load images: ${err.message}</p>`;
    }
}
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
        currentPage = 1;
        searchImages(query, currentPage);
    }
});

//# sourceMappingURL=imagepage.js.map
