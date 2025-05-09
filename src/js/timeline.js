(() => {
  const xScrolling = 210; //タイムラインのスクロール量
  const breakPoint = 599; //表示切り替えの画面幅（px）

  const disabledClass = "disabled";
  const prevClass = "js-arrow__prev";
  const nextClass = "js-arrow__next";

  const timeline = document.querySelector(".js-timelines");

  const arrows = document.querySelectorAll(".js-arrow");
  const arrowPrev = document.querySelector(`.${prevClass}`);
  const arrowNext = document.querySelector(`.${nextClass}`);

  let landscapeType = window.innerWidth > breakPoint;
  let screenWidth = 0;

  /**
   * 初期化処理
   */
  const init = () => {
    initSetArrowHandlers();
    if (landscapeType) transformTimeline();
  };

  /**
   * 初期設定: 矢印クリックイベントの登録
   */
  const initSetArrowHandlers = () => {
    //タイムラインの最初と最後のカードを取得
    const firstItem = document.querySelector(".js-timeline:first-child");
    const lastItem = document.querySelector(".js-timeline:last-child");

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", () => {
        const isPrev = arrow.classList.contains(prevClass);
        const scrollAmount = isPrev ? -xScrolling : xScrolling;

        arrowPrev.disabled = true;
        arrowNext.disabled = true;

        _updateTimelineTransform(scrollAmount);

        setTimeout(() => {
          setBtnDisable(arrowPrev, _isElementInViewArea(firstItem, "first"));
          setBtnDisable(arrowNext, _isElementInViewArea(lastItem, "last"));
        }, 1100);
      });
    });
  };

  /**
   * [private]タイムラインのX方向の transform を更新
   * @param {number} scrollAmount - スクロール量
   */
  const _updateTimelineTransform = (scrollAmount) => {
    const style = getComputedStyle(timeline);
    const matrix = new window.DOMMatrix(style.transform || "none");
    const currentX = matrix.m41;
    const newX = currentX - scrollAmount;

    timeline.style.transform = `translateX(${newX}px)`;
  };

  /**
   * [private]要素が表示領域内にあるかを判定
   * @param {Element} el - 判定対象要素
   * @param {string} position - "first" または "last"
   * @returns {boolean}
   */
  const _isElementInViewArea = (el, position) => {
    const elRect = el.getBoundingClientRect();
    const wrapRect = document.querySelector(".js-timeline-wrap").getBoundingClientRect();
    if (position === "first") {
      return elRect.top >= 0 && wrapRect.left <= elRect.left;
    } else {
      return elRect.top >= 0 && wrapRect.right >= elRect.right;
    }
  };

  /**
   * タイムライン全体を画面横幅に応じて変形
   * 同時に[<][>]ボタンの制御を行う
   */
  const transformTimeline = () => {
    const nowScreenWidth = window.innerWidth;
    //変形を適用した時の横幅を保持
    screenWidth = nowScreenWidth;
    //これから適用するタイプを保持
    landscapeType = nowScreenWidth > breakPoint;

    if (landscapeType) {
      // 横スクロールで表示
      const cardEqualHeight = _setEqualHeight();
      timeline.style.transform = `translateX(0px)`;
      timeline.style.padding = `${cardEqualHeight + 16}px 0`;
      setBtnDisable(arrowPrev, true);
      setBtnDisable(arrowNext, false);
    } else {
      // 縦スクロールで表示
      timeline.style.padding = `0`;
    }
  };

  /**
   * タイムライン上の各カードの縦幅を最大値に揃え、最大値を返す
   * @returns {number} - 最大の高さ
   */
  const _setEqualHeight = () => {
    const cards = document.querySelectorAll(".js-timeline__card");
    let maxHeight = 0;
    cards.forEach((card) => {
      const height = card.offsetHeight;
      if (maxHeight < height) {
        maxHeight = height;
      }
    });
    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
    return maxHeight;
  };

  /**
   * ボタンの有効/無効を切り替える
   * @param {Element} el - 対象のボタン
   * @param {boolean} disable - trueのときボタンは無効
   */
  const setBtnDisable = (el, disable = true) => {
    el.classList.toggle(disabledClass, disable);
    el.disabled = disable;
  };

  /**
   * resize時にタイムライン全体を画面横幅に応じて変形
   * 処理が重くならないよう実行回数を絞る
   */
  const handleResize = () => {
    const nowScreenWidth = window.innerWidth;
    //iPhone端末スクロール バグ対策
    if (screenWidth === nowScreenWidth) return;
    //breakPointを跨いだ時、各1回だけ適用する
    if (landscapeType) {
      //横 > 縦
      if (nowScreenWidth <= breakPoint) transformTimeline();
    } else {
      //縦 > 横
      if (nowScreenWidth >= breakPoint) transformTimeline();
    }
  };

  window.addEventListener("load", init);
  window.addEventListener("resize", handleResize);
})();
