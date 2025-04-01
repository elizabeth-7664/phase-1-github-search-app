document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    // Function to search users from GitHub
    const searchUsers = async (query) => {
      const url = `https://api.github.com/search/users?q=${query}`;
      const response = await fetch(url, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      });
      const data = await response.json();
      displayUsers(data.items); // Display user search results
    };
  
    // Function to display the users in the list
    const displayUsers = (users) => {
      userList.innerHTML = ''; // Clear previous user search results
      if (users.length === 0) {
        userList.innerHTML = '<li>No users found.</li>';
      } else {
        users.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
            <button data-username="${user.login}">Show Repositories</button>
          `;
          
          // Event listener for showing repositories
          li.querySelector('button').addEventListener('click', () => {
            fetchRepos(user.login); // Fetch repos when button is clicked
          });
  
          userList.appendChild(li);
        });
      }
    };
  
    // Function to fetch repositories for a specific user
    const fetchRepos = async (username) => {
      const url = `https://api.github.com/users/${username}/repos`;
      const response = await fetch(url, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      });
      const repos = await response.json();
      displayRepos(repos); // Display repos of the selected user
    };
  
    // Function to display repositories in the list
    const displayRepos = (repos) => {
      reposList.innerHTML = ''; // Clear previous repositories
  
      if (repos.length === 0) {
        reposList.innerHTML = '<li>No repositories found.</li>';
      } else {
        repos.forEach(repo => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
          reposList.appendChild(li);
        });
      }
    };
  
    // Handle form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload on form submission
      const query = searchInput.value.trim(); // Get the search input value
      if (query) {
        searchUsers(query); // Call the searchUsers function
      }
    });
  });
  