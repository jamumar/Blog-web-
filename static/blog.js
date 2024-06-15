document.addEventListener("DOMContentLoaded", function() {
    const blogId = window.location.pathname.split("/").pop(); // Assuming URL is /blog/<id>
    fetch(`/api/blogs/${blogId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("blog-title").textContent = data.title;
            document.getElementById("blog-content").innerHTML = data.content; // Use innerHTML to insert HTML content
            document.getElementById("blog-date").textContent = new Date(data.date).toLocaleDateString();
        })
        .catch(error => console.error("Error fetching blog post:", error));
});
