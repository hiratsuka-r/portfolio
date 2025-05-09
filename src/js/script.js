(() => {
  /**
   * 各項目の要素がビューポートに入ったらクラスを付与
   * 同時に1回限りで監視を終了する
   */
  const scrollObserve = () => {
    /* 各項目タイトル */
    const tgClass = "js-mv"; //監視対象となる要素のクラス
    const isMvClass = "is-mv"; //ビューポートに入ったときに追加されるクラス

    /**
     * IntersectionObserverコールバック
     * @param {IntersectionObserverEntry[]} entries - 交差した監視対象
     * @param {IntersectionObserver} observer - 現在の IntersectionObserver
     */
    const setCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(isMvClass);
          // 1回表示されたら監視対象から除外
          observer.unobserve(entry.target);
        }
      });
    };

    //IntersectionObserverを生成し
    //対象クラスを持つすべての要素を監視対象に追加
    const observer = new IntersectionObserver(setCallback);
    document.querySelectorAll("." + tgClass).forEach((mvEl) => {
      observer.observe(mvEl);
    });
  };

  document.addEventListener("DOMContentLoaded", scrollObserve);
})();
