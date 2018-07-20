export const getDayCountOfMonth = function(year, month) {
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        return 30;
    }

    if (month === 1) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return 29;
        } else {
        return 28;
        }
    }

    return 31;
}
export const getWeekend = function(date) {
    let weekDay = ["日", "一", "二", "三", "四", "五", "六"]  
    let myDate = new Date(date);  
    return  weekDay[myDate.getDay()]
}
export const getMonth = function(date) {
    return new Date(date).getMonth() + 1
}
export const getDay = function(date) {
    return new Date(date).getDate()
}
export const getYear = function(date) {
    return new Date(date).getFullYear()
}
export const formatMonth = function(type, len, nowDay, year, month) {
    let newDayArr = []
    //需要追加内容的数组
    //console.log(len, '++++++++++++++++++++++++++++++++++++')
    let newDay = nowDay //最后一个月数据截止到XX
    let startIndex = type == 'first' ? 1 : 0 //判断第一个还是最后一个
    for(let i = startIndex; i < len; i++) {
        if(type == 'last') {
          
            newDay ++;
             
            newDayArr.push({DepartDate: year + '-' + month + '-' + newDay})
        } else {     
            //第一个月       
            newDay --;
            newDayArr.unshift({DepartDate: year + '-' + month + '-' + newDay})
        }        
    }
    return newDayArr
}
export const formatNum = function(str) {
    switch(str) {
        case '日': 
            return 7
        case '一': 
            return 1
        case '二': 
            return 2
        case '三': 
            return 3
        case '四': 
            return 4
        case '五': 
            return 5
        case '六': 
            return 6
    }
}

export const formatDate = function(date) {
    let month = new Date(date).getMonth() + 1
    let day = new Date(date).getDate()

    if (month >= 1 && month <= 9) {  
        month = "0" + month  
    }  
    if (day >= 0 && day <= 9) {  
        day = "0" + day 
    }  
    return month + '月' + day + '日'
}


export const getAfterDate = function(currDate, range) {            
    let targetday_milliseconds = currDate.getTime() + 1000 * 60 * 60 * 24 * range          
    currDate.setTime(targetday_milliseconds) //注意，这行是关键代码          
    let tYear = currDate.getFullYear();    
    let tMonth = currDate.getMonth();    
    let tDate = currDate.getDate();    
    tMonth = doHandleMonth(tMonth + 1);    
    tDate = doHandleMonth(tDate);    
    return tYear + "-" + tMonth + "-" + tDate;  
}
function doHandleMonth(month){    
    let m = month;    
    if(month.toString().length == 1){    
       m = "0" + month;    
    }    
    return m;    
}  

export const initDate = function(date) {  
    let seperator1 = "-";   
    let month = date.getMonth() + 1;  
     
    let strDate = date.getDate();  
    if (month >= 1 && month <= 9) {  
        month = "0" + month;  
    }  
    if (strDate >= 0 && strDate <= 9) {  
        strDate = "0" + strDate;  
    }  
      
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate 
    return currentdate;  
}

export const dateCompare = function(startDate,rangeDate, endDate){  
    return Date.parse(startDate) < Date.parse(rangeDate) && Date.parse(rangeDate) < Date.parse(endDate)
 }  

 export const formateAllDate = function(type, date) {            
    let year = getYear(date)
    let month = getMonth(date)            
    let monthNum = getDayCountOfMonth(year, month)    //当前月一共多少天         
    let len = type == 'first' ? getDay(date) : monthNum - getDay(date)          
    return formatMonth(type, len, getDay(date), year, month)
}


export const getDayNum = function(startTime, endTime) {
    var days = new Date(endTime).getTime() - new Date(startTime).getTime()
    var time = parseInt(days / (1000 * 60 * 60 * 24));
    return time
}