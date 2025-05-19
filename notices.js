/**
 * FC 모바일 공지사항 관리 모듈

 * 
 * 이 모듈은 FC 모바일 공지사항을 가져오고 표시하는 기능을 제공합니다.
 * 1시간마다 자동 새로고침 대신 페이지 로드 시 최신 데이터를 가져오고,
 * 수동 새로고침 버튼을 통해 사용자가 원할 때 업데이트할 수 있습니다.
 */

const FCMobileNotices = {
  // 공지사항 컨테이너 요소
  noticesContainer: null,
  
  // 마지막 업데이트 시간
  lastUpdated: null,
  
  // 초기화 함수
  init: function() {
    this.noticesContainer = document.getElementById('fc-mobile-notices-list');
    if (!this.noticesContainer) return;
    
    // 수동 새로고침 버튼 추가
    this.addRefreshButton();
    
    // 공지사항 로드
    this.loadNotices();
    
    console.log('FC 모바일 공지사항 모듈이 초기화되었습니다.');
  },
  
  // 수동 새로고침 버튼 추가
  addRefreshButton: function() {
    const noticesSection = document.querySelector('.notices-section');
    if (!noticesSection) return;
    
    // 기존 제목 요소 가져오기
    const titleElement = noticesSection.querySelector('h2');
    if (!titleElement) return;
    
    // 마지막 업데이트 시간 표시 요소 생성
    const lastUpdatedElement = document.createElement('div');
    lastUpdatedElement.id = 'notices-last-updated';
    lastUpdatedElement.className = 'notices-last-updated';
    lastUpdatedElement.textContent = '마지막 업데이트: 로딩 중...';
    
    // 새로고침 버튼 생성
    const refreshButton = document.createElement('button');
    refreshButton.id = 'notices-refresh-btn';
    refreshButton.className = 'notices-refresh-btn';
    refreshButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>';
    refreshButton.title = '공지사항 새로고침';
    
    // 새로고침 버튼 클릭 이벤트 추가
    refreshButton.addEventListener('click', () => {
      this.loadNotices(true);
    });
    
    // 제목 요소에 직접 새로고침 버튼 추가
    titleElement.style.display = 'flex';
    titleElement.style.alignItems = 'center';
    titleElement.style.gap = '8px';
    
    // 제목 텍스트를 span으로 감싸기
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    
    const titleSpan = document.createElement('span');
    titleSpan.textContent = titleText;
    titleElement.appendChild(titleSpan);
    
    // 새로고침 버튼을 제목 요소에 직접 추가
    titleElement.appendChild(refreshButton);
    
    // 마지막 업데이트 시간을 섹션에 추가
    noticesSection.insertBefore(lastUpdatedElement, this.noticesContainer);
  },
  
  // 공지사항 로드 함수
  loadNotices: function(isManualRefresh = false) {
    if (isManualRefresh) {
      // 수동 새로고침 시 로딩 메시지 표시
      this.noticesContainer.innerHTML = '<p>공지사항을 새로고침 중입니다...</p>';
    }
    
    // 현재 시간 기준으로 캐시 방지용 쿼리 파라미터 생성
    const cacheBuster = `?_=${new Date().getTime()}`;
    
    // 로컬 파일 시스템에서는 fetch가 제대로 동작하지 않으므로 XMLHttpRequest 사용
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `./api/notices.json${cacheBuster}`, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          this.displayNotices(data);
        } catch (e) {
          console.error('JSON 파싱 오류:', e);
          this.handleLoadError();
        }
      } else {
        this.handleLoadError();
      }
    };
    xhr.onerror = () => {
      this.handleLoadError();
    };
    xhr.send();
  // 오류 처리 함수
  handleLoadError: function() {
    console.error('공지사항 로드 오류 발생');
    this.noticesContainer.innerHTML = `
      <div class="notice-error">
        <p>공지사항을 불러오는데 문제가 발생했습니다.</p>
        <button id="notices-retry-btn" class="notices-retry-btn">다시 시도</button>
      </div>
    `;
    
    // 다시 시도 버튼 이벤트 추가
    const retryButton = document.getElementById('notices-retry-btn');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        this.loadNotices(true);
      });
    }
  },

      });
  },
  
  // 공지사항 표시 함수
  displayNotices: function(data) {
    if (!data || !data.notices || !Array.isArray(data.notices) || data.notices.length === 0) {
      this.noticesContainer.innerHTML = '<p>표시할 공지사항이 없습니다.</p>';
      return;
    }
    
    // 마지막 업데이트 시간 저장 및 표시
    this.lastUpdated = data.last_updated;
    const lastUpdatedElement = document.getElementById('notices-last-updated');
    if (lastUpdatedElement) {
      lastUpdatedElement.textContent = `마지막 업데이트: ${this.lastUpdated}`;
    }
    
    // 공지사항 컨테이너 비우기
    this.noticesContainer.innerHTML = '';
    
    // 각 공지사항 표시
    data.notices.forEach(notice => {
      const noticeElement = document.createElement('div');
      noticeElement.className = 'notice-card';
      
      noticeElement.innerHTML = `
        <h3 class="notice-title">${this.escapeHTML(notice.title)}</h3>
        <p class="notice-summary">${this.escapeHTML(notice.summary)}</p>
        <a href="${this.escapeHTML(notice.href)}" class="notice-more" target="_blank">더보기</a>
      `;
      
      this.noticesContainer.appendChild(noticeElement);
    });
  },
  
  // HTML 이스케이프 함수
  escapeHTML: function(str) {
    if (str === null || str === undefined) return '';
    return str.toString().replace(/[&<>'"\/]/g, function (s) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      }[s];
    });
  }
};

// 페이지 로드 시 모듈 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 기존 DOMContentLoaded 이벤트 핸들러가 실행된 후 실행되도록 setTimeout 사용
  setTimeout(() => {
    FCMobileNotices.init();
  }, 0);
});
