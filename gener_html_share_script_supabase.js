  <!-- Supabase Module Script (Ensure supabase.js path is correct and Supabase SDK is loaded) -->
  <script type="module">
    try {
        // Adjust path if supabase.js is not in the same directory
        // Ensure Supabase SDK is loaded via CDN in the head: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
        const { supabase } = await import("./supabase.js");

        const shareBtn = document.getElementById("share-btn");
        let isSharing = false; // Prevent double clicks

        shareBtn.addEventListener("click", async () => {
            if (isSharing) return;
            if (!supabase) {
                alert("Supabase가 초기화되지 않았습니다. supabase.js 파일과 CDN 연결을 확인해주세요.");
                console.error("Supabase client is not available.");
                return;
            }

            // Rate limiting (1 share per minute)
            const lastShareTime = localStorage.getItem("lastShareTime");
            const sixtySeconds = 60 * 1000;
            if (lastShareTime && (Date.now() - lastShareTime < sixtySeconds)) {
                alert("공유는 1분에 한 번만 가능합니다. 잠시 후에 다시 시도해 주세요.");
                return;
            }

            const title = document.getElementById("cardTitleInput").value.trim();
            if (!title) {
                alert("공유할 카드의 제목을 입력해주세요!");
                document.getElementById("cardTitleInput").focus();
                return;
            }

            if (!confirm(`'${title}' 카드를 게시판에 공유하시겠습니까?`)) {
                return;
            }

            isSharing = true;
            shareBtn.disabled = true;
            const originalText = shareBtn.textContent;
            shareBtn.textContent = "공유 중...";
            shareBtn.classList.add("disabled");

            const tmpActive = activeImage; const tmpMode = mode;
            if (hideHandlesTimeout) { clearTimeout(hideHandlesTimeout); hideHandlesTimeout = null; }
            activeImage = null; mode = "";
            drawCard(); // Redraw without handles

            setTimeout(async () => {
                let imageUrl = "";
                try {
                    const canvasElem = document.getElementById("cardCanvas");
                    imageUrl = canvasElem.toDataURL("image/png");
                } catch (captureError) {
                    console.error("Canvas capture error:", captureError);
                    alert("이미지 생성 중 오류가 발생했습니다. 다시 시도해 주세요.\n(타사 이미지 사용 시 CORS 오류일 수 있습니다)");
                    activeImage = tmpActive; mode = tmpMode; drawCard();
                    isSharing = false; shareBtn.disabled = false; shareBtn.textContent = originalText; shareBtn.classList.remove("disabled");
                    return;
                }

                try {
                    // Save to Supabase 'cards' table
                    const { data, error } = await supabase
                        .from("cards")
                        .insert([
                            { 
                                title: title, 
                                imageUrl: imageUrl, 
                                // Supabase uses ISO 8601 string for timestamps by default
                                // or you can use `new Date().toISOString()`
                                // 'createdAt' will be auto-generated if you set a default value like 'now()' in Supabase table definition.
                                // If you want to set it from client:
                                createdAt: new Date().toISOString(),
                                // Assuming 'likes' and 'nickname', 'ipAddress' might be added here or handled differently
                                // For simplicity, we'll match the Firestore structure as much as possible.
                                // 'likes' should default to 0 in the DB or be set here.
                                likes: 0,
                                // nickname and ipAddress would need to be sourced if required.
                                // For now, let's assume they are not part of this initial insert or are optional.
                                // nickname: "Anonymous", // Placeholder or get from user input/auth
                                // ipAddress: "0.0.0.0" // Placeholder or get from server-side if possible
                            }
                        ])
                        .select(); // .select() will return the inserted data

                    if (error) throw error;
                    
                    console.log("Card shared with Supabase: ", data);
                    alert("카드가 성공적으로 공유되었습니다!");
                    localStorage.setItem("lastShareTime", Date.now());
                } catch (error) {
                    console.error("Error sharing card to Supabase:", error);
                    alert("카드 공유 중 오류가 발생했습니다. Supabase 연결 및 테이블 설정을 확인하세요.");
                } finally {
                    activeImage = tmpActive; mode = tmpMode; drawCard();
                    setTimeout(() => {
                        isSharing = false;
                        shareBtn.disabled = false;
                        shareBtn.textContent = originalText;
                        shareBtn.classList.remove("disabled");
                    }, 1000);
                }
            }, 150);
        });

    } catch (err) {
         console.error("Failed to load Supabase module:", err);
         const shareBtn = document.getElementById("share-btn");
         if(shareBtn) {
             shareBtn.textContent = "공유 불가 (오류)";
             shareBtn.disabled = true;
             shareBtn.classList.add("disabled");
             alert("Supabase 초기화 실패! 카드 공유 기능을 사용할 수 없습니다. supabase.js 설정 및 CDN 연결을 확인해주세요.");
         }
         const shareFab = document.getElementById("share-fab");
         if(shareFab) { shareFab.style.display = "none"; }
    }
  </script>

  <!-- FAB Button & PIP Script (unchanged) -->
  <button id="share-fab" data-tooltip="게시판에 공유하기" title="게시판에 공유하기">공유</button>
  <script>
    // ... unchanged FAB and PIP logic ...
    const shareFab = document.getElementById("share-fab");
    if (shareFab) {
        shareFab.addEventListener("click", () => {
            const shareBtn = document.getElementById("share-btn");
            if (shareBtn && !shareBtn.disabled) {
                 shareBtn.click();
            }
        });
    } else {
        console.warn("Share FAB button not found.");
    }
    const cardCanvasObserverTarget = document.getElementById("cardCanvas");
    const pipPreviewElement = document.getElementById("pipPreview");
    if (cardCanvasObserverTarget && pipPreviewElement) {
        const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
        const intersectionCallback = (entries) => { entries.forEach(entry => { const isMobile = window.innerWidth < 768; if (isMobile) { pipPreviewElement.classList.toggle("show", !entry.isIntersecting || entry.intersectionRatio < 0.1); } else { pipPreviewElement.classList.remove("show"); } }); };
        const observer = new IntersectionObserver(intersectionCallback, observerOptions);
        observer.observe(cardCanvasObserverTarget);
        const checkPipVisibility = () => { const isMobile = window.innerWidth < 768; if (!isMobile) { pipPreviewElement.classList.remove("show"); } else { const rect = cardCanvasObserverTarget.getBoundingClientRect(); const viewportHeight = window.innerHeight; const isCurrentlyIntersecting = rect.top < viewportHeight && rect.bottom > 0; const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)); const intersectionRatio = rect.height > 0 ? visibleHeight / rect.height : 0; pipPreviewElement.classList.toggle("show", !isCurrentlyIntersecting || intersectionRatio < 0.1); } };
        window.addEventListener("resize", checkPipVisibility);
        window.addEventListener("scroll", checkPipVisibility, { passive: true });
        setTimeout(checkPipVisibility, 150);
    } else { console.warn("Canvas or PIP element not found for IntersectionObserver setup."); }
  </script>

</body>
</html>

