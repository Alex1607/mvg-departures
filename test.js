var lines = require('./index');
var currentData = [];

function refreshInterface() {
    var outputText;
    var time = new Date().toLocaleTimeString('de-DE', { hour: "numeric", minute: "numeric", second: "numeric" });
    var stationName = "Hauptbahnhof";
    outputText = "========================================================";
    outputText += "\n" + stationName.padEnd((56 / 2) + stationName.length / 2, ".").padStart(56, ".");
    outputText += "\n" + `=============================================[${time}]=`;
    var data = {"tram": [], "sbahn": [], "ubahn": []};
    currentData.forEach(line => {
        switch (line.lineType) {
            case 't':
                data.tram.push(line);
                break;
            case 'u':
                data.ubahn.push(line);
                break;
            case 's':
                data.sbahn.push(line);
                break;

            default:
                break;
        }
    });

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            element.forEach(line => {
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
        }
    }
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