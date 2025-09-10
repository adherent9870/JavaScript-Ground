// async function ka basic version
// Declare an async function
async function myFunction() {
  // Use await to wait for a Promise to resolve
  const result = await someAsyncOperation();
  return result;
}

window.onload = function () {
  async function abc() {
    return "hello mere bete╰(*°▽°*)╯";
  }

  // equivalent to
  function xyz() {
    return Promise.resolve("hello mere bete");
  }
  //   debugger;
  console.log(abc().then((value) => console.log(value)));
};

//real life example
async function loadUserProfile(userId) {
  try {
    const [user, posts, friends] = await Promise.all([
      fetch(`/api/users/${userId}`),
      fetch(`/api/users/${userId}/posts`),
      fetch(`/api/users/${userId}/friends`),
    ]);

    return {
      user: await user.json(),
      posts: await posts.json(),
      friends: await friends.json(),
    };
  } catch (error) {
    console.error("Failed to load user profile:", error);
    throw new Error("Could not load profile data");
  }
}

//-------------------------------------------------

//async
async function lucknow() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("city of nawabs");
    }, 2000);
  });
}
