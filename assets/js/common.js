
const langBtn = document.querySelector('.lang_btn');
const langCnt = document.querySelector('.lang_cnt');

// 버튼 클릭 시 active 토글
langBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // 이벤트가 상위 요소로 전파되지 않도록 방지
    langBtn.classList.toggle('active'); // 버튼에 active 추가/제거
    langCnt.classList.toggle('active'); // lang_cnt에 active 추가/제거
});

// 문서 내 다른 부분 클릭 시 active 제거
document.addEventListener('click', function(event) {
    // 클릭한 대상이 langBtn 또는 langCnt 내부가 아닌 경우
    if (!langBtn.contains(event.target) && !langCnt.contains(event.target)) {
        langBtn.classList.remove('active'); // 버튼에서 active 제거
        langCnt.classList.remove('active'); // lang_cnt에서 active 제거
    }
});


document.addEventListener('DOMContentLoaded', function() {
    
});
