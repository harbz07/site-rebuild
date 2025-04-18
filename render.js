
document.addEventListener("DOMContentLoaded", () => {
  const containerId = document.querySelector("div[id$='container']")?.id;
  if (!containerId) return;

  const fileName = window.location.pathname.split("/").pop().replace(".html", "");
  const jsonFile = fileName
    .replace("creator-hub", "creator_hub")
    .replace("the-cave", "the_cave")
    + ".json";

  fetch(jsonFile)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch JSON");
      return res.json();
    })
    .then(data => renderEntries(data, containerId))
    .catch(err => {
      document.getElementById(containerId).innerHTML = "<p style='color:red;'>⚠️ Failed to load entries. Check JSON path or formatting.</p>";
      console.error("Failed to load JSON:", err);
    });
});

function renderEntries(entries, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  entries.forEach(entry => {
    const card = document.createElement("div");
    card.className = "entry-card";

    card.innerHTML = `
      <h2>${entry.name}</h2>
      <p><strong>Category:</strong> ${entry.category}</p>
      <p><strong>Label:</strong> ${entry.label}</p>
      <p class="flavor">${entry.flavor}</p>
    `;

    const metaButton = document.createElement("button");
    metaButton.textContent = "What does this do?";
    metaButton.onclick = () => {
      if (!card.querySelector(".metadata")) {
        const meta = document.createElement("div");
        meta.className = "metadata";
        meta.innerHTML = `
          <p><strong>Tone:</strong> ${entry.metadata.tone}</p>
          <p><strong>Usage:</strong> ${entry.metadata.usage}</p>
          <p><strong>Output Format:</strong> ${entry.metadata.output_format}</p>
          <p><strong>Constraint:</strong> ${entry.metadata.constraint}</p>
        `;
        card.appendChild(meta);
      }
    };

    card.appendChild(metaButton);
    container.appendChild(card);
  });
}
