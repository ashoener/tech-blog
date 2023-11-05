const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const createPostForm = document.getElementById("createPostForm");
const updatePostForm = document.getElementById("updatePostForm");
const addCommentForm = document.getElementById("addCommentForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const idInput = document.getElementById("id");

const logoutButton = document.querySelector('a[href="/logout"]');
const deletePostButton = document.getElementById("delete");

let editor;
if (contentInput) {
  editor = new toastui.Editor({
    el: contentInput,
    initialEditType: "wysiwyg",
    usageStatistics: false,
    theme: "dark",
  });
}

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
      // if the response is ok, redirect to the home page
      setTimeout(() => {
        location.href = "/";
      }, 500);
    } else {
      // if the response is not ok, render the errors
      const error = await res.json();
      renderErrors(error.errors);
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
      // if the response is ok, redirect to the home page
      setTimeout(() => {
        location.href = "/";
      }, 500);
    } else {
      // if the response is not ok, render the errors
      const error = await res.json();
      renderErrors(error.errors);
    }
  });
}

if (createPostForm) {
  createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      title: titleInput.value,
      content: editor.getMarkdown(),
    };
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      // if the response is ok, redirect to the dashboard
      location.href = "/dashboard";
    } else {
      const error = await res.json();
      renderErrors(error.errors);
    }
  });
}

if (addCommentForm) {
  addCommentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      content: editor.getMarkdown(),
    };
    const res = await fetch(`/api/posts/${idInput.value}/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      // if the response is ok, reload the page
      location.reload();
    } else {
      // if the response is not ok, render the errors
      const error = await res.json();
      renderErrors(error.errors);
    }
  });
}

if (updatePostForm) {
  fetch(`/api/posts/${idInput.value}`)
    .then((res) => res.json())
    .then((data) => editor.setMarkdown(data.post.content));
  updatePostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      title: titleInput.value,
      content: editor.getMarkdown(),
    };
    const res = await fetch(`/api/posts/${idInput.value}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      // if the response is ok, redirect to the dashboard
      location.href = "/dashboard";
    } else {
      // if the response is not ok, render the errors
      const error = await res.json();
      renderErrors(error.errors);
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/logout", { method: "GET" });
    if (res.ok) {
      // if the response is ok, redirect to the home page
      location.href = "/";
    } else {
      // if the response is not ok, render the errors
      const error = await res.json();
      renderErrors(error.errors);
    }
  });
}

if (deletePostButton) {
  deletePostButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${idInput.value}`, {
      method: "DELETE",
    });
    if (res.ok) {
      // if the response is ok, redirect to the dashboard
      location.href = "/dashboard";
    } else {
      // if the response is not ok, render the errors
      const error = await res.json();
      renderErrors(error.errors);
    }
  });
}

function renderErrors(errors) {
  const errorsContainer = document.getElementById("errors");
  errorsContainer.innerHTML = ""; // clear the errors container
  errors.forEach((error) => {
    // for each error, create a new div and append it to the errors container
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger");
    errorDiv.innerText = error;
    errorsContainer.appendChild(errorDiv);
  });
  errorsContainer.classList.remove("d-none");
}
