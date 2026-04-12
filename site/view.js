(async function () {
  const fileNameNode = document.getElementById("file-name");
  const contentNode = document.getElementById("content");
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  if (!file) {
    renderError("缺少文件参数。");
    return;
  }

  fileNameNode.textContent = file;
  document.title = file;

  try {
    const response = await fetch(encodeURI(file), { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`文件加载失败：${response.status} ${response.statusText}`);
    }

    const markdown = await response.text();
    const html = marked.parse(markdown, {
      breaks: true,
      gfm: true,
    });
    contentNode.innerHTML = DOMPurify.sanitize(html);
  } catch (error) {
    renderError(error instanceof Error ? error.message : String(error));
  }

  function renderError(message) {
    contentNode.innerHTML = `<div class="error-message">${escapeHtml(message)}</div>`;
  }

  function escapeHtml(text) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();
