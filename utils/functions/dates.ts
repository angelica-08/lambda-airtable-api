const dateFormatOption:any = {year: 'numeric', month: 'long', day: 'numeric' };

export function getDaysInAMonth(month:number, year:number) {
    const daysInMonth = new Date(month, year, 0).getDate();
    return daysInMonth
}
    
export function daysInYear(year:number) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}

export function getChineseDateFormat(input_timestamp: string): string {
    const timestamp = new Date(parseInt(input_timestamp)*1000)
    const date = timestamp.toLocaleDateString('zh-Hans-CN',  { timeZone: 'America/New_York'})
    return date
}

export function getLongMonthDateFormat(input_timestamp: string): string {
    const timestamp = new Date(parseInt(input_timestamp)*1000)
    const date = timestamp.toLocaleDateString('en-US',  { timeZone: 'America/New_York',...dateFormatOption})
    return date
}
