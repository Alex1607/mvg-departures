var lines = require('./index');
var currentData = [];

function refreshInterface() {
    var outputText;
    var time = new Date().toLocaleTimeString('de-DE', { hour: "numeric", minute: "numeric", second: "numeric" });
    var stationName = "Hauptbahnhof";
    outputText = "========================================================";
    outputText += "\n" + stationName.padEnd((56 / 2) + stationName.length / 2, ".").padStart(56, ".");
    outputText += "\n" + `=============================================[${time}]=`;
    var tram = [];
    var sbahn = [];
    var ubahn = [];
    var bus = [];
    currentData.forEach(line => {
        switch (line.lineType) {
            case 't':
                tram.push(line);
                break;
            case 'u':
                ubahn.push(line);
                break;
            case 'b':
                bus.push(line);
                break;
            case 's':
                sbahn.push(line);
                break;

            default:
                break;
        }
    });

    ubahn.forEach(line => {
        let lineNr = (line.lineNumber + (line.lineType).toUpperCase()).padEnd("5", " ");
        let destination = (line.lineDestination).padEnd("35", " ");
        let departure;
        if (line.lineDepartureIn <= 0) {
            departure = "Jetzt"
        } else {
            departure = (line.lineDepartureIn + " Minuten").padEnd("10", " ");
        }
        outputText += "\n" + `${lineNr} | ${destination} | ${departure}`;
    });
    outputText += "\n" + "--------------------------------------------------------";
    tram.forEach(line => {
        let lineNr = (line.lineNumber + (line.lineType).toUpperCase()).padEnd("5", " ");
        let destination = (line.lineDestination).padEnd("35", " ");
        let departure;
        if (line.lineDepartureIn <= 0) {
            departure = "Jetzt"
        } else {
            departure = (line.lineDepartureIn + " Minuten").padEnd("10", " ");
        }
        outputText += "\n" + `${lineNr} | ${destination} | ${departure}`;
    });
    outputText += "\n" + "--------------------------------------------------------";
    sbahn.forEach(line => {
        let lineNr = (line.lineNumber + (line.lineType).toUpperCase()).padEnd("5", " ");
        let destination = (line.lineDestination).padEnd("35", " ");
        let departure;
        if (line.lineDepartureIn <= 0) {
            departure = "Jetzt"
        } else {
            departure = (line.lineDepartureIn + " Minuten").padEnd("10", " ");
        }
        outputText += "\n" + `${lineNr} | ${destination} | ${departure}`;
    });
    outputText += "\n" + "--------------------------------------------------------";
    bus.forEach(line => {
        let lineNr = (line.lineNumber + (line.lineType).toUpperCase()).padEnd("5", " ");
        let destination = (line.lineDestination).padEnd("35", " ");
        let departure;
        if (line.lineDepartureIn <= 0) {
            departure = "Jetzt"
        } else {
            departure = (line.lineDepartureIn + " Minuten").padEnd("10", " ");
        }
        outputText += "\n" + `${lineNr} | ${destination} | ${departure}`;
    });
    
    process.stdout.write("\u001b[2J\u001b[0;0H" + outputText);
}

function refreshData() {
    lines.getDepartures('Hauptbahnhof', ['u', 's', 't', 'b']).then(lines => {
        currentData = lines;
    });
}

refreshData();

setInterval(() => {
    refreshInterface();
}, 1000 * 1);

setInterval(() => {
    refreshData();
}, 1000 * 30);