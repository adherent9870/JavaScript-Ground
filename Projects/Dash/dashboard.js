const NEWS_API_URL = "https://ok.surf/api/v1/news-section";
let newsfeed;
let postsContent = `<div class="home-content"><h3>Manage your Posts</h3><input class="search-posts" placeholder="search your posts.."/><button class="clear">clear</button><div class="manage-posts"></div></div>`;
let homeContent = `<div class="home-content"><h3>Homes</h3></div>`;
let accountContent = `<div class="account-content"><h3>Account</h3> </div>`;
window.onload = () => {
  fetchNews();

  //sidebar navigation
  const nav = document.querySelector(".nav-container");
  const activeContainer = document.querySelector(".active-nav-container");

  nav.addEventListener("click", (e) => {
    const target = e.target.classList[0];
    if (target == "home") {
      activeContainer.innerHTML = homeContent;
    } else if (target == "posts") {
      activeContainer.innerHTML = postsContent;
    } else if (target == "account") {
      activeContainer.innerHTML = accountContent;
    }
  });

  //feeds
  const content = document.querySelector(".content");
  let news = `<div class="news-container">
  <h2>World</h2>`;
  newsfeed?.forEach((element) => {
    news += `<div class="news-item">
      <h3>${element.title}</h3>
      <p>${element.description}</p>
    </div>`;
  });
  news += `</div>`;
  console.log(news);
};

function fetchNews() {
  fetch("https://ok.surf/api/v1/cors/news-feed")
    .then((res) => {
      if (!res.ok) {
        console.error("Error fetching news");
        return;
      }
      return res.json();
    })
    .then((data) => {
      newsfeed = data;
      console.log(newsfeed);
    })
    .catch((err) => {
      console.log(err);
    });
}

const Account = `<div class="account-content"></div>`;
