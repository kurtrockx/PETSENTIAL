import UserModel from "../../src/js/model/userModel";

// Function to collect appointment data from form inputs
const collectAppointmentData = () => {
  try {
    const emailInput = document.querySelector(".input-email").value.trim();
    const dateInput = document.querySelector(".input-day").value;
    const timeInput = document.querySelector(".input-time").value;

    if (!emailInput || !dateInput || !timeInput) {
      throw new Error("All fields are required.");
    }

    return {
      email: emailInput,
      date: dateInput,
      time: timeInput,
    };
  } catch (err) {
    console.error("Error collecting data:", err.message);
    alert(err.message);
  }
};

// Function to add the appointment to the database
async function addAppointmentDB(userId, appointment) {
  const apiUrl = "http://localhost/PETSENTIALS/src/php/addToCart.php";
  const requestData = {
    action: "addAppointment",
    userId,
    appointment,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      throw new Error(result.error || "Failed to add appointment.");
    }

    console.log("Appointment added successfully:", result);
    alert(result.message || "Appointment added successfully.");
  } catch (error) {
    console.error("Error adding appointment:", error.message);
    alert(error.message || "An error occurred while adding the appointment.");
  }
}

// Event listener for the submit button
document.querySelector(".submit-app-btn").addEventListener("click", async () => {
  try {
    if (!UserModel.currentUser || !UserModel.currentUser._id?.$oid) {
      throw new Error("User not logged in or invalid session.");
    }

    const userId = UserModel.currentUser._id;
    const appointmentData = collectAppointmentData();

    if (!appointmentData) return; // Exit if data collection fails

    await addAppointmentDB(userId, appointmentData);
  } catch (err) {
    console.error("Error:", err.message);
    alert(err.message);
  }
});
