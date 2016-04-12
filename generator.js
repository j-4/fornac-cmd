var fs = require('fs');
var page = require('webpage').create();
var url = 'file://' + fs.absolute('./index.html');


var createForna = function() {
    var container = new fornac.FornaContainer("#rna_ss", 
        {'applyForce': true, 'allowPanningAndZooming': true, 'initialSize':[500,500],
              'friction': 0.35,
              'middleCharge': -30,
              'otherCharge': -30,
              'linkDistanceMultiplier': 15,
              'chargeDistance': 110
        } 
    );

    var options = {'structure': '((..((....)).(((....))).))',
                    'sequence': 'CGCUUCAUAUAAUCCUAAUGACCUAU'
    };
    container.addRNA(options.structure, options);
    return container;
};

var writeSVG = function() {
        var svg = document.getElementById('plotting-area');
        var svg_string = new XMLSerializer().serializeToString(svg);
        return svg_string;
};

page.open(url, function (status) {
    var container = page.evaluate(createForna);
    setTimeout(function() {
        //page.evaluate(function(){ container.clearNodes(); });
        console.log(page.evaluate(writeSVG));
        phantom.exit();
   }, 2500);
});

