var lines = require('./index');

function update() {
    lines.getDepartures('Hauptbahnhof', ['u']).then(lines => {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        var time = new Date().toLocaleTimeString('de-DE', { hour: "numeric", minute: "numeric", second: "numeric" });
        console.log("========================================================");
        console.log("                     Hauptbahnhof");
        console.log(`=============================================[${time}]=`);
        lines.forEach(line => {
            let lineNr = (line.lineNumber + (line.lineType).toUpperCase()).padEnd("5", " ");
            let destination = (line.lineDestination).padEnd("35", " ");
            let departure;
            if (line.lineDepartureIn <= 0) {
                departure = "Jetzt"
            } else {
                departure = (line.lineDepartureIn + " Minuten").padEnd("10", " ");
            }
            console.log(`${lineNr} | ${destination} | ${departure}`);
        });
    });
}
update();
setInterval(() => {
    update();
}, 1000 * 30);