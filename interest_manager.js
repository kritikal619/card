// 관심 시즌 및 알림 기능 관리 모듈
const InterestManager = {
  // 로컬 스토리지 키
  STORAGE_KEY: 'fcm_interest_seasons',
  NOTIFICATION_ENABLED_KEY: 'fcm_notification_enabled',
  
  // 관심 시즌 목록 가져오기
  getInterestSeasons() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  
  // 관심 시즌 추가
  addInterestSeason(seasonId) {
    const interests = this.getInterestSeasons();
    if (!interests.includes(seasonId)) {
      interests.push(seasonId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(interests));
      return true;
    }
    return false;
  },
  
  // 관심 시즌 제거
  removeInterestSeason(seasonId) {
    const interests = this.getInterestSeasons();
    const index = interests.indexOf(seasonId);
    if (index !== -1) {
      interests.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(interests));
      return true;
    }
    return false;
  },
  
  // 알림 활성화 상태 확인
  isNotificationEnabled() {
    return localStorage.getItem(this.NOTIFICATION_ENABLED_KEY) === 'true';
  },
  
  // 알림 활성화/비활성화 설정
  setNotificationEnabled(enabled) {
    localStorage.setItem(this.NOTIFICATION_ENABLED_KEY, enabled ? 'true' : 'false');
  },
  
  // 알림 권한 요청
  requestNotificationPermission() {
    if (!("Notification" in window)) {
      alert("이 브라우저는 알림을 지원하지 않습니다.");
      return Promise.resolve(false);
    }
    
    if (Notification.permission === "granted") {
      return Promise.resolve(true);
    }
    
    if (Notification.permission !== "denied") {
      return Notification.requestPermission().then(permission => {
        return permission === "granted";
      });
    }
    
    return Promise.resolve(false);
  },
  
  // 알림 보내기
  sendNotification(title, message) {
    if (!this.isNotificationEnabled() || Notification.permission !== "granted") {
      return;
    }
    
    const notification = new Notification(title, {
      body: message,
      icon: './favicons/favicon-96x96.png'
    });
    
    notification.onclick = function() {
      window.focus();
      notification.close();
    };
    
    // 5초 후 자동으로 닫기
    setTimeout(() => notification.close(), 5000);
  }
};

// 갱신 시간 계산 및 알림 관리 모듈
const RefreshTimeManager = {
  // 남은 시간 계산 함수
  calculateRemainingTime(card) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // 현재 시간이 짝수인지 홀수인지 확인
    const isCurrentHourEven = currentHour % 2 === 0;
    
    // 카드의 갱신 시간이 현재 시간 타입(짝수/홀수)과 일치하는지 확인
    if (card.isEven === isCurrentHourEven) {
      // 같은 시간대 내에서 남은 시간 계산
      let remainingMinutes = card.minute - currentMinute;
      let remainingSeconds = card.second - currentSecond;
      
      if (remainingSeconds < 0) {
        remainingMinutes--;
        remainingSeconds += 60;
      }
      
      if (remainingMinutes < 0) {
        // 이미 갱신 시간이 지났으면 다음 2시간 후로 계산
        return {
          minutes: -1,
          seconds: -1,
          text: "-"
        };
      } else {
        // 갱신 시간이 아직 남았으면 남은 시간 표시
        return {
          minutes: remainingMinutes,
          seconds: remainingSeconds,
          text: `${remainingMinutes}분 ${remainingSeconds}초 후 갱신`
        };
      }
    } else {
      // 다른 시간대(짝수/홀수)면 다음 해당 시간까지 기다려야 함
      return {
        minutes: -1,
        seconds: -1,
        text: "-"
      };
    }
  },
  
  // 알림 체크 함수 (1초마다 호출)
  checkNotifications(cards) {
    if (!InterestManager.isNotificationEnabled()) return;
    
    const interestIds = InterestManager.getInterestSeasons();
    if (interestIds.length === 0) return;
    
    const interestCards = cards.filter(card => interestIds.includes(card.id));
    
    interestCards.forEach(card => {
      const remaining = this.calculateRemainingTime(card);
      
      // 5분(300초) 전에 알림
      if (remaining.minutes === 5 && remaining.seconds === 0) {
        InterestManager.sendNotification(
          "갱신 시간 알림", 
          `${card.name} 카드가 5분 후에 갱신됩니다!`
        );
      }
    });
  },
  
  // 알림 타이머 시작
  startNotificationTimer(cards) {
    setInterval(() => this.checkNotifications(cards), 1000);
  }
};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async function() {
  // 카드 데이터 로드
  let cardData = [];
  try {
    const response = await fetch('./api/card_data.json');
    cardData = await response.json();
    cardData = cardData.cards || [];
  } catch (error) {
    console.error('카드 데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
  
  // 알림 타이머 시작
  RefreshTimeManager.startNotificationTimer(cardData);
  
  // 알림 설정 UI 초기화
  const notificationToggle = document.getElementById('notificationToggle');
  if (notificationToggle) {
    notificationToggle.checked = InterestManager.isNotificationEnabled();
    
    notificationToggle.addEventListener('change', function() {
      if (this.checked) {
        InterestManager.requestNotificationPermission().then(granted => {
          if (granted) {
            InterestManager.setNotificationEnabled(true);
          } else {
            this.checked = false;
            alert('알림을 보내려면 알림 권한이 필요합니다.');
          }
        });
      } else {
        InterestManager.setNotificationEnabled(false);
      }
    });
  }
});
