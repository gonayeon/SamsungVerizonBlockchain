$(function(){
    changeTabMenuColor();
    tableSizeSelectBox();
});

function setDateRangePicker(selector) {
    let nowDate =  new Date();
    //let beforeOneYearDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    let beforeOneWeekDate = new Date(new Date().getTime() - (7*24*60*60*1000))

    $(`${selector}`).daterangepicker({
        startDate : beforeOneWeekDate,
        endDate : nowDate
    });
}


let page = 1;
let size = 10;
let paginationData;
let currentPageName;

function drawPagination() {
    const paginationArea = document.getElementById('paginationArea')
    paginationArea.innerHTML = '';

    let nowPage = paginationData.page;
    let startPage = paginationData.startPage;
    let endPage = paginationData.endPage;
    let totalPage = paginationData.totalPage;
    let prevPage = paginationData.prevPage;
    let nextPage = paginationData.nextPage;
    let totalCount = paginationData.totalCount;

    let html = `<li><button type="button" onclick="movePage(1)"><img src="/images/arrow-double-left.svg" alt="startPage"></button></li>`;
        html +=  `<li><button type="button" onclick="movePage(${prevPage})"><img src="/images/arrow-left.svg" alt="prevPage"></button></li>`;

    for (let i = startPage; i <= endPage; i++) {
        if (nowPage == i) {
            html +=  `<li><a class="pagingActive">${i}</a></li>`;
        } else {
            html +=  `<li onclick="movePage(${i})"><a>${i}</a></li>`;
        }
    }

    html +=  `<li><button type="button" onclick="movePage(${nextPage})"><img src="/images/arrow-right.svg" alt="nextPage"></button></li>`;
    html +=  `<li><button type="button" onclick="movePage(${totalPage})"><img src="/images/arrow-double-right.svg" alt="endPage"></button></li>`;

    paginationArea.innerHTML = html;
    $('#totalCount').text(totalCount);
}

function movePage(pageNumber) {
    if (pageNumber === page) {
        return;
    }

    page = pageNumber;

    switch (currentPageName) {
        case pageNames["ASN_DO"] :
            renderAsnDeliveryOrderList();
            break;

        case pageNames["ASN_PALLET"]:
            renderAsnPalletList();
            break;

        case pageNames["ASN_IMEI"] :
            renderAsnImeiList();
            break;

        case pageNames["THREE_PL_GR"] :
            render3plGrList();
            break;

        case pageNames["THREE_PL_GI"] :
            render3plGiList();
            break;

        case pageNames["INVENTORY"]:
            renderInventoryList();
            break;

        case pageNames["SELLOUT"]:
            renderSelloutList();
            break;

        case pageNames["USER_MANAGEMENT"]:
            renderUserList();
            break;

        case pageNames["ACCESS_LOG"]:
            renderAccessLogList();
            break;
    }
}

function selectPageSize() {
    page = 1;

    switch (currentPageName) {
        case pageNames["ASN_DO"] :
            renderAsnDeliveryOrderList();
            break;

        case pageNames["ASN_PALLET"]:
            renderAsnPalletList();
            break;

        case pageNames["ASN_IMEI"] :
            renderAsnImeiList();
            break;

        case pageNames["THREE_PL_GR"] :
            render3plGrList();
            break;

        case pageNames["THREE_PL_GI"] :
            render3plGiList();
            break;

        case pageNames["INVENTORY"]:
            renderInventoryList();
            break;

        case pageNames["SELLOUT"]:
            renderSelloutList();
            break;

        case pageNames["USER_MANAGEMENT"]:
            renderUserList();
            break;

        case pageNames["ACCESS_LOG"]:
            renderAccessLogList();
            break;
    }
}

function tableSizeSelectBox() {
    let selectHead = document.querySelector('.select-head')
    let selectSpan = selectHead.querySelector('span');
    let optionWrap = document.querySelector('.options');
    let options = optionWrap.querySelectorAll('li');

    selectHead.addEventListener('click', function () {
        if (optionWrap.style.display === 'none' || optionWrap.style.display === '') {
            optionWrap.style.display = 'block';
        } else {
            optionWrap.style.display = 'none';
        }
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            let selectedText = option.textContent;
            
            selectSpan.textContent = selectedText;
            optionWrap.style.display = 'none';
            selectPageSize();
        });
    });

    let defaultOption = options[0];
    selectSpan.textContent = defaultOption.textContent;
}

function changeTabMenuColor() {
    let currentTabName = window.location.pathname.replace("/", "").split("/")[0];
    $(`#tab_${currentTabName}`).addClass('selected');
}

// function adminTabToggle() {
//     const adminTab = document.querySelector('#tab_admin');
//     const adminSubMenu = document.querySelector('.admin-page-list');
//     let adminSubMenuList = adminSubMenu.querySelectorAll('li');

//     if (adminSubMenu.style.display === 'none' || adminSubMenu.style.display === '') {
//         adminSubMenu.style.display = 'block';

//         // 클릭 이벤트 추가
//         adminSubMenuList.forEach(item => {
//             item.addEventListener('click', function() {
//                 adminSubMenu.style.display = 'none';
//             });
//         });

//         // 바깥을 클릭했을 때도 숨기기
//         document.addEventListener('click', function(event) {
//             if (!adminTab.contains(event.target)) {
//                 adminSubMenu.style.display = 'none';
//             }
//         });
//     } else {
//         adminSubMenu.style.display = 'none';
//     }
// }

function resetPaginationCondition() {
    $('#totalCount').text("00,000");
    $('#pageSize').text($('.select-box .options li:eq(0)').text());
    $('#paginationArea').empty();
}

function setRequiredValidationField(selector, validationMessage, displayAttr) {
    updateDomHtml(selector, validationMessage);
    updateDomCss(selector, 'display', displayAttr);
}

function getEmptyTableHtml(colspan) {
    return `<tr><td colspan="${colspan}">no data.</td></tr>`;
}

function openManual() {
    const manualLink = '/manual/manual.pdf';
    window.open(manualLink);
}