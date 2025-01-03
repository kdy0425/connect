let isSliding = false; // 애니메이션 상태

let slideUp = (target, duration = 500) => {
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight; 
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        isSliding = false; // 애니메이션 완료
    }, duration);
};

let slideDown = (target, duration = 500) => {
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    isSliding = true; // 애니메이션 시작
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        isSliding = false;
    }, duration);
};

let slideToggle = (target, duration = 500) => {
    if (isSliding) return; // 애니메이션 중일 때는 동작하지 않음
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};

//hd lang
(function() {
    const langBtn = document.querySelector('.hd_lang.v_pc .lang_btn');
    const langCnt = document.querySelector('.hd_lang.v_pc .lang_cnt');
    if(langBtn && langCnt){
        langBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            langBtn.classList.toggle('active');
            langCnt.classList.toggle('active');
            document.querySelector('.hd_search').classList.remove('active');
            document.querySelector('.hd_navall').classList.remove('active');
            document.querySelector('#header').classList.remove('nav_all_active');
        });

        document.addEventListener('click', (event) => {
            if (!langBtn.contains(event.target) && !langCnt.contains(event.target)) {
                langBtn.classList.remove('active');
                langCnt.classList.remove('active');
            }
        });
    }

    //mobile lang
    const langBtnMobile = document.querySelector('.hd_lang.v_mobile .lang_btn');
    const langCntMobile = document.querySelector('.hd_lang.v_mobile .lang_cnt');
    if(langBtnMobile && langCntMobile){
        langBtnMobile.addEventListener('click', (event) => {
            event.stopPropagation();
            langBtnMobile.classList.toggle('active');
            langCntMobile.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!langBtnMobile.contains(event.target) && !langCntMobile.contains(event.target)) {
                langBtnMobile.classList.remove('active');
                langCntMobile.classList.remove('active');
            }
        });
    }
}());

//hd 검색, 전체메뉴
(function() {
    const nav = document.querySelector('#nav');
    const header = document.querySelector('#header');
    const searchBtns = document.querySelectorAll('.search_btn');
    const hdSearch = document.querySelector('.hd_search');
    const navallBtns = document.querySelectorAll('.navall_btn');
    const hdNavall = document.querySelector('.hd_navall');
    const hdNavallToggleBtns = document.querySelectorAll('.hd_navall .navall_ul > li > a');

    // 검색 기능
    searchBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            hdSearch.classList.toggle('active');
            hdNavall.classList.remove('active');
            header.classList.remove('nav_all_active');
            document.querySelector('.hd_lang.v_pc .lang_btn').classList.remove('active');
            document.querySelector('.hd_lang.v_pc .lang_cnt').classList.remove('active');
        });
    });

    // 전체 메뉴 기능
    navallBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            hdNavall.classList.toggle('active');
            hdSearch.classList.remove('active');
            header.classList.toggle('nav_all_active');
            document.querySelector('.hd_lang.v_pc .lang_btn').classList.remove('active');
            document.querySelector('.hd_lang.v_pc .lang_cnt').classList.remove('active');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.hd_search') && !event.target.classList.contains('search_btn') && !event.target.closest('.navall_content')) {
            hdSearch.classList.remove('active');
            header.classList.remove('nav_all_active');
        }
        if (!event.target.closest('.hd_navall') && !event.target.classList.contains('navall_btn') && !event.target.closest('.navall_content')) {
            hdNavall.classList.remove('active');
            header.classList.remove('nav_all_active');
        }
    });

    nav.addEventListener('mouseenter', () => {
        hdSearch.classList.remove('active');
    });

    //모바일 메뉴 1depth 토글
    hdNavallToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSliding) return;
            btn.closest('li').classList.toggle('active');
            slideToggle(btn.closest('li').querySelector('ul'), 600);
        });
    });
}());


//커스텀 selectbox
function customSelect(button) {
    const options = button.nextElementSibling;
    const allOptions = document.querySelectorAll('.custom_select .options');
    allOptions.forEach(opt => {
        if (opt !== options) {
            opt.style.display = 'none';
            opt.classList.remove('bottom');
        }
    });

    const viewHeight = window.innerHeight;

    options.style.display = options.style.display === 'block' ? 'none' : 'block';
    const rect = button.getBoundingClientRect();
    if (rect.bottom + 100 > viewHeight) {
        options.classList.add('bottom');
    } else {
        options.classList.remove('bottom');
    }
}
function customSelectSelect(anchor, customHandler) {
	const items = anchor.closest('.options').querySelectorAll('.item a');
	items.forEach(function(item) {
		item.classList.remove('active');
	});
	anchor.classList.add('active');
	const hiddenInput = anchor.closest('.custom_select').querySelector('input[type="hidden"]');
	const btnSelect = anchor.closest('.custom_select').querySelector('.select_selected');
	hiddenInput.value = anchor.getAttribute('data-id');
	btnSelect.textContent = anchor.textContent;
	anchor.closest('.custom_select .options').style.display = 'none';

    // 인자가 존재하면 해당 함수를 호출
    if (customHandler && typeof window[customHandler] === 'function') {
        window[customHandler](anchor);
    }
}

document.addEventListener('click', function(event) {
	if (!event.target.closest('.custom_select')) {
		document.querySelectorAll('.custom_select .options').forEach(function(options) {
			options.style.display = 'none';
		});
	}
});
window.onload = function() {
	const activeItem = document.querySelector('.custom_select .options .item a.active');
	if (activeItem) {
		const hiddenInput = activeItem.closest('.custom_select').querySelector('input[type="hidden"]');
		const btnSelect = activeItem.closest('.custom_select').querySelector('.select_selected');
		hiddenInput.value = activeItem.getAttribute('data-id');
		btnSelect.textContent = activeItem.textContent;
	}
}

//관련 사이트 바로가기
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.sites_slide', {
        slidesPerView: 'auto',
        spaceBetween: 40,
        loop: true,
        autoplay: true,
        speed: 2000,
        navigation: {
            nextEl: '.sites_slide_wrap .swiper-button-next',
            prevEl: '.sites_slide_wrap .swiper-button-prev',
        },
        breakpoints: {
            1350: {
                spaceBetween: 80,
            },
        },
    });

    const pauseButton = document.querySelector('.sites_slide_wrap .swiper-button-pause');
    const playButton = document.querySelector('.sites_slide_wrap .swiper-button-play');
    
    pauseButton.addEventListener('click', function () {
        swiper.autoplay.stop();
        pauseButton.style.display = 'none';
        playButton.style.display = 'block';
    });

    playButton.addEventListener('click', function () {
        swiper.autoplay.start();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    });
});

//토글 슬라이드
function toggleSlideItem(button, content ,duration){
    if (isSliding) return;
    const toggleSlide = button.closest('.item');
    let targetSlide = null;
    targetSlide = content ? content : toggleSlide.querySelector('[slide-content]');
    toggleSlide.classList.toggle('active');
    let speed = duration !== undefined ? duration : 600;
    slideToggle(targetSlide, speed);
}

//aside nav toggle
document.querySelectorAll('.aside_nav > ul > li > button').forEach(button => {
    button.addEventListener('click', function() {
        const slideContent = button.closest('li').querySelector('ul');
        toggleSlideItem(button, slideContent)
    });
});


//체크박스 전체 체크 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.label_control input[type="checkbox"]').forEach(function (check) {
        check.addEventListener('change', function (event) {
        function isVisible(element) {
            return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
        }
        const target = event.target;
        const labelControlParent = check.closest('.label_control_parent');
        const checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check_all_parent') : null;
        if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
            const isChecked = target.checked;
            const checkboxes = check.closest('.label_control').querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function (checkbox) {
            if (isVisible(checkbox) && !checkbox.disabled) {
                checkbox.checked = isChecked;
            }
            });
            if (!isChecked) {
            target.checked = false; // check-all 비활성화
            if (checkAllParentCheckbox) {
                checkAllParentCheckbox.checked = false; // check-all 비활성화
            }
            }
        } else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
            const checkAllCheckbox = check.closest('.label_control').querySelector('.check_all');
            if (checkAllCheckbox) {
            checkAllCheckbox.checked = false; // check-all 비활성화
            }
            if (checkAllParentCheckbox) {
            checkAllParentCheckbox.checked = false; // check-all 비활성화
            }
        }
        });
    });
});


//input password 비밀번호 보기
document.querySelectorAll('.btn_password_toggle').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.closest('.input').querySelector('input');
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.add('active');
            this.textContent = '비밀번호 숨기기';
        } else {
            input.type = 'password';
            this.classList.remove('active');
            this.textContent = '비밀번호 보기';
        }
    });
});

//input tel 숫자만 입력
document.querySelectorAll('input[type="tel"]').forEach(telInput => {
    telInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

//datepicker
document.querySelectorAll('.datepicker').forEach(function(pickerField) {
    var picker = new Pikaday({
        field: pickerField,
        onSelect: function() {
            var date = picker.getDate();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            var formattedDate = `${year}-${month}-${day}`;
            pickerField.value = formattedDate;
        },
        showMonthAfterYear : true
        //firstDay: 1,  // 1-> 시작날짜 월요일 0-> 일요일
        //minDate: new Date(), //선택 최소날짜
        //maxDate: new Date(2020, 11, 31), //선택 최대날짜
        //yearRange: [2000, 2020] //표시년도
    });
});

//게시글 프린트 
function printContent(){
    window.print();
}

//빈곳클릭 공유하기 닫음
document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn_share') && !event.target.classList.contains('share_list') && !event.target.closest('.share_list')) {
        const shareList = document.querySelector('.share_list');
        shareList ? slideUp(shareList, 0) : '';
    }
});

//url복사
function copyUrl(url) {
	var textarea = document.createElement('textarea');
	textarea.value = url;
	document.body.appendChild(textarea);
	textarea.select();
	try {
		document.execCommand('copy');
		alert('url을 복사했습니다');
	} catch (err) {
		alert('url 복사에 실패했습니다. 직접 복사해주세요. <br/>'+ url);
	}
	document.body.removeChild(textarea);
}

//드래그 && 멑티 파일 첨부
document.addEventListener('DOMContentLoaded', () => {
    const fileAreas = document.querySelectorAll('.file_area');
    const inputFiles = document.querySelectorAll('.file_input');
    const fileLists = document.querySelectorAll('.add_files');

    if (!fileAreas && !inputFiles && !fileLists) return;

    function updateFileCountMessage(fileList, inputFile) {
        if (inputFile.files.length === 0) {
            fileList.style.display = 'none';
        } else {
            fileList.style.display = 'block';
        }
    }

    inputFiles.forEach((inputFile, index) => {
        const allowedTypes = inputFile.getAttribute('file-type').split(' ');
        const fileArea = fileAreas[index];
        const fileList = fileLists[index];
        const dataTransfer = new DataTransfer();

        inputFile.addEventListener('change', (event) => {
            const newFiles = Array.from(event.target.files);

            newFiles.forEach((file) => {
                const fileType = file.name.split('.').pop().toLowerCase();

                if (allowedTypes.includes(fileType)) {
                    dataTransfer.items.add(file);

                    const fileItem = document.createElement('div');
                    fileItem.className = 'file_item';

                    const fileName = document.createElement('span');
                    fileName.className = 'file_name';
                    fileName.textContent = file.name;
                    fileItem.appendChild(fileName);

                    const deleteButton = document.createElement('button');
                    deleteButton.type = 'button';
                    deleteButton.textContent = '삭제';
                    deleteButton.className = 'file_remove';

                    deleteButton.addEventListener('click', () => {
                        for (let i = 0; i < dataTransfer.items.length; i++) {
                            if (dataTransfer.items[i].getAsFile() === file) {
                                dataTransfer.items.remove(i);
                                break;
                            }
                        }

                        inputFile.files = dataTransfer.files;
                        fileItem.remove();
                        updateFileCountMessage(fileList, inputFile);
                    });

                    fileItem.appendChild(deleteButton);
                    fileList.appendChild(fileItem);
                }
            });

            inputFile.files = dataTransfer.files;
            updateFileCountMessage(fileList, inputFile);
        });

        fileArea.addEventListener('dragenter', (event) => {
            event.preventDefault();
            fileArea.classList.add('file_dragover');
        });

        fileArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            fileArea.classList.add('file_dragover');
        });

        fileArea.addEventListener('dragleave', (event) => {
            event.preventDefault();
            fileArea.classList.remove('file_dragover');
        });

        fileArea.addEventListener('drop', (event) => {
            event.preventDefault();
            fileArea.classList.remove('file_dragover');

            const droppedFiles = event.dataTransfer.files;

            Array.from(droppedFiles).forEach((file) => {
                const fileType = file.name.split('.').pop().toLowerCase();

                if (allowedTypes.includes(fileType)) {
                    dataTransfer.items.add(file);

                    const fileItem = document.createElement('div');
                    fileItem.className = 'file_item';

                    const fileName = document.createElement('span');
                    fileName.className = 'file_name';
                    fileName.textContent = file.name;
                    fileItem.appendChild(fileName);

                    const deleteButton = document.createElement('button');
                    deleteButton.type = 'button';
                    deleteButton.textContent = '삭제';
                    deleteButton.className = 'file_remove';

                    deleteButton.addEventListener('click', () => {
                        for (let i = 0; i < dataTransfer.items.length; i++) {
                            if (dataTransfer.items[i].getAsFile() === file) {
                                dataTransfer.items.remove(i);
                                break;
                            }
                        }

                        inputFile.files = dataTransfer.files;
                        fileItem.remove();
                        updateFileCountMessage(fileList, inputFile);
                    });

                    fileItem.appendChild(deleteButton);
                    fileList.appendChild(fileItem);
                }
            });

            inputFile.files = dataTransfer.files;
            updateFileCountMessage(fileList, inputFile);
        });
    });
});


//input url 추가
document.addEventListener('DOMContentLoaded', () => {
    const addLinkButtons = document.querySelectorAll('.add_link_btn');
    const urlInputs = document.querySelectorAll('.url_input');
    const addLists = document.querySelectorAll('.add_links');
    const hiddenInputs = document.querySelectorAll('.url_hidden');

    addLinkButtons.forEach((addButton, index) => {
        const urlInput = urlInputs[index];
        const addList = addLists[index];
        const hiddenInput = hiddenInputs[index];

        let storedLinks = [];

        function updateLinkList() {
            if (storedLinks.length === 0) {
                addList.style.display = 'none';
            } else {
                addList.style.display = 'block';
            }
            
            hiddenInput.value = JSON.stringify(storedLinks);
        }

        addButton.addEventListener('click', () => {
            const urlValue = urlInput.value.trim();

            if (urlValue && !storedLinks.includes(urlValue)) {
                storedLinks.push(urlValue);

                const linkItem = document.createElement('div');
                linkItem.className = 'file_item';

                const linkText = document.createElement('span');
                linkText.className = 'file_name';
                linkText.textContent = urlValue;
                linkItem.appendChild(linkText);

                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.textContent = '삭제';
                deleteButton.className = 'file_remove';

                deleteButton.addEventListener('click', () => {
                    const index = storedLinks.indexOf(urlValue);
                    if (index > -1) {
                        storedLinks.splice(index, 1);
                        linkItem.remove();
                        updateLinkList();
                    }
                });

                linkItem.appendChild(deleteButton);
                addList.appendChild(linkItem);

                urlInput.value = '';
                updateLinkList();
            }
        });
    });
});


//레이어팝업 열고닫기
function openLayer(target) {
    document.querySelector(target).style.display = 'flex';
    document.querySelector('html').classList.add('scroll_hidden');
	const layerBox = document.querySelector(target).querySelector('.layer_box');
	const windowHeight = window.innerHeight;

	if (layerBox.offsetHeight >= (windowHeight - 25)) {
		layerBox.setAttribute('data-simplebar', '');
		new SimpleBar(layerBox);
	} else {
		layerBox.removeAttribute('data-simplebar');
	}
}
function closeLayer(button) {
    button.closest('.layer_popup').style.display = 'none';
    document.querySelector('html').classList.remove('scroll_hidden');
}