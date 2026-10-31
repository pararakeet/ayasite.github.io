
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

const pages = [
  "home",
  "gallery",
  "coming",
  "story"
];

// メニュー開閉
function toggleMenu(force) {
  const isOpen = typeof force === "boolean"
    ? force
    : !navigation.classList.contains("open");

  navigation.classList.toggle("open", isOpen);

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuButton.setAttribute(
    "aria-label",
    isOpen ? "メニューを閉じる" : "メニューを開く"
  );
}

// ページ切り替え
function showPage(page) {
  if (!pages.includes(page)) {
    page = "home";
  }

  // ページ表示
  pages.forEach(id => {
    const section = document.getElementById(id);
    section.hidden = id !== page;
  });

  // メニューの選択状態
  document.querySelectorAll("[data-page]").forEach(link => {
    if (link.dataset.page === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // メニューを閉じる
  toggleMenu(false);

  // ページ上部へ移動
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

// メニューボタン
menuButton.addEventListener("click", () => {
  toggleMenu();
});

// メニューリンク
navigation.addEventListener("click", event => {
  const link = event.target.closest("[data-page]");

  if (!link) return;

  showPage(link.dataset.page);
});

// URL変更時
window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#", "");

  showPage(page);
});

// Escapeキーでメニューを閉じる
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    toggleMenu(false);
  }
});

// 初期表示
const initialPage = location.hash.replace("#", "");

showPage(
  pages.includes(initialPage)
    ? initialPage
    : "home"
);


/* =========================
   GALLERY IMAGE MODAL
========================= */

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");
const modalCaption = document.getElementById("modalCaption");

// 画像をクリックしたとき
document.querySelector(".gallery-grid").addEventListener("click", event => {

  const clickedImage = event.target.closest(".gallery-item img");

  if (!clickedImage) return;

  modalImage.src = clickedImage.src;
  modalImage.alt = clickedImage.alt;

  const caption = clickedImage.parentElement.querySelector("p");

  modalCaption.textContent = caption
    ? caption.textContent
    : clickedImage.alt;

  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  modalClose.focus();
});

// モーダルを閉じる
function closeImageModal() {

  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");

  modalImage.src = "";

  document.body.style.overflow = "";

}

// ×ボタン
modalClose.addEventListener("click", closeImageModal);

// 背景クリック
imageModal.addEventListener("click", event => {

  if (event.target === imageModal) {
    closeImageModal();
  }

});

// Escapeキー
document.addEventListener("keydown", event => {

  if (event.key === "Escape" &&
      imageModal.classList.contains("open")) {

    closeImageModal();

  }

});
