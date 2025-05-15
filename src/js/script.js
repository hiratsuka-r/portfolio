(() => {
  const btnToTop = document.querySelector(".js_move-top");
  const isClass = "js_is-animated"; // 通過後に付与されるクラス

  /**
   * 各項目タイトルにビューポート侵入時クラスを付与する
   * 一度だけ発火し、該当要素の監視を解除する
   * @function titleObserve
   * @returns {void}
   */
  const titleObserve = () => {
    const mvClass = "js_move-heading";

    /**
     * IntersectionObserver のコールバック関数
     * @param {IntersectionObserverEntry[]} entries - 監視対象の交差情報
     * @param {IntersectionObserver} observer - 対象のIntersectionObserver
     */
    const setCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(isClass);
          observer.unobserve(entry.target); // 1度だけ実行、その後監視対象から除外
        }
      });
    };

    const observer = new IntersectionObserver(setCallback);

    const mvElements = document.querySelectorAll(`.${mvClass}`);
    mvElements.forEach((mvEl) => observer.observe(mvEl));
  };

  /**
   * プロフィールのsectionを通過したらTOPに戻るボタンを表示制御する
   * @function toTopObserve
   * @returns {void}
   */
  const toTopObserve = () => {
    const targetObj = document.querySelector(".section--profile-name");

    /**
     * IntersectionObserver のコールバック関数
     * @param {IntersectionObserverEntry[]} entries - 監視対象の交差情報
     */
    const setCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          btnToTop.classList.remove(isClass);
        } else {
          btnToTop.classList.add(isClass);
        }
      });
    };

    const observer = new IntersectionObserver(setCallback);
    observer.observe(targetObj);
  };

  /**
   * ページトップへスムーススクロールで移動する
   * @function toPageTop
   * @returns {void}
   */
  const toPageTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    titleObserve();
    toTopObserve();
  });
  btnToTop.addEventListener("click", toPageTop);
})();
