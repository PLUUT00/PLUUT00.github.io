(() => {
  const $ = (sel) => document.querySelector(sel);

  // Footer year
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Theme toggle with persistence
  const themeBtn = $("#themeBtn");
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.dataset.theme = saved;
  }

  function toggleTheme() {
    const cur = document.documentElement.dataset.theme;
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Rotating focus line
  const rotating = $("#rotatingLine");
  const lines = [
    "Systems • APIs • Automation",
    "Performance • Reliability • DX",
    "Tooling • CLIs • Deployments",
  ];
  let i = 0;
  if (rotating) {
    setInterval(() => {
      i = (i + 1) % lines.length;
      rotating.style.opacity = "0";
      setTimeout(() => {
        rotating.textContent = lines[i];
        rotating.style.opacity = "1";
      }, 180);
    }, 2400);
  }

  // Status badge (cosmetic)
  const status = $("#statusBadge");
  if (status) {
    const states = ["building", "shipping", "iterating"];
    let s = 0;
    setInterval(() => {
      s = (s + 1) % states.length;
      status.textContent = `Status: ${states[s]}`;
    }, 3200);
  }

  // Copy one-liner
  const copyBtn = $("#copyBtn");
  const oneLiner = $("#oneLiner");
  if (copyBtn && oneLiner) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(oneLiner.textContent.trim());
        copyBtn.textContent = "Copied";
        setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
      } catch {
        copyBtn.textContent = "Copy failed";
        setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
      }
    });
  }
})();
