// 画面インアニメーション
const targets = document.querySelectorAll('.js-fade-in-up');

const options = {
  root: null,
  rootMargin: '0px 0px -20% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, options);

targets.forEach(target => observer.observe(target));

// スライダー用の変数を初期化
let swiperMenu = null;
const mediaQuery = window.matchMedia('(max-width: 991px)');

const initSwiper = () => {
    // Swiperがまだ生成されていない場合のみ生成
    if (!swiperMenu) {
        swiperMenu = new Swiper('.swiper-menu', {
            loop: true,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
};

const destroySwiper = () => {
    // Swiperが存在する場合のみ破棄
    if (swiperMenu) {
        swiperMenu.destroy(true, true); // true, trueでスタイルもリセット
        swiperMenu = null;
    }
};

// 画面幅による切り替え判定
const handleBreakpoint = (e) => {
    if (e.matches) {
        // 991px以下のとき：スライダー有効
        initSwiper();
    } else {
        // 992px以上のとき：スライダー解除
        destroySwiper();
    }
};

// 初回実行と、画面幅変更時のリスナー登録
handleBreakpoint(mediaQuery);
mediaQuery.addEventListener('change', handleBreakpoint);

// お知らせ一覧の「さらに見る」
document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;
  
    const listItems = newsList.querySelectorAll(':scope > li');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // 5件以下の場合はボタンを非表示にする
    if (listItems.length <= 5) {
        if (loadMoreBtn) loadMoreBtn.parentElement.style.display = 'none';
        return;
    }
  
    // 初期化実行（ボタンにも collapsed を付ける）
    const hideItems = () => {
        listItems.forEach((item, index) => {
            if (index >= 5) item.classList.add('d-none');
        });
        loadMoreBtn.innerHTML = 'さらに見る';
        loadMoreBtn.classList.add('collapsed'); // アイコンを下向きに
    };
    hideItems();

    // ボタンクリック時の挙動
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // collapsedクラスを持っているか（閉じているか）で判定
        const isCollapsed = loadMoreBtn.classList.contains('collapsed');
        
        if (isCollapsed) {
            // 開く処理
            listItems.forEach(item => item.classList.remove('d-none'));
            loadMoreBtn.innerHTML = 'もとに戻す';
            loadMoreBtn.classList.remove('collapsed'); // アイコンを上向きに
        } else {
            // 閉じる処理
            hideItems();
        }
    });
});

// 活動報告一覧の「さらに見る」
document.addEventListener("DOMContentLoaded", () => {
    const reportList = document.querySelector('.report-list-row');
    if (!reportList) return;
  
    const reportItems = reportList.querySelectorAll(':scope > .col');
    const loadMoreBtn = document.getElementById('load-more-btn-report');
    
    // 8件以下の場合はボタン自体を消す（9件目から「もっと見る」が出るため）
    if (reportItems.length <= 8) {
        if (loadMoreBtn) loadMoreBtn.parentElement.style.display = 'none';
        return;
    }
  
    // 初期化：8件目以降（つまり9件目から）を隠す
    const hideItems = () => {
        reportItems.forEach((item, index) => {
            // indexは0から始まるため、indexが8以上（9件目以降）を隠す
            if (index >= 8) item.classList.add('d-none');
        });
        loadMoreBtn.innerHTML = 'さらに見る';
        loadMoreBtn.classList.add('collapsed');
    };
    hideItems();

    // ボタンクリック時の挙動
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isCollapsed = loadMoreBtn.classList.contains('collapsed');
        
        if (isCollapsed) {
            // 開く処理
            reportItems.forEach(item => item.classList.remove('d-none'));
            loadMoreBtn.innerHTML = 'もとに戻す';
            loadMoreBtn.classList.remove('collapsed');
        } else {
            // 閉じる処理
            hideItems();
        }
    });
});