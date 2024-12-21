(function (window, document) {
    // 渲染一个日历
// 提供任一年的任一月的布局动态渲染到页面上
// 把2024年12月的布局动态渲染到页面上
// 1. 获取11月有多少天
// 2. 获取12月有多少天
// 3. 7 - (计算第一步+第二步)%7
// 4. 将以上3步，分别提供html片段 整合在一起插入文档

    var currentDate = new Date();

    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var PREV_TYPE = "PREV";
    var CURRENT_TYPE = "CURRENT";
    var NEXT_TYPE = "NEXT";
    var calendarRoot = document.querySelector(".calendar");
    var yearElement = document.querySelector(".calendar-toolbar_title");
    var visible =false;
    var conf = null;



    function getDateOfMonth(year, month) {
        var dateInstance = new Date(year, month, 0);
        var dateCount = dateInstance.getDate();
        return dateCount;
    }

    function getDayOfMonthFirstDate(year, month) {
        var dateInstance = new Date(year, month - 1, 1);
        var day = dateInstance.getDay();
        return day;
    }

// 更新年月
    function updateYearAndMonth(nowYear, nowMonth) {
        yearElement.innerText = nowYear;
        calendarRoot.style.setProperty("--nowMonth", `${nowMonth}`);
        currentYear = nowYear;
        currentMonth = nowMonth;
    }

// 绑定事件
    function bindEvent() {

        calendarRoot.addEventListener("click", function (e) {
            var dateInstance = new Date(currentYear, currentMonth - 1);
            var className = e.target.className;

            if (className === "calendar-toolbar_prev") {
                dateInstance.setMonth(dateInstance.getMonth() - 1);
                var newYear = dateInstance.getFullYear();
                var newMonth = dateInstance.getMonth() + 1;
                updateYearAndMonth(newYear, newMonth);
                createCalendar(newYear, newMonth);
            }

            if (className === "calendar-toolbar_next") {
                dateInstance.setMonth(dateInstance.getMonth() + 1);
                var newYear = dateInstance.getFullYear();
                var newMonth = dateInstance.getMonth() + 1;
                updateYearAndMonth(newYear, newMonth);
                createCalendar(newYear, newMonth);
            }

            if (className.indexOf("calendar-date_current") > -1) {
                // console.log(e.target.customCalendarInfo);
                // conf.selected(e.target.customCalendarInfo);
                typeof conf.selected === "function" && conf.selected(e.target.customCalendarInfo);
            }
        });
    }

    bindEvent();

// 创建日期单元格方法
    function createDateCellFragment(start, end, type) {
        var fragment = document.createDocumentFragment();
        for (var i = start; i <= end; i++) {
            var calendarDateElement = document.createElement("div");
            calendarDateElement.classList.add("calendar-date_base");
            calendarDateElement.innerText = i;
            switch (type) {
                case PREV_TYPE:
                    calendarDateElement.classList.add("calendar-date_disable");
                    break;
                case CURRENT_TYPE:
                    calendarDateElement.classList.add("calendar-date_current");
                    calendarDateElement.customCalendarInfo = {
                        year: currentYear,
                        month: currentMonth,
                        date: i,
                    };
                    break;
                case NEXT_TYPE:
                    calendarDateElement.classList.add("calendar-date_disable");
                    break;
                default:
                    break;
            }
            fragment.appendChild(calendarDateElement);
        }
        return fragment;
    }

    function createCalendar(year, month) {
        var WEEK_DATE_COUNT = 7;
        var mainFragment = document.createDocumentFragment();
        var mainBody = document.querySelector(".calendar-main_body");
        mainBody.innerHTML="";
        yearElement.innerText = year;
        var currentMonthDateCount = getDateOfMonth(year, month);
        var prevMonthDateCount = getDateOfMonth(year, month - 1);
        var dayOfCurrentMonthFirstDate = getDayOfMonthFirstDate(year, month);
        var prevMonthDatePadding = dayOfCurrentMonthFirstDate;
        var nextMonthDatePadding =
            WEEK_DATE_COUNT -
            ((prevMonthDatePadding + currentMonthDateCount) % WEEK_DATE_COUNT);

        if (nextMonthDatePadding === 7) {
            nextMonthDatePadding = 0;
        }

        // 创建上个月的日期补充单元格
        var prevMonthDatePaddingFragment = createDateCellFragment(
            prevMonthDateCount - prevMonthDatePadding + 1,
            prevMonthDateCount,
            PREV_TYPE
        );

        var currentMonthDateFragment = createDateCellFragment(
            1,
            currentMonthDateCount,
            CURRENT_TYPE
        );

        var nextMonthDatePaddingFragment = createDateCellFragment(
            1,
            nextMonthDatePadding,
            NEXT_TYPE
        );

        mainFragment.appendChild(prevMonthDatePaddingFragment);
        mainFragment.appendChild(currentMonthDateFragment);
        mainFragment.appendChild(nextMonthDatePaddingFragment);
        mainBody.appendChild(mainFragment);
    }

    function hideCalendar() {
        visible = false;
        calendarRoot.style.display="none";
    }

    function showCalendar() {
        visible = true;
        calendarRoot.style.display="block";
    }


    window.calendar = {
        getVisible : function () {
            return visible;
        },
        hide:hideCalendar,
        show:showCalendar,
        init:function (config){
            conf=config;
            createCalendar(currentYear, currentMonth);
        }
    }

})(window, document);