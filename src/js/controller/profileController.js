import ProfileView from "../view/profileView";
import UserModel from "../model/userModel";
import ProfileModel from "../model/profileModel";

const checkCurrentUser = () => {
  if (!UserModel.currentUser) {
    window.location.href = "index.html";
  }
};

const spawnPurchaseHistory = async () => {
  try {
    const currentPurchaseHistory =
      await ProfileModel.setCurrentPurchaseHistory();

    if (!currentPurchaseHistory.length) {
      ProfileView.renderNoItems();
      return;
    }

    const historyHTML = currentPurchaseHistory
      .map((item) => ProfileView.purchaseHistoryItemHTML(item))
      .reverse()
      .join("");
    ProfileView.profileContentContainer.insertAdjacentHTML(
      "beforeend",
      historyHTML
    );
  } catch (err) {
    console.error(err.message);
  }
};

const openModalFunction = (e) => {
  const openModalButton = e.target.closest(".open-modal-button");
  if (!openModalButton) return;

  ProfileView.userCredentialsModal.classList.remove("gone");
};

const closeModalFunction = () => {
  ProfileView.userCredentialsModal.classList.add("gone");
};

const init = async () => {
  checkCurrentUser();
  UserModel.pullUsersFromDB();
  document
    .querySelector("main")
    .insertAdjacentHTML(
      "afterbegin",
      ProfileView.userInfoHTML(UserModel.currentUser)
    );
  spawnPurchaseHistory();
  ProfileView.changeCredentials(changeUserCredentials);
  ProfileView.openModal(openModalFunction);
  ProfileView.closeModal(closeModalFunction);
};
init();
