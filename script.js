// DOMContentLoaded 이벤트 내에서 모든 요소가 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", function() {
    // 탭 전환을 위한 요소들 선택
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
  
    // 각 탭 버튼에 클릭 이벤트 리스너 추가
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTabId = this.getAttribute('data-tab');
  
        // 모든 탭 버튼과 탭 내용을 비활성화
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
  
        // 클릭한 버튼과 해당 탭 내용 활성화
        this.classList.add('active');
        document.getElementById(targetTabId).classList.add('active');
        
        // 미리보기 영역을 탭에 따라 업데이트할 수 있음 (옵션)
        updatePreview(targetTabId);
      });
    });
  
    // 다운도르 버튼 클릭 이벤트 처리
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', function() {
      // 현재 활성화된 탭을 확인하여 해당 다운로드 함수 호출
      const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
      if (activeTab === "tab1") {
        downloadBlankCard();
      } else if (activeTab === "tab2") {
        downloadTextCard();
      } else if (activeTab === "tab3") {
        alert("만들기 툴은 미공개입니다.");
      }
    });
  
    // 빈카드 다운도르 기능 (임시 예제)
    function downloadBlankCard() {
      // 실제 다운로드 로직을 이곳에 구현하세요.
      alert("빈카드 다운도르 시작!");
      // 예: 미리보기 이미지를 캔버스로 변환 후 이미지 파일로 다운로드 처리
    }
  
    // 글자 다운도르 기능 (임시 예제)
    function downloadTextCard() {
      // 실제 다운로드 로직을 이곳에 구현하세요.
      alert("글자 다운도르 시작!");
    }
  
    // 미리보기 업데이트 함수 (옵션)
    function updatePreview(tabId) {
      const previewImage = document.getElementById('preview-image');
      // 탭에 따라 미리보기 이미지를 변경하거나 내용을 업데이트 할 수 있습니다.
      // 예시:
      if (tabId === "tab1") {
        previewImage.src = "placeholder_blank.png";
        previewImage.alt = "빈카드 미리보기";
      } else if (tabId === "tab2") {
        previewImage.src = "placeholder_text.png";
        previewImage.alt = "글자 미리보기";
      } else if (tabId === "tab3") {
        previewImage.src = "placeholder_tool.png";
        previewImage.alt = "만들기 툴 미리보기";
      }
    }
  });
  let deferredPrompt; // 이벤트 객체 저장

  // beforeinstallprompt 이벤트 캐치
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault(); // 기본 동작 방지
    deferredPrompt = event; // 이벤트 객체 저장
  
    // 팝업 표시
    const installPrompt = document.getElementById("installPrompt");
    installPrompt.style.display = "block";
  });
  
  // "추가하기" 버튼 클릭 시
  document.getElementById("installConfirm").addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // 설치 UI 표시
      const choiceResult = await deferredPrompt.userChoice;
  
      if (choiceResult.outcome === "accepted") {
        console.log("사용자가 설치를 수락했습니다.");
      } else {
        console.log("사용자가 설치를 거부했습니다.");
      }
      deferredPrompt = null; // 초기화
    }
  
    // 팝업 숨기기
    document.getElementById("installPrompt").style.display = "none";
  });
  
  // "취소" 버튼 클릭 시
  document.getElementById("installCancel").addEventListener("click", () => {
    // 팝업 숨기기
    document.getElementById("installPrompt").style.display = "none";
  });
  
document.getElementById('copy-button').addEventListener('click', function() {
    // 이메일 텍스트 가져오기
    const emailText = document.getElementById('email').textContent;

    // 임시 텍스트 입력 요소 생성
    const tempInput = document.createElement('input');
    tempInput.value = emailText;
    document.body.appendChild(tempInput);

    // 텍스트 선택 및 복사
    tempInput.select();
    document.execCommand('copy');

    // 임시 입력 요소 삭제
    document.body.removeChild(tempInput);

    // 알림 메시지 출력
    alert('이메일이 복사되었습니다: ' + emailText);
  });
