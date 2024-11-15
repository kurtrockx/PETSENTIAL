//Navigation
import burgerIcon from "../../assets/svg/burger.svg";
import xIcon from "../../assets/svg/x.svg";
import pormaLogo from "../../assets/images/phLogo.png";
import pormaLogo2 from "../../assets/images/phLogo2.png";
import userIcon from "../../assets/images/user.png";
import cartIcon from "../../assets/images/cart.png";

const burgerMenu = (
  navlinksBackground,
  navlinksContainer,
  burgerButton,
  burgerExitButton
) => {
  const burgerMenuOpen = () => {
    navlinksBackground.classList.remove("hidden");
    navlinksContainer.classList.remove("burger-translate");
  };
  const burgerMenuClose = () => {
    navlinksContainer.classList.add("burger-translate");
    navlinksBackground.classList.add("hidden");
  };
  burgerButton.addEventListener("click", burgerMenuOpen);
  [navlinksBackground, burgerExitButton].forEach((el) =>
    el.addEventListener("click", burgerMenuClose)
  );
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      burgerMenuClose();
    }
  });
};

const insertNavbar = () => {
  const html = `
    <nav class="nav">
      <div class="navbar">
        <a href="index.html" class="navlogo">
          <img src="${pormaLogo}" />
          <p class="pormahub-logo-text">
            PORMA <span id="hub-logo-text">HUB</span>
          </p>
        </a>
        <div class="nav-burger">
          <img src="${burgerIcon}" />
        </div>
        <div class="navlinks-background hidden"></div>
        <div class="navlinks-container burger-translate">
          <img src="${xIcon}" class="burger-exit" />
          <div class="navlinks-title">Porma<span id="hub-text">hub</span></div>
          
          <div class="navlink-icon-container">
            <a href="" class="navlink-icon">
              SHOPPING CART
              <img src="${cartIcon}" />
            </a>
            <a href="" class="navlink-icon">
            USERNAME
              <img src="${userIcon}" />
            </a>
          </div>

          <a href="index.html" class="navlink">HOME</a>
          <a href="store.html" class="navlink">STORE</a>
          <a href="" class="navlink">ABOUT US</a>
          <a href="" class="navlink">CONTACT US</a>

          <img src="${pormaLogo2}" class="navlink-logo" />

        </div>
      </div>
    </nav>
`;
  document.body.insertAdjacentHTML("afterbegin", html);

  //Navigation
  const navlinksBackground = document.querySelector(".navlinks-background");
  const navlinksContainer = document.querySelector(".navlinks-container");
  //Burger
  const burgerButton = document.querySelector(".nav-burger");
  const burgerExitButton = document.querySelector(".burger-exit");

  burgerMenu(
    navlinksBackground,
    navlinksContainer,
    burgerButton,
    burgerExitButton
  );
};

const init = () => {
  insertNavbar();
};

init();