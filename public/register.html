document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const bookList = document.getElementById('book-list');
    const userComments = document.getElementById('user-comments');
    const userFavorites = document.getElementById('user-favorites');
    const changePasswordForm = document.getElementById('change-password-form');
    const deleteAccountButton = document.getElementById('delete-account-button');
    const queryForm = document.getElementById('query-form');

    let currentCategory = '';
    let currentBookId = '';

    // Utility function to get token from localStorage
    const getToken = () => localStorage.getItem('token');

    // Register user
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });
                const data = await res.json();
                if (res.ok) {
                    alert('User registered successfully');
                    window.location.href = 'login.html'; // Redirect to login page
                } else {
                    alert(`Error: ${data.error}`);
                    console.error(data);
                }
            } catch (err) {
                console.error('Error during registration:', err);
                alert('An error occurred while registering');
            }
        });
    }

    // login user
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.user.username); // Store the username
                    localStorage.setItem('userId', data.user.id); // Store the user ID
                    alert('Login successful');
                    window.location.href = 'index.html'; // Redirect to index page
                } else {
                    alert(`Error: ${data.error}`);
                    console.error(data);
                }
            } catch (err) {
                console.error('Error during login:', err);
                alert('An error occurred while logging in');
            }
        });
    }

    // Fetch and display books
    if (bookList) {
        const fetchBooks = async () => {
            try {
                const token = getToken();
                if (!token) {
                    alert('You must be logged in to view the books.');
                    window.location.href = 'login.html';
                    return;
                }

                const res = await fetch('/api/books', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const books = await res.json();
                books.forEach(book => {
                    const bookItem = document.createElement('div');
                    bookItem.innerHTML = `<button onclick="showBookDetails('${book._id}')">${book.title}</button>`;
                    bookList.appendChild(bookItem);
                });
            } catch (err) {
                console.error('Error fetching books:', err);
                alert('An error occurred while fetching books');
            }
        };

        fetchBooks();
    }

    // Fetch user comments and favorites
    if (userComments || userFavorites) {
        const fetchUserData = async () => {
            try {
                const token = getToken();
                if (!token) {
                    alert('You must be logged in to view this page.');
                    window.location.href = 'login.html';
                    return;
                }

                const res = await fetch('/api/users/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const user = await res.json();

                if (userComments) {
                    user.comments.forEach(comment => {
                        const commentItem = document.createElement('div');
                        commentItem.innerHTML = `
                            <p>${comment.text} on ${comment.book.title}</p>
                            <button onclick="deleteComment('${comment.book._id}', '${comment._id}')">Delete Comment</button>
                        `;
                        userComments.appendChild(commentItem);
                    });
                }

                if (userFavorites) {
                    user.favourites.forEach(book => {
                        const favoriteItem = document.createElement('div');
                        favoriteItem.innerHTML = `
                            <h3>${book.title}</h3>
                            <p>${book.description}</p>
                            <button onclick="removeFavorite('${book._id}')">Remove from Favorites</button>
                            <button onclick="readBook('${book._id}')">Read</button>
                        `;
                        userFavorites.appendChild(favoriteItem);
                    });
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                alert('An error occurred while fetching user data');
            }
        };

        fetchUserData();
    }

    // Show categories
    window.showCategories = async () => {
        document.getElementById('categories-list').style.display = 'block';
        document.getElementById('books-list').style.display = 'none';
        document.getElementById('book-details').style.display = 'none';
        try {
            const res = await fetch('/api/books/categories', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            const categories = await res.json();
            const categoriesList = document.getElementById('categories-list');
            categoriesList.innerHTML = '<h2>Categories</h2>';
            categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.innerHTML = `<button onclick="showBooks('${category}')">${category}</button>`;
                categoriesList.appendChild(categoryItem);
            });
        } catch (err) {
            console.error('Error fetching categories:', err);
            alert('An error occurred while fetching categories');
        }
    };

    // Show books in category
    window.showBooks = async (category) => {
        if (category) currentCategory = category;
        document.getElementById('categories-list').style.display = 'none';
        document.getElementById('books-list').style.display = 'block';
        document.getElementById('book-details').style.display = 'none';
        try {
            const res = await fetch(`/api/books?category=${currentCategory}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            const books = await res.json();
            const booksContainer = document.getElementById('books-container');
            booksContainer.innerHTML = '';
            books.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.innerHTML = `<button onclick="showBookDetails('${book._id}')">${book.title}</button>`;
                booksContainer.appendChild(bookItem);
            });
        } catch (err) {
            console.error('Error fetching books by category:', err);
            alert('An error occurred while fetching books');
        }
    };

    // Show book details
    window.showBookDetails = async (bookId) => {
        currentBookId = bookId;
        document.getElementById('categories-list').style.display = 'none';
        document.getElementById('books-list').style.display = 'none';
        document.getElementById('book-details').style.display = 'block';
        try {
            const res = await fetch(`/api/books/${bookId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            const book = await res.json();
            const bookContainer = document.getElementById('book-container');
            bookContainer.innerHTML = '';
            bookContainer.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.description}</p>
                <p>Authors: ${book.authors.join(', ')}</p>
                <p>Published Year: ${book.published_year}</p>
                <p>Average Rating: ${book.average_rating}</p>
                <p>Number of Pages: ${book.num_pages}</p>
                <button onclick="readBook('${book._id}')">Read Book</button>
            `;
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = book.comments.map(comment => `<p data-comment-id="${comment._id}">${comment.text} by ${comment.user.username} <button onclick="deleteComment('${book._id}', '${comment._id}')">Delete</button></p>`).join('');
        } catch (err) {
            console.error('Error fetching book details:', err);
            alert('An error occurred while fetching book details');
        }
    };

    // Read book
    window.readBook = async (bookId) => {
        alert('Reading book: ' + bookId); // Implement your book reading logic here
    };

    // Mark book as favorite
    window.markFavorite = async () => {
        try {
            const token = getToken();
            const res = await fetch(`/api/books/${currentBookId}/favorite`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                alert('Book marked as favorite');
            } else {
                const data = await res.json();
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error('Error marking book as favorite:', err);
        }
    };

    // Remove favorite book
    window.removeFavorite = async (currentBookId) => {
        try {
            const token = getToken();
            const res = await fetch(`/api/books/${currentBookId}/favorite`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                alert('Book removed from favorites');
                document.querySelector(`[data-book-id="${currentBookId}"]`).remove(); // Remove the favorite book element
            } else {
                const data = await res.json();
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error('Error removing favorite:', err);
        }
    };

    // Add comment to book
    const addComment = async (bookId) => {
        const text = document.getElementById('comment-text').value;
        if (text) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`/api/books/${bookId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ text })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Comment added successfully');
                    location.reload(); // Refresh the page
                } else {
                    alert(`Error: ${data.error}`);
                    console.error('Error response:', data);
                }
            } catch (err) {
                console.error('Error adding comment:', err);
            }
        } else {
            alert('Comment text cannot be empty');
        }
    };
    
    // Delete comment from book
    const deleteComment = async (bookId, commentId) => {
        console.log(`Deleting comment ${commentId} from book ${bookId}`);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/books/${bookId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                alert('Comment deleted');
                location.reload(); // Refresh the page
            } else {
                const data = await res.json();
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    // Change user password
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;

            try {
                const token = getToken();
                const res = await fetch('/api/users/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ currentPassword, newPassword })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Password changed successfully');
                } else {
                    alert(`Error: ${data.error}`);
                }
            } catch (err) {
                console.error('Error changing password:', err);
            }
        });
    }
    // Handle query submission
    if (queryForm) {
        queryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const text = document.getElementById('query-text').value;

            try {
                const token = getToken();
                const res = await fetch('/api/queries/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ text })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Query submitted successfully');
                    queryForm.reset();
                } else {
                    alert(`Error: ${data.error}`);
                    console.error(data);
                }
            } catch (err) {
                console.error('Error submitting query:', err);
                alert('An error occurred while submitting your query');
            }
        });
    }

    // Fetch and display queries (admin view)
    const fetchQueries = async () => {
        try {
            const token = getToken();
            const res = await fetch('/api/queries', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const queries = await res.json();
            queries.forEach(query => {
                const queryItem = document.createElement('div');
                queryItem.innerHTML = `<p>${query.text} (submitted by ${query.user.username} on ${new Date(query.createdAt).toLocaleString()})</p>`;
                queriesList.appendChild(queryItem);
            });
        } catch (err) {
            console.error('Error fetching queries:', err);
            alert('An error occurred while fetching queries');
        }
    };

    // Initialize admin queries view
    if (queriesList) {
        fetchQueries();
    }


    // Delete user account
    if (deleteAccountButton) {
        deleteAccountButton.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                try {
                    const token = getToken();
                    const res = await fetch('/api/users/delete-account', {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (res.ok) {
                        alert('Account deleted successfully');
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userId');
                        window.location.href = 'register.html'; // Redirect to register page
                    } else {
                        const data = await res.json();
                        alert(`Error: ${data.error}`);
                    }
                } catch (err) {
                    console.error('Error deleting account:', err);
                    alert('An error occurred while deleting the account.');
                }
            }
        });
    }
});
