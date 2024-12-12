import UserModel from "../../src/js/model/userModel";
import phLogo from "../../src/assets/images/logo.png";
import phLogo2 from "../../src/assets/images/phLogo2.png";

const checkAdmin = () => {
  if (!UserModel.currentUser) return;
  const currentUser = UserModel.currentUser;
  const adminCredentials = UserModel.adminCredentials;
  if (
    currentUser.username === adminCredentials.username &&
    currentUser.password === adminCredentials.password
  ) {
    window.location.href = "adminEditProducts.html";
  }
};

const logout = (logoutButton) => {
  logoutButton.addEventListener("click", UserModel.logoutUser);
};

const insertNavbar = () => {
  const html = `
    <nav class="nav">
      <div class="navbar">
        <a href="index.html" class="navlogo">
          <img src="${phLogo}" />
          <p class="pet-title">PETSENTIAL</p>
        </a>
        <div class="navlink-logo-pet">
            <a href="index.html" class="navlink">HOME</a>
            <a href="store.html" class="navlink">STORE</a>
            <a href="cart.html" class="navlink">CART  </a>
            <a href="profile.html" class="navlink">PROFILE</a>
            <a href="index.html" class="navlink navlink-logout">LOG OUT</a>
          </div>
      </div>
    </nav>
`;
  document.body.insertAdjacentHTML("afterbegin", html);
  const logoutButton = document.querySelector(".navlink-logout");

  logout(logoutButton);
};

const init = () => {
  insertNavbar();
  checkAdmin();
};

init();
