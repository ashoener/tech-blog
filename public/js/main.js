const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const createPostForm = document.getElementById("createPostForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

const logoutButton = document.querySelector('a[href="/logout"]');

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setTimeout(() => {
        location.href = "/";
      }, 500);
    } else {
      const error = await res.json();
      console.log(error);
      alert("todo");
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setTimeout(() => {
        location.href = "/";
      }, 500);
    } else {
      const error = await res.json();
      console.log(error);
      alert("todo");
    }
  });
}

if (createPostForm) {
  createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      title: titleInput.value,
      content: contentInput.value,
    };
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const { link } = await res.json();
      location.href = link;
    } else {
      const error = await res.json();
      console.log(error);
      alert("todo");
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/logout", { method: "GET" });
    if (res.ok) {
      location.href = "/";
    } else console.log(await res.json());
  });
}
