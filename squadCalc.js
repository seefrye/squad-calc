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
let finalResults = [m14,m15,m16,m17,m18,m19,m20]
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

function unpackResult(result) { // used to unpack each array in m14, m15... into HTML table cells
    let content = "<tr>\n"
    fs.appendFile('/home/chris/Documents/GitHub/Squad Calc/output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
    for (let i = 0; i < result.length; i++) { // Start off with a <tr>
        let content = `<td>${result[i]}</td>\n` // Put each value into a <td>
        fs.appendFile('/home/chris/Documents/GitHub/Squad Calc/output.html', content, err => {
            if (err) {
                console.error(err);
            }
            // done!
        });
    }
    content = "</tr>\n" // Close the <tr> at the end of the array
    fs.appendFile('/home/chris/Documents/GitHub/Squad Calc/output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}


function initHTML() {
    let content = "<!DOCTYPE html>\n<html>\n<style>\ntable, th, td {\nborder: 1px solid black;\n}\n</style>     \n<body>\n"
    fs.writeFile('/home/chris/Documents/GitHub/Squad Calc/output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function closeHTML() {
    let content = "</body>\n</html>"
    fs.appendFile('/home/chris/Documents/GitHub/Squad Calc/output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function initTable(missionLevel, leaderThreat) {
    let content = `<table>\n<tr>\n<th colspan="5">Mission level: ${missionLevel}  Leader Threat: ${leaderThreat}</th>\n</tr>\n<tr>\n<th>TL2</th>\n<th>TL3</th>\n<th>TL4</th>\n<th>TL5</th>\n<th>TL6</th>\n</tr>\n`
    fs.appendFile('/home/chris/Documents/GitHub/Squad Calc/output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function closeTable() {
    let content = "</table>\n"
    fs.appendFile('/home/chris/Documents/GitHub/Squad Calc/output.html', content, err => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

function unpackTopLevelResult(arr) {
    for (let i = 0; i < arr.length; i++) { // for every result in m14...
        let tempArray = arr[i]
        for (let j = 0; j < tempArray.length; j++) {
            let tempSubArray = tempArray[j]
            unpackResult(tempSubArray)
        }
    }
}

initHTML()
initTable(14, leaderThreat)
unpackTopLevelResult(m14)
initTable(15, leaderThreat)
unpackTopLevelResult(m15)
initTable(16, leaderThreat)
unpackTopLevelResult(m16)
initTable(17, leaderThreat)
unpackTopLevelResult(m17)
initTable(18, leaderThreat)
unpackTopLevelResult(m18)
initTable(19, leaderThreat)
unpackTopLevelResult(m19)
initTable(20, leaderThreat)
unpackTopLevelResult(m20)
closeTable()
closeHTML()