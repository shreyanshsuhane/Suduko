// declaring variables
var numSelected = null;
var tileSelected = null;
var errors = 0;
// puzzle starts
let ques = {
    'ez': [
        "6------7-",
        "-----5-2-",
        "-----1---",
        "362----81",
        "--96-----",
        "71--9-4-5",
        "-2---651-",
        "--78----3",
        "45-------"
    ], 'med': [
        "--9------",
        "-4----6-7",
        "58-31----",
        "15--4-36-",
        "------4-8",
        "----9----",
        "---75----",
        "3-------1",
        "--2--3--5"]
    , hrd: [
        "-1-5-----",
        "--97-42--",
        "--5----7-",
        "5---3---7",
        "-6--2-41-",
        "--8--5---",
        "1-4------",
        "2-3-----9",
        "-7----8--"
    ]

}
// board solutions
let sol = {
    'ezs': [
        "685329174",
        "971485326",
        "234761859",
        "362574981",
        "549618732",
        "718293465",
        "823946517",
        "197852643",
        "456137298"
    ], 'meds': [
        "619472583",
        "243985617",
        "587316924",
        "158247369",
        "926531478",
        "734698152",
        "891754236",
        "365829741",
        "472163895"
    ], 'hrds': [
        "712583694",
        "639714258",
        "845269173",
        "521436987",
        "367928415",
        "498175326",
        "184697532",
        "253841769",
        "976352841"
    ]
}

// declaring variables
var board;
var solution;
var TotalRight = 0;
var TotalErrors = 0;

// initiates game
window.onload = function () {
    if (setGame) clearPrevious(setGame);

    id("start-btn").addEventListener("click", setGame);
    id("finish-btn").addEventListener("click", completeGame);
}

// creates sudoku board
function setGame() {
    id("time").classList.remove("hidden")
    id("buttonSub").classList.remove("hidden2")
    id("error").classList.remove("hidden")
    clearPrevious()
    if (id("EZ").checked) board = ques['ez'];
    if (id("EZ").checked) solution = sol['ezs'];
    if (id("MED").checked) board = ques['med'];
    if (id("MED").checked) solution = sol['meds'];
    if (id("HRD").checked) board = ques['hrd'];
    if (id("HRD").checked) solution = sol['hrds'];


    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);

    }

    // Sudoku Board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

//selects number to place on board
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

// selects the tile on board to place number
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            correct.play();
            TotalRight += 1;

            // On finishing game alert is sent
            if (TotalRight == 55 & id("EZ").checked) {
                alert("Congratulations you have completed the game on easy difficulty please Submit to see your results");
                id("time").classList.add("hidden")
            };
            if (TotalRight == 58 & id("MED").checked) {
                alert("Congratulations you have completed the game on medium difficulty please Submit to see your results");
                id("time").classList.add("hidden")
            };
            if (TotalRight == 57 & id("HRD").checked) {
                alert("Congratulations you have completed the game on hard difficulty please Submit to see your results");
                id("time").classList.add("hidden")
            };
        }
        else {
            errors += 1;
            TotalErrors += 1;
            document.getElementById("errors").innerText = errors;
            beep();

        }
    }
}

// Displays results upon finshing game 
// after clicking submit
function completeGame() {
    var endTime = id('time').innerHTML;
    var TotalAttempts = TotalErrors + TotalRight;
    var Accuracy = (TotalRight / TotalAttempts) * 100;
    Accuracy = Accuracy.toFixed(2);
    document.getElementById('board').innerHTML = "";
    document.getElementById('digits').innerHTML = "";
    selectedNum = null;
    document.getElementById('board').innerHTML = "";
    document.getElementById('digits').innerHTML = "";
    id("buttonSub").classList.add("hidden2");
    let result_line = document.createElement("h3");
    result_line.innerHTML = `Total Attempts: ${TotalAttempts} | Accuracy: ${Accuracy}% |\
    Total Right: ${TotalRight} | Total Errors: ${TotalErrors} | Total Time Taken: ${endTime}`;
    document.getElementById("Results").appendChild(result_line);
}

// clears board after finishing for new attempt
function clearPrevious() {
    document.getElementById("errors").innerText = 0;
    errors = 0;
    TotalRight = 0;
    TotalErrors = 0;
    document.getElementById('board').innerHTML = "";
    document.getElementById('digits').innerHTML = "";
    selectedNum = null;
}

// audio for placing on correct tile
var correct = new Audio("static/correct.mp3");

// alias
function id(id) {
    return document.getElementById(id);
}

// audio for placing on incorrect tile
function beep() {
    var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/\
                        ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/\
                        ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G\
                        4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//\
                        EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///\
                        z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4\
                        VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt\
                        //+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDg\
                        AAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxE\
                        KDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKL\
                        C0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r\
                        //xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3\
                        /6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv\
                        /6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAA\
                        AVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2\
                        sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFC\
                        PDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8W\
                        XcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K\
                        4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqs\
                        iyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1D\
                        YsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mO\
                        W1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQAL\
                        gAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQP\
                        dC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6\
                        ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE\
                        1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4Vf\
                        WLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDv\
                        jvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu\
                        67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/\
                        pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBB\
                        BA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNB\
                        DZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9\
                        ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRP\
                        gUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1\
                        KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIs\
                        LivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1J\
                        SFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb//////////////////////////////////////////////\
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////\
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////\
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////\
                        //////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
                        AAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc\
                        291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}