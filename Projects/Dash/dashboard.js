let postsfeed;

//=============================================================================================
window.onload = async () => {
  //---------------------------Main Driver CODE----------------------------------------------------------
  //sidebar navigation------------------------------------------------------------------------
  const nav = document.querySelector(".nav-container");
  const activeContainer = document.querySelector(".active-nav-container");

  let homeContent = `<div class="home-content"><h3>Homes</h3></div>`;
  let accountContent = `<div class="account-content"><h3>Account</h3> </div>`;

  const postsByuser = await yourPosts(); // posts uploaded by a particular user
  renderyourPosts(postsByuser);

  nav.addEventListener("click", (e) => {
    const target = e.target.classList[0];
    document
      .querySelectorAll(".section")
      .forEach((sec) => sec.classList.remove("active"));

    if (target === "home") {
      document.querySelector(".home-container").classList.add("active");
    } else if (target === "posts") {
      document.querySelector(".post-container").classList.add("active");
    } else if (target === "account") {
      document.querySelector(".account-container").classList.add("active");
    } else if (target === "friendss") {
      document.querySelector(".friends-container").classList.add("active");
    }
  });

  // creating new Post
  const create = document.forms["create-post"];
  create.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const sendData = {
        header: create.title.value,
        content: create.body.value,
        category: create.category.value,
        city: create.city.value,
        img: create.url.value,
        by: JSON.parse(localStorage.getItem("user"))._id,
      };
      console.log(sendData);

      const abc = await fetch("http://127.0.0.1:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(sendData),
      });
      console.log(abc.json());
      const postsByuser = await yourPosts(); // posts uploaded by a particular user
      renderyourPosts(postsByuser);
      const content = document.querySelector(".content");
      const feeds = await renderFeeds();
      content.innerHTML = feeds;
    } catch (err) {
      console.error(err);
    }
  });
  // friends-------------------------------------------------------------------------------
  const friendsList = await friendsRequests();
  renderListOfFriends(friendsList);
  //feeds------------------------------------------------------------------------------------
  const content = document.querySelector(".content");
  const feeds = await renderFeeds();
  content.innerHTML = feeds;

  //chat functionality-----------------------------------------------------------------------

  const list = document.querySelector(".friends-list");

  list.addEventListener("click", async (e) => {
    console.log(e.target);
    const targetId = e.target.getAttribute("class");
    const name = e.target.getAttribute("key");
    const result = await createRoom(targetId);
    if (result.status == "success") {
      openChat(targetId, name, result);
    }
  });

  //---------------------------Main Driver CODE----------------------------------------------------------
};
//=============================================================================================
//---------------------------------------------------------------------------------------------
async function fetchfeeds() {
  try {
    const res = await fetch("http://127.0.0.1:3000/posts");
    if (!res.ok) {
      throw new Error("Error fetching news");
    }
    const data = await res.json();
    postsfeed = data.data.posts;
    console.log(postsfeed);
    postsfeed.reverse();
  } catch (err) {
    console.log(err);
  }
}

async function renderFeeds() {
  await fetchfeeds();
  let feeds = `<div class="feeds">`;

  postsfeed.forEach((post) => {
    let newPost = `
    <div class="post">
      <div class="post-image-container">
        <img src="${post.img}" alt="${post.header}" class="post-image"/>
      </div>
      <div class="post-content">
        <h2>${post.header}</h2>
        <p class="post-description">${post.content}</p>
        <h4>${post.postBy?.name || "Anonymous"}</h4>
        ${post.city ? `<span class="post-city">City: ${post.city}</span>` : ""}
        ${
          post.category
            ? `<span class="post-category">Category: ${post.category}</span>`
            : ""
        }
              <div class="post-actions"><button class="like-btn">❣️ (${
                post.likes
              })</button>
      </div>

      <div class="comment-box">Comment (${post.comments.length})</div>  
    </div></div>`;
    // console.log(newPost);
    feeds += newPost;
  });

  feeds += `</div>`;

  // console.log(feeds);
  return feeds;
}

const Account = `<div class="account-content"></div>`;

//---------------------------------------users posts-------------------------------------------
async function yourPosts() {
  const userId = {
    user: JSON.parse(localStorage.getItem("user"))._id,
  };
  console.log(userId);
  let respons = await fetch("http://127.0.0.1:3000/posts/userposts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  respons = await respons.json();
  // console.log(respons.data.posts);
  return respons.data.posts;
}
function renderyourPosts(postsByuser) {
  // console.log(postsByuser);
  let postsBy = `<ul class="listOfPosts">`;
  if (Array.isArray(postsByuser)) {
    postsByuser.map((e) => {
      postsBy += `<li><span>Title is  ${e.header}. <p><i>"${e.content}"</i></p><button class="delete-post" onClick="deletePost('${e._id}')">Delete</button></span> <img src="${e.img}">
      
      </li><br/>`;
    });
  }
  postsBy += `</ul>`;

  let listpost = document.querySelector(".list-post");
  listpost.innerHTML = postsBy;
  // console.log("List post element:", listpost);
  // console.log("Posts by user HTML:", postsBy);
}

//-----------------------deleting particular post-------------------------------------------
async function deletePost(id) {
  try {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }
    const response = await fetch(`http://127.0.0.1:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete the post");
    }
    console.log("Post deleted successfully");
    const postsByuser = await yourPosts();
    renderyourPosts(postsByuser);
    const feeds = await renderFeeds();
    content.innerHTML = feeds;
  } catch (err) {
    console.error(err);
  }
}

async function friendsRequests() {
  try {
    console.log(JSON.parse(localStorage.getItem("user")));
    const friendsList = await fetch(
      `http://127.0.0.1:3000/profiles/friends/${
        JSON.parse(localStorage.getItem("user"))._id
      }`
    );

    if (!friendsList.ok) {
      throw new Error("Error fetching friends list");
    }
    const friendsData = await friendsList.json();
    console.log(friendsData);
    return friendsData;
  } catch (err) {
    console.error(err);
  }
}

function renderListOfFriends(friendsData) {
  console.log(friendsData?.friends);
  let list = `<ul class="listOfPosts">`;
  friendsData?.friends.forEach((friend) => {
    list += `<li class="${friend.name}">${friend.name} <button class="${friend._id}" key="${friend.name}">Chat</button></li>`;
  });
  list += `</ul>`;
  console.log(list);
  const requestList = document.querySelector(".friends-list");
  requestList.innerHTML = list;
}

async function createRoom(targetId) {
  try {
    console.log(JSON.parse(localStorage.getItem("user"))._id);
    let response = await fetch("http://127.0.0.1:3000/conversation/direct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId1: `${JSON.parse(localStorage.getItem("user"))._id}`,
        userId2: targetId,
      }),
    });
    response = await response.json();
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
}

async function openChat(id, name, result) {
  const heading = `<h4>Chatting with ${name}</h4>`;
  const input = `
    <div class="chat-message">
      <input type="text" class="message" placeholder="Type your Message..."/>
      <button class="send" type="submit">Send</button>
    </div>`;

  //-------------------get the history of messages with a persson-------------------
  const convoID = result.data?.conversation?._id;
  const messages = await fetch(
    `http://127.0.0.1:3000/messages/${convoID}`
  ).then((res) => res.json());
  console.log(messages);

  let body = `<ul class="body">`;
  messages.map((mes) => {
    console.log(mes);
    body += `<li class="${mes}"> ${mes.content}</li>`;
  });
  body += `</ul>`;

  document.querySelector(".chat-container").innerHTML = heading + body + input;

  //--------------------- Sending messages---------------------------------------
  const message = document.querySelector(".message");
  const sendMessage = document.querySelector(".send");
  sendMessage.addEventListener("click", async () => {
    if (message.value === "") {
      alert("please add message");
      return;
    }
    const response = await fetch(`http://127.0.0.1:3000/messages/${convoID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: JSON.parse(localStorage.getItem("user"))._id,
        content: message.value,
      }),
    }).then((res) => res.json());

    const li = document.createElement("li");
    li.textContent = `${JSON.parse(localStorage.getItem("user")).name}: ${
      message.value
    }`;
    chatBox.appendChild(li);

    message.value = "";
  });
}
