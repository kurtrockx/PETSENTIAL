class ProfileView {
  profileTabsContainer;
  profileTabs;
  profileContentContainer;

  constructor() {
    this.profileTabsContainer = document.querySelector(
      ".profile-tab-container"
    );
    this.profileTabs = document.querySelectorAll(".profile-tab");
    this.profileContentContainer = document.querySelector(".profile-content");
  }

  switchTab(switchTabFunction) {
    this.profileTabsContainer.addEventListener("click", switchTabFunction);
  }

  purchaseHistoryItemHTML(purchaseItem) {
    this.profileContentContainer.innerHTML = "";
    const date = new Date(purchaseItem.date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(date);

    return `
      <div class="purchase-history-item">
        <div class="date-of-purchase">${formattedDate}</div>
        <div class="item-container">
          ${purchaseItem.items
            .map((item) => {
              return `
              <div class="item">
                <div class="item-name-picture">
                  <div class="item-picture">
                    <img src="${item.thumbnail}" class="item-picture-value"/>
                  </div>
                  <div class="item-name">${item.name}</div>
                </div>
                <div class="size">${item.size}</div>
                <div class="quantity">${item.quantity}</div>
                <div class="total-price">$${(
                  item.quantity * item.price
                ).toFixed(2)}</div>
                <div class="status">${purchaseItem.status}</div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;
  }
  userInfoHTML(user) {
    return `
          <div class="details-container">
            <div class="detail">
              <div class="detail-bold">Name</div>
              <div class="detail-value">${user.firstname}</div>
            </div>
            <div class="detail">
              <div class="detail-bold">Username</div>
              <div class="detail-value">${user.username}</div>
            </div>
            <div class="detail">
              <div class="detail-bold">Email</div>
              <div class="detail-value">${user.email}</div>
            </div>
            <div class="detail">
              <div class="detail-bold">Address</div>
              <div class="detail-value">${user.address}</div>
            </div>
            <div class="detail">
              <div class="detail-bold">Contact No.</div>
              <div class="detail-value">${user.contactNumber}</div>
            </div>
          </div>
`;
  }
}

export default new ProfileView();
