console.log("[Frontend] story.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Frontend] DOM ready");

  const btn = document.getElementById("generateBtn");
  const input = document.getElementById("userInput");

  if (!btn || !input) {
    console.error("[Frontend] Missing DOM elements", { btn, input });
    return;
  }

  btn.addEventListener("click", () => {
    console.log("[Frontend] Generate button clicked");

    const topic = input.value.trim();

    if (!topic) {
      alert("请输入内容");
      return;
    }

    // 清空旧内容
    ["headline", "lede", "scene", "key_event", "background", "impact", "ending"]
      .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = "";
      });

    const voicesBox = document.getElementById("voices");
    if (voicesBox) voicesBox.innerHTML = "";

    fetch(`/api/story?topic=${encodeURIComponent(topic)}`)
      .then(res => {
        console.log("[Frontend] fetch response", res);
        return res.json();
      })
      .then(data => {
        console.log("[Frontend] received data", data);

        Object.keys(data).forEach(key => {
          if (key === "voices") {
            const box = document.getElementById("voices");
            if (!box) return;

            data.voices.forEach(v => {
              const q = document.createElement("blockquote");
              q.innerText = `${v.quote} —— ${v.who}`;
              box.appendChild(q);
            });
          } else {
            const el = document.getElementById(key);
            if (el) el.innerText = data[key];
          }
        });
      })
      .catch(err => {
        console.error("[Frontend] fetch error", err);
        alert("生成失败");
      });
  });
});

// ===== Scroll Story 激活逻辑 =====
const panels = document.querySelectorAll(".panel");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    root: document.querySelector("#story"), // 滚动容器
    threshold: 0.3
  }
);

panels.forEach(panel => observer.observe(panel));

