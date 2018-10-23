var gitWrapper = require('./utils/git-wrapper');
var _ = require('lodash');


try {
    var gitPath = "/home/jankimodi/generatorTesting/git-test-content";
    gitWrapper.Status(gitPath).then(function (result) {
        console.log("Done" + JSON.stringify(result,null, '\t'));
    }, function (error) {
        console.log(error);
    });    
} catch (error) {
    console.log(error);
}


