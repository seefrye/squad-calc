/* For prompting console input from user, not used right now but may try again
const prompt = require('prompt-sync')();
let leaderThreat = prompt("What's your leader's?")
let a2 = prompt("How many 2s in your squad?")
let b3 = prompt("How many 3s in your squad?")
let c4 = prompt("How many 4s in your squad?")
let d5 = prompt("How many 5s in your squad?")
let e6 = prompt("How many 6s in your squad?")*/

const fs = require('fs'); // needed for writing to file
let resultsArray = []; // initialize the results array. Not really utilized currently, all done thru console output
let a = 0 // initialize our counting variables
let b = 0 // a possible squad is one where 2a + 3b + 4c + 5d + 6e = Mission level - leader threat
let c = 0 // we're essentially checking all 100k possible combos, even though most will never be possible
let d = 0
let e = 0
let m14 = [] // these are arrays holding the results for each mission level
let m15 = []
let m16 = []
let m17 = []
let m18 = []
let m19 = []
let m20 = []
let inputArray = [2,2,2,2,1]; // fill this in w/ number of 2s, number of 3s, etc
let leaderThreat = 3; // this is your leader's threat level
let threat = (14 - leaderThreat); // initialize threat at lowest mission - leader threat

while (threat + leaderThreat <= 20) { // start at the lowest, then run through the highest mission threat (20)
    let missionLevel = threat + leaderThreat
    if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0) { // if all are 0, it's either the first run or the threat just increased. In all cases, 0-0-0-0-0 is not a valid squad, so we just increment a and move on. This is a safe spot to stick table headers for console output, though may disable console output
        console.log("---")
        console.log("Mission level: " + missionLevel + " Leader TL: " + leaderThreat)
        a++
    } else if (a === 9 && b === 9 && c===9 && d===9 && e===9) { // if at 9-9-9-9-9, increase the threat, reset the results array, and reset the counters
        threat++
        resultsArray = []
        a = 0
        b = 0
        c = 0
        d = 0
        e = 0
    } else if (2*a + 3*b + 4*c + 5*d + 6*e !== threat) { // if not a match, increment value by 1
        if (a < 9) {
            a++
        } else if (b < 9) {
            b++
            a=0
        } else if (c < 9) {
            c++
            a=0
            b=0
        } else if (d < 9) {
            d++
            a=0
            b=0
            c=0
        } else if (e < 9) {
            e++
            a=0
            b=0
            c=0
            d=0
        }
    } else if (2*a + 3*b + 4*c + 5*d + 6*e === threat) { // on a match
        let tempArray = []
        tempArray.push(a,b,c,d,e) // store the values temporarily
        if (a <= inputArray[0] && b <= inputArray[1] && c <= inputArray[2] && d <= inputArray[3] && e <= inputArray[4]) { // check that the combination is one your squad can actually take
            resultsArray.push([tempArray]) // push results to the results array
            console.log("2 x " + a + ", 3 x " + b + ", 4 x " + c + ", 5 x " + d + ", 6 x " + e) // console output, not necessary
            if (missionLevel === 14) { // check which array to write to, and push the result
                m14.push([tempArray])
            } else if (missionLevel === 15) {
                m15.push([tempArray])
            } else if (missionLevel === 16) {
                m16.push([tempArray])
            } else if (missionLevel === 17) {
                m17.push([tempArray])
            } else if (missionLevel === 18) {
                m18.push([tempArray])
            } else if (missionLevel === 19) {
                m19.push([tempArray])
            } else if (missionLevel === 20) {
                m20.push([tempArray])
            }
        }
        tempArray = [] // reset the temp array
        if (a < 9) { // increment counters
            a++
        } else if (b < 9) {
            b++
            a=0
        } else if (c < 9) {
            c++
            a=0
            b=0
        } else if (d < 9) {
            d++
            a=0
            b=0
            c=0
        } else if (e < 9) {
            e++
            a=0
            b=0
            c=0
            d=0
        }
    }
}

function initHTML() { // writeFile will overwrite the existing file. this generates HTML header, basically everything before the first table. style needs some work
    let content = "<!DOCTYPE html>\n<html>\n<style>\ntable, th, td {\nborder: 1px solid black;\n}\n</style>     \n<body>\n"
    fs.writeFile('./output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function closeHTML() { // simple, just closes out the <body> and <html> tags
    let content = "</body>\n</html>"
    fs.appendFile('./output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function createTable(missionLevel, arr) { // builds a table top to bottom
    let headers = ["TL2","TL3","TL4","TL5","TL6"] // table headers
    let table_as_string = "" // init holder string
    table_as_string += `<table>\n<tr>\n<th colspan="5">Mission level: ${missionLevel}  Leader Threat: ${leaderThreat}</th>\n</tr>\n` // adds table header stuff to holder string
    for (let i = 0; i < headers.length; i++) { // iterate headers and create html headers
        table_as_string += "<th>" + headers[i] + "</th>\n" // wrap header in <th> tags w/ new line
    }
    table_as_string += "</tr>\n" // close out <tr>
    for (let i = 0; i < arr.length; i++) { // triple for loop to add each result value as a table cell, with rows properly wrapped
        for (let j = 0; j < arr[i].length; j++) {
            table_as_string += "<tr>\n"
            for (let k = 0; k < arr[i][j].length; k++) {
                table_as_string += "<td>" + arr[i][j][k] + "</td>\n"
            }
            table_as_string += "</tr>\n"
        }
    }
    table_as_string += "</table>" // close out table
fs.appendFile('./output.html', table_as_string, err => { // write holder string to file, only once per table
    if (err) {
        console.error(err);
    }
});
}

// generate document
initHTML()
createTable(14, m14)
createTable(15, m15)
createTable(16, m16)
createTable(17, m17)
createTable(18, m18)
createTable(19, m19)
createTable(20, m20)
closeHTML()