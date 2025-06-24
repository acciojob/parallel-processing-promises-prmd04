const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Utility function to create a Promise that resolves when an image loads
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image: " + url));
  });
}

function downloadImages() {
  // Clear previous results
  output.innerHTML = "";
  error.textContent = "";

  // Show loading spinner
  loading.style.display = "block";

  // Start downloading all images in parallel
  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then(imgElements => {
      // Hide loading
      loading.style.display = "none";

      // Append images to the output div
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      // Hide loading
      loading.style.display = "none";

      // Show error message
      error.textContent = err.message;
    });
}

// Attach event listener to the button
btn.addEventListener("click", downloadImages);
