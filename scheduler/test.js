var gitWrapper = require('../utils/git-wrapper');
var _ = require('lodash');


try {
    var gitPath = '/home/jankimodi/generatorTesting/gittesting';
    gitWrapper.getUpdate(gitPath).then((result) => {
        console.log("Done" + JSON.stringify(result, null, '\t'));
    }, (error) => {
        console.log(error);
    });
} catch (error) {
    console.log(error);
}

