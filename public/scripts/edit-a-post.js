"use strict";

const titleBox = document.getElementById("title-box");
const postBox = document.getElementById("post-box");
const addImage = document.getElementById("add-image");
const buttonsDiv = document.getElementById("buttons");

/**
 * Function to edit post when they submit.
 */
document.getElementById("submit").addEventListener("click", async (e) => {
	e.preventDefault();
	document.getElementById("errorMsg").innerHTML = "";
	replaceClass("form-container", "form-style", "on-load-form");
	titleBox.classList.add("hidden");
	postBox.classList.add("hidden");
	addImage.classList.add("hidden");
	buttonsDiv.classList.add("hidden");
	let form = document.getElementById("form-container");
	let formData = new FormData(form);
	formData.set(
		"content",
		tinymce.get("tinytext").getContent({
			format: "raw",
		})
	);
	formData.set("id", document.getElementById("postID").innerHTML);
	fetch("/user/editPost", {
		method: "POST",
		body: formData,
	})
		.then(function (result) {
			return result.json();
		})
		.then(function (result) {
			if (result.success == "true") {
				window.location.replace("/user/profile");
			} else {
				replaceClass("form-container", "on-load-form", "form-style");
				titleBox.classList.remove("hidden");
				postBox.classList.remove("hidden");
				addImage.classList.remove("hidden");
				buttonsDiv.classList.remove("hidden");
				document.getElementById("errorMsg").innerHTML = result.message;
				document.getElementsByClassName("tox")[0].style.border = "none";
				if (result.type != null && result.type != undefined) {
					let inputs = document.querySelectorAll(".inputFields");
					inputs.forEach(
						(input) => (input.style.backgroundColor = "rgba(255, 255, 255, 0)")
					);
					if (result.type == "title") {
						document.getElementById("title").style.backgroundColor =
							"var(--accent-light)";
					} else if (result.type == "pfp") {
						document.getElementById("file-container").style.backgroundColor =
							"var(--accent-light)";
					} else if (result.type == "post") {
						document.getElementsByClassName("tox")[0].style.border =
							"solid 5px var(--accent-light)";
					}
				}
				document.getElementById("loadingMsg").innerHTML = "";
			}
		});
});

/**
 * Function to cancel the edit post to redirect back to profile page.
 */
document.getElementById("cancelBtn").addEventListener("click", (e) => {
	e.preventDefault();
	window.location.replace("/user/profile");
});

/**
 * Function to upload an image.
 */
document
	.getElementById("file-container")
	.addEventListener("click", function () {
		document.getElementById("image").click();
	});

document.getElementById("image").addEventListener("change", function () {
	let count = document.getElementById("image").files.length;
	count = count <= 4 ? count : 4;
	document.getElementById("file-label").innerHTML = count + " files";
});

window.onload = function () {
	let data = {
		id: document.getElementById("postID").innerHTML,
	};
	fetch("/user/getPost", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((result) => {
			return result.json();
		})
		.then((result) => {
			document.getElementById("title").setAttribute("value", result.title);
			tinymce.get("tinytext").setContent(result.post);
		});
};

function replaceClass(id, oldClass, newClass) {
	var elem = document.getElementById(id);
	elem.classList.remove(oldClass);
	elem.classList.add(newClass);
}
