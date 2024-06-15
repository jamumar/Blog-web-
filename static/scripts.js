document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/blogs')
        .then(response => response.json())
        .then(data => {
            const blogList = document.getElementById('blog-list');
            data.forEach(blog => {
                const li = document.createElement('li');
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';

                const blogTitle = document.createElement('h2');
                blogTitle.textContent = blog.title;

                const blogThumbnail = document.createElement('img');
                blogThumbnail.src = generateThumbnail(blog.content);
                blogThumbnail.alt = 'Blog Thumbnail';

                const blogContent = document.createElement('p');
                blogContent.innerHTML = blog.content.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + '...';

                const readMoreLink = document.createElement('a');
                readMoreLink.href = `/blog/${blog.id}`;
                readMoreLink.textContent = 'Read more';
                readMoreLink.className = 'new-blog-button'; // Apply the same style as the "Create New Blog" button

                blogCard.appendChild(blogThumbnail);
                blogCard.appendChild(blogTitle);
                blogCard.appendChild(blogContent);
                blogCard.appendChild(readMoreLink);
                li.appendChild(blogCard);
                blogList.appendChild(li);
            });
        })
        .catch(error => console.log(error));

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkMode = localStorage.getItem('dark-mode');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});

function generateThumbnail(content) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const img = tempDiv.querySelector('img');
    return img ? img.src : 'default-thumbnail.jpg'; // Provide a default thumbnail image
}
