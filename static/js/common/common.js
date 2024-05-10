$(function(){
    tableSizeSelectBox();
    paginationButtonActive();
    setDateRangePicker();
});


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
            // selectPageSize();
        });
    });

    let defaultOption = options[0];
    selectSpan.textContent = defaultOption.textContent;
}

function paginationButtonActive() {
    $('#paginationArea a').click(function(){
        $(this).addClass('pagingActive');
        $(this).parents().siblings('li').find('a').removeClass();
    });
}

function setDateRangePicker() {
    let nowDate =  new Date();
    let beforeOneWeekDate = new Date(new Date().getTime() - (7*24*60*60*1000))

    $('input[name="dates"]').daterangepicker({
        startDate : beforeOneWeekDate,
        endDate : nowDate
    });
}