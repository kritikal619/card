<script type="module">
  // Import Supabase client. Ensure supabase.js is in the same directory or update path.
  // Also ensure Supabase SDK is loaded, e.g., via CDN in the main HTML: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  import { supabase } from './supabase.js';

  const cardCreationBoardList = document.getElementById('card-creation-board-list');

  function hasUserLikedCardToday(cardId) {
    const today = new Date().toDateString();
    return localStorage.getItem(`liked_${cardId}_${today}`) === 'true';
  }

  function setUserLikedCardToday(cardId) {
    const today = new Date().toDateString();
    localStorage.setItem(`liked_${cardId}_${today}`, 'true');
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return str.toString().replace(/[&<>'"\/]/g, s => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' }[s]
    ));
  }

  async function displayCards(cards) {
    if (!cardCreationBoardList) return;
    cardCreationBoardList.innerHTML = ''; // Clear existing cards

    if (!cards || cards.length === 0) {
        cardCreationBoardList.innerHTML = '<p>아직 공유된 카드가 없습니다. 첫 번째 카드를 만들어 공유해보세요!</p>';
        return;
    }

    cards.forEach(cardData => {
      const cardId = cardData.id; // Assuming 'id' is the primary key in your Supabase table
      const cardItemDiv = document.createElement('div');
      cardItemDiv.className = 'card-item';
      cardItemDiv.innerHTML = `
        <img src="${escapeHTML(cardData.imageUrl)}" alt="Shared card" class="card-image">
        <div class="card-info">
          <div>작성자: ${escapeHTML(cardData.nickname)} <span class="ip-address">(${escapeHTML(cardData.ipAddress || 'IP 정보 없음')})</span></div>
          <div>${cardData.createdAt ? new Date(cardData.createdAt).toLocaleString() : '날짜 없음'}</div>
        </div>
        <button class="like-btn">
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <span class="like-count">${cardData.likes || 0}</span>
      `;
      cardCreationBoardList.appendChild(cardItemDiv);

      const cardImage = cardItemDiv.querySelector('.card-image');
      cardImage.addEventListener('click', (e) => {
        e.stopPropagation();
        const fullView = document.createElement('div');
        fullView.className = 'image-full-view';
        fullView.innerHTML = `
          <div class="image-full-view-content">
            <img src="${cardImage.src}" alt="Full size card">
            <button class="close-full-view">×</button>
          </div>
        `;
        document.body.appendChild(fullView);
        
        fullView.querySelector('.close-full-view').addEventListener('click', () => {
          fullView.remove();
        });
        
        fullView.addEventListener('click', (e) => {
          if (e.target === fullView) {
            fullView.remove();
          }
        });
      });

      const likeButton = cardItemDiv.querySelector('.like-btn');
      if (hasUserLikedCardToday(cardId)) {
        likeButton.disabled = true;
        likeButton.style.opacity = '0.7';
      }

      likeButton.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!supabase) {
            alert('Supabase 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
            return;
        }
        if (hasUserLikedCardToday(cardId)) {
          alert('오늘은 이 카드에 이미 좋아요를 눌렀습니다!');
          return;
        }
        try {
          // Fetch current likes first to increment, or use an RPC function for atomicity
          const { data: currentCardData, error: fetchError } = await supabase
            .from('cards')
            .select('likes')
            .eq('id', cardId)
            .single(); // .single() expects exactly one row

          if (fetchError) {
            console.error('Error fetching card for like:', fetchError);
            // If card not found, it might have been deleted
            if (fetchError.code === 'PGRST116') { // code for ' réfrigéré' (not found)
                 alert('카드를 찾을 수 없습니다. 이미 삭제되었을 수 있습니다.');
            } else {
                alert('좋아요를 위한 카드 정보를 가져오는 데 실패했습니다.');
            }
            return;
          }

          const newLikes = (currentCardData.likes || 0) + 1;

          const { error: updateError } = await supabase
            .from('cards')
            .update({ likes: newLikes })
            .eq('id', cardId);

          if (updateError) throw updateError;

          setUserLikedCardToday(cardId);
          likeButton.disabled = true;
          likeButton.style.opacity = '0.7';
          // Update UI directly
          const likeCountSpan = cardItemDiv.querySelector('.like-count');
          if (likeCountSpan) likeCountSpan.textContent = newLikes;

        } catch (error) {
          console.error('Error liking card:', error);
          alert('좋아요 처리에 실패했습니다.');
        }
      });
    });
  }

  async function fetchAndSubscribeToCards() {
    if (!supabase) {
      console.error("Supabase client not initialized. Ensure supabase.js is correct and credentials are set.");
      if (cardCreationBoardList) cardCreationBoardList.innerHTML = '<p>Supabase 연결 설정을 확인해주세요. (URL/KEY)</p>';
      return;
    }

    // Initial fetch
    try {
      const { data: initialCards, error } = await supabase
        .from('cards') // Assuming your table is named 'cards'
        .select('*')    // Select all columns, or specify needed ones like 'id, imageUrl, nickname, ipAddress, createdAt, likes'
        .order('createdAt', { ascending: false }); // Order by creation date

      if (error) throw error;
      displayCards(initialCards);
    } catch (error) {
      console.error('Error fetching initial shared cards:', error);
      if (cardCreationBoardList) cardCreationBoardList.innerHTML = '<p>카드 목록을 불러오는 데 실패했습니다. Supabase 테이블 이름(\'cards\') 및 컬럼을 확인해주세요.</p>';
    }

    // Real-time subscription
    const cardsChannel = supabase
      .channel('public-cards-channel') // Unique channel name
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cards' },
        (payload) => {
          console.log('Supabase real-time change received:', payload);
          // Re-fetch all cards to update the UI. For more granular updates, inspect payload.
          // This simple re-fetch is similar to how onSnapshot might be used for simplicity.
          fetchAndSubscribeToCards(); // This will re-fetch and re-subscribe, might be better to just call fetch and display
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to Supabase cards changes!');
        }
        if (status === 'CHANNEL_ERROR') {
          console.error('Supabase channel error:', err);
        }
        if (status === 'TIMED_OUT') {
            console.warn('Supabase subscription timed out.');
        }
      });
      
    // It's good practice to unsubscribe when the component/page is destroyed
    // window.addEventListener('beforeunload', () => {
    // supabase.removeChannel(cardsChannel);
    // });
  }

  // Initialize
  if (supabase) {
      fetchAndSubscribeToCards();
  } else {
      // Attempt to initialize again or wait for supabase.js to load if it's async
      // For now, we assume supabase.js initializes the client synchronously or it's already available.
      console.warn("Supabase client was not available immediately. If using CDN, ensure it loads before this script.");
      // A more robust solution might use a callback or promise from supabase.js
      // or retry initialization here.
      if (cardCreationBoardList) cardCreationBoardList.innerHTML = '<p>Supabase 초기화 중입니다. 문제가 지속되면 관리자에게 문의하세요.</p>';
  }

</script>
