const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

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
      location.href = "/";
    } else {
      const error = await res.json();
      console.log(error);
      alert("todo");
    }
  });
}
