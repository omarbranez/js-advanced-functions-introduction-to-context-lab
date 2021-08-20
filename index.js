// Your code here
function createEmployeeRecord(sourceArray) {
    return {
        firstName: sourceArray[0],
        familyName: sourceArray[1],
        title: sourceArray[2],
        payPerHour: sourceArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(source) {
    return source.map( row => { 
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(record, dateStamp) {
    // debugger
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return record
}

function createTimeOutEvent(record, dateStamp) {
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return record
}

function hoursWorkedOnDate(record, day) {
    // debugger
    const timeIn = record.timeInEvents.find(r => r.date === day).hour
    const timeOut = record.timeOutEvents.find(r => r.date === day).hour
    return (timeOut - timeIn) / 100 
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let eligibleDays = record.timeInEvents.map( rec => rec.date)
    // let personSalary
//     let salarySum = 0
//     for (const day of eligibleDays) {
//         debugger
//         // personSalary = wagesEarnedOnDate(record, day)
//         salarySum = wagesEarnedOnDate(record, day) + salarySum
//         // eligibleDays.reduce(function(accumulator, ){
//         // console.log(accumulator)
//         // return accumulator + wagesEarnedOnDate(record, day)
//     // }, 0)
    
//     // }=> day =>agesEarnedOnDate(record, day), 0)
// }
    let payOwed = eligibleDays.reduce(function(salarySum, day) {
        return salarySum + wagesEarnedOnDate(record, day)
    }, 0)
    return payOwed
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find( record => record.firstName === firstName)
}
// alternatively, as a first order function
// let findEmployeeByFirstName = function(srcArray, firstName) {
//     return srcArray.find( record => record.firstName === firstName )
// }


function calculatePayroll(srcArray) {
    return srcArray.reduce(function(payrollTotal, record) {
        return payrollTotal + allWagesFor(record)
    }, 0)
}
// alternatively, as a first order function

// let calculatePayroll = function(srcArray) {
//     return srcArray.reduce(function(payrollTotal, record) {
//         return payrollTotal + allWagesFor(record)
//     }, 0)
// }