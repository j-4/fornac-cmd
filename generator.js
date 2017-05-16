var system = require('system');
var sequence = "";
var structure = "";
if(system.args.length !== 3){
    console.log('Error: this script requires two arguments (sequence and structure)!');
} else {
    sequence = system.args[1];
    structure = system.args[2];
}

var options = {'structure': structure,'sequence': sequence};


var fs = require('fs');
var page = require('webpage').create();
var url = 'file://' + fs.absolute('./index.html');


var createForna = function(options) {
    var container = new fornac.FornaContainer("#rna_ss", 
        {'applyForce': true, 'allowPanningAndZooming': true, 'initialSize':[500,500],
              'friction': 0.35,
              'middleCharge': -30,
              'otherCharge': -30,
              'linkDistanceMultiplier': 15,
              'chargeDistance': 110
        } 
    );

    container.addRNA(options.structure, options);
    return container;
};

var writeSVG = function() {
        var svg = document.getElementById('plotting-area');
        var svg_string = new XMLSerializer().serializeToString(svg);
        return svg_string;
};

function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}


page.open(url, function (status) {
    var container = evaluate(page, createForna, options);

    setTimeout(function() {
        //page.evaluate(function(){ container.clearNodes(); });
        console.log(page.evaluate(writeSVG));
        phantom.exit();
   }, 2500);
});

