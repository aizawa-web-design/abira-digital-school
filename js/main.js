// ===============================
// 共通:画面内表示アニメーション
// ===============================
const fadeInTargets = document.querySelectorAll('.js-fade-in-up');

const fadeInObserver = new IntersectionObserver((entries, observer) => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);

  });

}, {
  root: null,
  rootMargin: '0px 0px -20% 0px',
  threshold: 0
});

fadeInTargets.forEach(target => {
  fadeInObserver.observe(target);
});


// ===============================
// NEWSページ：「さらに見る」ボタン
// ===============================
window.addEventListener('DOMContentLoaded', () => {

  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!loadMoreBtn) return;

  const newsItems = newsList.querySelectorAll(':scope > li');
  const visibleCount = 5;

  // 5件以下ならボタン非表示
  if (newsItems.length <= visibleCount) {
    loadMoreBtn.parentElement.style.display = 'none';
    return;
  }

  // 一覧を閉じる
  const collapseNews = () => {

    newsItems.forEach((item, index) => {
      item.classList.toggle('d-none', index >= visibleCount);
    });

    loadMoreBtn.textContent = 'さらに見る';
    loadMoreBtn.classList.add('collapsed');

  };

  // 一覧を開く
  const expandNews = () => {

    newsItems.forEach(item => {
      item.classList.remove('d-none');
    });

    loadMoreBtn.textContent = 'もとに戻す';
    loadMoreBtn.classList.remove('collapsed');

  };

  // 初期表示
  collapseNews();

  // ボタン
  loadMoreBtn.addEventListener('click', e => {

    e.preventDefault();

    if (loadMoreBtn.classList.contains('collapsed')) {
      expandNews();
    } else {
      collapseNews();
    }

  });

});

// ===============================
// 共通:Swiper管理
// ===============================
const swipers = {
    mobile: [],
    report: []
  };
  
  // ===============================
  // swiper-mobile初期化（スマホのみ）
  // ===============================
  const initMobileSwiper = () => {
  
    document.querySelectorAll('.swiper-mobile').forEach(el => {
  
      if (el.swiper) return;
  
      const area = el.closest('.swiper-area');
      if (!area) return;
  
      const swiper = new Swiper(el, {
  
        loop: true,
        spaceBetween: 30,
  
        navigation: {
          nextEl: area.querySelector('.swiper-button-next'),
          prevEl: area.querySelector('.swiper-button-prev'),
        },
  
        pagination: {
          el: area.querySelector('.swiper-pagination'),
          clickable: true,
        }
  
      });
  
      swipers.mobile.push(swiper);
  
    });
  
  };
  
  
  // ===============================
  // swiper-report初期化（常時有効）
  // ===============================
  const initReportSwiper = () => {
  
    document.querySelectorAll('.swiper-report').forEach(el => {
  
      if (el.swiper) return;
  
      const area = el.closest('.swiper-area');
      if (!area) return;
  
      const swiper = new Swiper(el, {
  
        slidesPerView: 1,
        spaceBetween: 24,
        watchOverflow: true,
  
        navigation: {
          nextEl: area.querySelector('.swiper-button-next'),
          prevEl: area.querySelector('.swiper-button-prev'),
        },
  
        pagination: {
          el: area.querySelector('.swiper-pagination'),
          clickable: true,
        }
  
      });
  
      swipers.report.push(swiper);
  
    });
  
  };
  
  
  // ===============================
  // swiper-mobile破棄（PC表示時）
  // ===============================
  const destroyMobileSwiper = () => {
  
    swipers.mobile.forEach(swiper => {
  
      const slides = swiper.el.querySelectorAll('.swiper-slide');
      const wrapper = swiper.el.querySelector('.swiper-wrapper');
  
      swiper.destroy(true, true);
  
      slides.forEach(slide => {
        slide.removeAttribute('style');
  
        slide.classList.remove(
          'swiper-slide-active',
          'swiper-slide-next',
          'swiper-slide-prev',
          'swiper-slide-visible',
          'swiper-slide-fully-visible'
        );
      });
  
      wrapper?.removeAttribute('style');
  
      swiper.el.classList.remove(
        'swiper-initialized',
        'swiper-horizontal',
        'swiper-backface-hidden'
      );
  
    });
  
    swipers.mobile.length = 0;
  
  };
  
  
  // ===============================
  // ブレークポイント処理
  // ===============================
  const mediaQuery = window.matchMedia('(max-width: 991px)');
  
  const handleBreakpoint = (e) => {
  
    if (e.matches) {
  
      // スマホ
      initMobileSwiper();
      initReportSwiper();
  
    } else {
  
      // PC
      destroyMobileSwiper();
      initReportSwiper();
  
    }
  
  };
  
  
  // ===============================
  // 初期化
  // ===============================
  window.addEventListener('load', () => {
  
    handleBreakpoint(mediaQuery);
  
    mediaQuery.addEventListener('change', handleBreakpoint);
  
  });

//   メインビジュアル比較用
// ========================================
// B案：メインビジュアル タイピング
// ========================================

const typingLines = document.querySelectorAll('.typing-line');

if (typingLines.length) {

const typeLine = (element, speed = 110) => {

    return new Promise(resolve => {
    
        // 他の行のカーソルを消す
        typingLines.forEach(line => line.classList.remove('typing'));
    
        // 今入力している行だけカーソル表示
        element.classList.add('typing');
    
        const text = element.dataset.text;
        element.textContent = '';
    
        let index = 0;
    
        const timer = setInterval(() => {
    
        element.textContent += text[index];
        index++;
    
        if (index >= text.length) {
    
            clearInterval(timer);
            resolve();
    
        }
    
        }, speed);
    
    });
    
    };

    (async () => {

        await typeLine(typingLines[0]);
      
        await new Promise(r => setTimeout(r, 300));
      
        await typeLine(typingLines[1]);
      
        // 最後の行だけカーソルを1.5秒点滅
        setTimeout(() => {
          typingLines[1].classList.remove('typing');
        }, 1500);
      
      })();

}

//   メインビジュアル比較用
// ========================================
// C案：メインビジュアル パララックス
// ========================================
jarallax(document.querySelectorAll('.jarallax'), {
  speed: 0.3
});