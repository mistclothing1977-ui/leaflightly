(async () => {
  try {
    const response = await fetch("https://leaflightly-5lnib1d7t-leaf-lightly.vercel.app/api/health");
    const data = await response.json();
    console.log("✓ Production Health Check:");
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
