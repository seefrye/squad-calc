/* For prompting console input from user, not used right now but may try again
const prompt = require('prompt-sync')();
let leaderThreat = prompt("What's your leader's?")
let a2 = prompt("How many 2s in your squad?")
let b3 = prompt("How many 3s in your squad?")
let c4 = prompt("How many 4s in your squad?")
let d5 = prompt("How many 5s in your squad?")
let e6 = prompt("How many 6s in your squad?")*/

const fs = require('fs');
let resultsArray = []; // initialize the results array. Not really utilized currently, all done thru console output
let a = 0 // initialize our counting variables
let b = 0 // a possible squad is one where 2a + 3b + 4c + 5d + 6e = Mission level - leader threat
let c = 0 // we're essentially checking all 100k possible combos, even though most will never be possible
let d = 0
let e = 0
let m14 = []
let m15 = []
let m16 = []
let m17 = []
let m18 = []
let m19 = []
let m20 = []
let inputArray = [1,3,3,2,0]; // fill this in w/ number of 2s, number of 3s, etc
let leaderThreat = 4; // this is your leader's threat level
let threat = (14 - leaderThreat); // initialize threat at lowest mission - leader threat

while (threat + leaderThreat <= 20) { // start at the lowest, then run through the highest mission threat (20)
    let missionLevel = threat + leaderThreat
    if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0) {
        console.log("---")
        console.log("Mission level: " + missionLevel + " Leader TL: " + leaderThreat)
        a++
    } else if (a === 9 && b === 9 && c===9 && d===9 && e===9) {
        threat++
        resultsArray = []
        a = 0
        b = 0
        c = 0
        d = 0
        e = 0
    } else if (2*a + 3*b + 4*c + 5*d + 6*e !== threat) {
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
    } else if (2*a + 3*b + 4*c + 5*d + 6*e === threat) {
        let tempArray = []
        tempArray.push(a,b,c,d,e)
        if (a <= inputArray[0] && b <= inputArray[1] && c <= inputArray[2] && d <= inputArray[3] && e <= inputArray[4]) {
            resultsArray.push([tempArray])
            console.log("2 x " + a + ", 3 x " + b + ", 4 x " + c + ", 5 x " + d + ", 6 x " + e)
            if (missionLevel === 14) {
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
        tempArray = []
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
    }
}

function initHTML() {
    let content = "<!DOCTYPE html>\n<html>\n<style>\ntable, th, td {\nborder: 1px solid black;\n}\n</style>     \n<body>\n"
    fs.writeFile('./output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function closeHTML() {
    let content = "</body>\n</html>"
    fs.appendFile('./output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function createTable(missionLevel, arr) {
    let headers = ["TL2","TL3","TL4","TL5","TL6"]
    let table_as_string = ""
    table_as_string += `<table>\n<tr>\n<th colspan="5">Mission level: ${missionLevel}  Leader Threat: ${leaderThreat}</th>\n</tr>\n`
    for (let i = 0; i < headers.length; i++) {
        table_as_string += "<th>" + headers[i] + "</th>\n"
    }
    table_as_string += "</tr>\n"
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            table_as_string += "<tr>\n"
            for (let k = 0; k < arr[i][j].length; k++) {
                table_as_string += "<td>" + arr[i][j][k] + "</td>\n"
            }
            table_as_string += "</tr>\n"
        }
    }
    table_as_string += "</table>"
// console.log(table_as_string)
fs.appendFile('./output.html', table_as_string, err => {
    if (err) {
        console.error(err);
    }
});
}

initHTML()
createTable(14, m14)
createTable(15, m15)
createTable(16, m16)
createTable(17, m17)
createTable(18, m18)
createTable(19, m19)
createTable(20, m20)
closeHTML()