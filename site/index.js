(function () {
  const rows = Array.isArray(window.MONEY_INDEX_DATA) ? window.MONEY_INDEX_DATA : [];
  const input = document.getElementById("search-input");
  const list = document.getElementById("file-list");

  render("");

  input?.addEventListener("input", (event) => {
    render(String(event.target.value || "").trim().toLowerCase());
  });

  function render(keyword) {
    const filtered = rows.filter((item) => item.fileName.toLowerCase().includes(keyword));
    list.innerHTML = "";

    if (!filtered.length) {
      const tr = document.createElement("tr");
      tr.className = "empty-row";
      tr.innerHTML = '<td colspan="2">没有匹配的文件</td>';
      list.appendChild(tr);
      return;
    }

    for (const item of filtered) {
      const tr = document.createElement("tr");

      const nameCell = document.createElement("td");
      const link = document.createElement("a");
      link.href = toFileHref(item.fileName);
      link.textContent = item.fileName;
      nameCell.appendChild(link);

      const dateCell = document.createElement("td");
      dateCell.className = "file-date";
      dateCell.textContent = item.createdAt;

      tr.appendChild(nameCell);
      tr.appendChild(dateCell);
      list.appendChild(tr);
    }
  }

  function toFileHref(fileName) {
    if (fileName.toLowerCase().endsWith(".md")) {
      return `view.html?file=${encodeURIComponent(fileName)}`;
    }

    return encodeURI(fileName);
  }
})();
