'use strict';

let nestedTable = document.getElementById("nested");
const searchButton = document.getElementById("search-button");
const search = document.getElementById("search");
const adminFilterButton = document.getElementById("adminFilter");
const requestFilterButton = document.getElementById("requestFilter");

/**
 * Search function
 */
searchButton.addEventListener("click", (event) => {
	let data = {
		input: search.value,
		type: "search",
	};
	let result = fetch("/user/adminSearch", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		.then(function (response) {
			return response.text();
		})
		.then(function (result) {
			let table = document.getElementById("tableBody");
			table.innerHTML = result;
			createListener();
			createEditListener();
			createAddListener();
			createDeleteListener();
		});
});

/**
 * Filter function for admin
 */
adminFilterButton.addEventListener("change", (event) => {
	if (adminFilterButton.checked) {
		requestFilterButton.checked = false;
		let data = {
			input: adminFilterButton.checked,
			type: "admin",
		};
		let result = fetch("/user/adminSearch", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			.then(function (response) {
				return response.text();
			})
			.then(function (result) {
				let table = document.getElementById("tableBody");
				table.innerHTML = result;
				createListener();
				createEditListener();
				createAddListener();
				createDeleteListener();
			});
	} else {
		let data = {
			input: "",
			type: "search",
		};
		let result = fetch("/user/adminSearch", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			.then(function (response) {
				return response.text();
			})
			.then(function (result) {
				let table = document.getElementById("tableBody");
				table.innerHTML = result;
				createListener();
				createEditListener();
				createAddListener();
				createDeleteListener();
			});
	}

});

/**
 * Filter function for admin
 */
requestFilterButton.addEventListener("change", (event) => {
	if (requestFilterButton.checked) {
		adminFilterButton.checked = false;
		let data = {
			input: requestFilterButton.checked,
			type: "request",
		};
		let result = fetch("/user/adminSearch", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			.then(function (response) {
				return response.text();
			})
			.then(function (result) {
				let table = document.getElementById("tableBody");
				table.innerHTML = result;
				createListener();
				createEditListener();
				createAddListener();
				createDeleteListener();
			});
	} else {
		let data = {
			input: "",
			type: "search"
		};
		let result = fetch("/user/adminSearch", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			.then(function (response) {
				return response.text();
			})
			.then(function (result) {
				let table = document.getElementById("tableBody");
				table.innerHTML = result;
				createListener();
				createEditListener();
				createAddListener();
				createDeleteListener();
			});
	}
});

createListener();

/**
 * Function for collapsible table
 */
function createListener() {
	const expandBtn = document.querySelectorAll("#more-info");
	for (let i = 0; i < expandBtn.length; i++) {
		expandBtn[i].addEventListener("click", (event) => {
			if (
				document.getElementById("nested-table-" + (i + 1)).style.display !=
				"block"
			) {
				document.getElementById("info-" + (i + 1)).style.display = "table-row";
				document.getElementById("nested-table-" + (i + 1)).style.display =
					"block";
				expandBtn[i].innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
			} else {
				document.getElementById("info-" + (i + 1)).style.display = "none";
				document.getElementById("nested-table-" + (i + 1)).style.display =
					"none";
				expandBtn[i].innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
			}
		});
	}
}

createDeleteListener();

/**
 * Function for delete button
 */
function createDeleteListener() {
	const modalText = document.getElementById("modalText");
	const loggedInName = document.getElementById("name").innerText;
	const deleteBtn = document.querySelectorAll("#confirmModal");
	const cancelBtn = document.getElementById("noBtn");
	const confirmBtn = document.getElementById("yesBtn");
	var confirmModal = document.getElementById("confirmDeleteModal");
	for (let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener("click", (event) => {
			if (loggedInName == deleteBtn[i].value) {
				modalText.innerText = "You can't delete yourself";
				confirmModal.style.setProperty("display", "flex", "important");
				confirmBtn.style.setProperty("display", "none", "important");
			} else {
				modalText.innerHTML =
					"Do you want to delete " + deleteBtn[i].value + "'s account?";
				confirmBtn.addEventListener("click", function (e) {
					window.location.href = "/user/delete/" + deleteBtn[i].value;
				});
				confirmBtn.style.setProperty("display", "inline-block", "important");
				confirmModal.style.setProperty("display", "flex", "important");
			}
		});
	}

	cancelBtn.addEventListener("click", (event) => {
		confirmModal.style.setProperty("display", "none", "important");
	});
}

createEditListener();

/**
 * Function for edit button
 */
function createEditListener() {
	const loggedInName = document.getElementById("name").innerText;
	let isAdminLabel = document.getElementById("isAdminLabel");
	let nameField = document.getElementById("nameField");
	let emailField = document.getElementById("emailField");
	let passwordField = document.getElementById("passwordField");
	let bioField = document.getElementById("bioField");
	let isAdmin = document.getElementById("isAdmin");
	let reasonField = document.getElementById("reason");
	const closeBtn = document.getElementById("closeModalButton");
	const submitBtn = document.getElementById("submitButton");
	const editModalBtn = document.querySelectorAll("#editModalButton");
	var editModal = document.getElementById("addUserModal");
	const form = document.getElementById("userForm");
	for (let i = 0; i < editModalBtn.length; i++) {
		editModalBtn[i].addEventListener("click", async function (event) {
			await localStorage.setItem("oldName", editModalBtn[i].value);
			let data = {
				oldName: editModalBtn[i].value,
			};
			fetch("/user/loadEditModal", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					if (result != null) {
						nameField.value = result.name;
						emailField.value = result.email;
						passwordField.value = result.password;
						bioField.value = result.about;
						isAdmin.checked = result.admin;
						document.getElementById("confirm-password").value = result.password;

						isAdminLabel.innerText = isAdmin.checked ? "Demote to user" : "Promote to admin";

						if (editModalBtn[i].value == loggedInName) {
							isAdmin.disabled = true;
							isAdminLabel.innerText = "You can't demote yourself"
						} else {
							isAdmin.disabled = false;
						}

						if (result.reason != null && result.reason != '' && result.reason != undefined && result.admin == false) {
							document.getElementById("reasonTitle").innerHTML = "reason for admin request";
							reasonField.innerHTML = result.reason;
						} else {
							document.getElementById("reasonTitle").innerHTML = "";
						}
						editModal.style.setProperty("display", "flex", "important");
						submitBtn.value = "update account";
					} else {
						document.getElementById("userForm").innerHTML = result.error;
					}
				});
		});
	}

	closeBtn.addEventListener("click", (event) => {
		editModal.style.setProperty("display", "none", "important");
	});
}

/**
 * Function that makes sure the email has valid characters and is in the proper format
 * @param {The email string to be checked} mail 
 * @returns true if the email is valid, false otherwise
 */
function ValidateEmail(mail) 
{
 if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

// changes the text for the promote an admin button based on wheither they have been demoted or promoted
document.getElementById("isAdmin").addEventListener("click", function (e) {
	isAdminLabel.innerText = isAdmin.checked ? "Demote to user" : "Promote to admin";
});
// use the fetch api to update the user's profile
document
	.getElementById("submitButton")
	.addEventListener("click", async function (e) {
		e.preventDefault();
		// Check if the email input is valid
		let email = document.getElementById("emailField").value;
		if (ValidateEmail(email) == true) {

			let password = document.getElementById("passwordField").value;
			let confirm = document.getElementById("confirm-password").value;
			if (password == confirm) {
				let submitBtn = document.getElementById("submitButton");
				let oldName = await localStorage.getItem("oldName");
				let form = document.getElementById("userForm");
				let formData = new FormData(form);
				formData.append("oldName", oldName);
				let fetchPath =
					submitBtn.value == "create account" ?
					"/user/createAccountAdmin" :
					"/user/editAccountAdmin";
				let result = fetch(fetchPath, {
						method: "POST",
						body: formData,
					})
					.then(function (response) {
						return response.json();
					})
					.then(function (result) {
						if (result.success) {
							window.location.replace("/user/admin");
						} else {
							let inputs = document.querySelectorAll(".inputFields");
							inputs.forEach((input) => input.style.backgroundColor = "rgba(255, 255, 255, 0)");
							document.getElementById("errorMsg").innerText = result.error;
							document.getElementById(result.type + "Field").style.backgroundColor = 'var(--accent-light)';
						}
					});
			} else {
				document.getElementById("errorMsg").innerText = "Password does not match.";
				let inputs = document.querySelectorAll(".inputFields");
				inputs.forEach((input) => input.style.backgroundColor = "rgba(255, 255, 255, 0)");
				document.getElementById("passwordField").style.backgroundColor = 'var(--accent-light)';
			}
		} else {
			document.getElementById("errorMsg").innerText = "Incomplete Email";
			let inputs = document.querySelectorAll(".inputFields");
			inputs.forEach((input) => input.style.backgroundColor = "rgba(255, 255, 255, 0)");
			document.getElementById("emailField").style.backgroundColor = 'var(--accent-light)';
		}
	});

/**
 * Script for text area remaining char status
 */
const textarea = document.querySelector("textarea");

/**
 * A listener for the text area to show how many characters are remaining that the user can enter
 */
textarea.addEventListener("input", ({
	currentTarget: target
}) => {
	const maxLength = target.getAttribute("maxlength");
	const currentLength = target.value.length;

	if (currentLength >= maxLength) {
		return (document.getElementById("textarea_remaining_char").innerText =
			"You have reached the maximum number of characters.");
	}

	document.getElementById("textarea_remaining_char").innerText =
		maxLength - currentLength + " characters left";
});

/**
 * Scripts for the modal popup for add user function
 */
createAddListener();

function createAddListener() {
	// Get the modal
	var modal = document.getElementById("addUserModal");

	// Get the button that opens the modal
	var btn = document.getElementById("addUserButton");

	// Get the <span> element that closes the modal
	var closeModal = document.getElementById("closeModalButton");

	const form = document.getElementById("userForm");

	// When the user clicks on the button, open the modal
	btn.onclick = function () {
		document.getElementById("submitButton").value = "create account";
		modal.style.setProperty("display", "flex", "important");
	};

	// When the user clicks on <span> (x), close the modal
	closeModal.onclick = function () {
		modal.style.setProperty("display", "none", "important");
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}

document
	.getElementById("file-container")
	.addEventListener("click", function () {
		document.getElementById("pfp").click();
	});

document.getElementById("pfp").addEventListener("change", function () {
	document.getElementById("file-label").innerHTML =
		document.getElementById("pfp").files[0].name;
});