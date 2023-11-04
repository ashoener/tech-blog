const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const createPostForm = document.getElementById("createPostForm");
const updatePostForm = document.getElementById("updatePostForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const idInput = document.getElementById("id");

const logoutButton = document.querySelector('a[href="/logout"]');
const deletePostButton = document.getElementById("delete");

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
      setTimeout(() => {
        location.href = "/";
      }, 500);
    } else {
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
      renderErrors(error.errors);
    }
  });
}

if (updatePostForm) {
  updatePostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      title: titleInput.value,
      content: contentInput.value,
    };
    const res = await fetch(`/api/posts/${idInput.value}`, {
      method: "PUT",
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
      renderErrors(error.errors);
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/logout", { method: "GET" });
    if (res.ok) {
      location.href = "/";
    } else {
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
      location.href = "/dashboard";
    } else {
      const error = await res.json();
      renderErrors(error.errors);
    }
  });
}

function renderErrors(errors) {
  const errorsContainer = document.getElementById("errors");
  errorsContainer.innerHTML = "";
  errors.forEach((error) => {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger");
    errorDiv.innerText = error;
    errorsContainer.appendChild(errorDiv);
  });
  errorsContainer.classList.remove("d-none");
}
