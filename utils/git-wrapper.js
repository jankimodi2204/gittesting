const config = require('../config');
const _ = require('lodash');
const git = require('simple-git');
const q = require('q');
const logger = require('./logger');


/**
 * This function will get latest content from repository
 * @param path
 *          Directory path for content update.
 */


/*     let USER = config.get('git.username');
    let PASS = config.get('git.password');
    let REPO = 'https://gitlabbeta.dynamic1001.com/users/sign_in//';
    let remote = `https://gitlabbeta.dynamic1001.com/users/sign_in//${USER}:${PASS}@${REPO}`;
 */

var _getUpdate = function (path) {
    q.Promise(function (resolve, reject) {
        var option = {
            "username": config.get('git.username'),
            "password": config.get('git.password'),
            "accept": "working"
        };
        if (!_.isUndefined(path)) {
            git(path).pull(remote, branch, option, (error, result) => {
                if (!_.isUndefined(error) && error !== null) {
                    reject(error);
                }
                if (!_.isUndefined(result) && result !== null) {
                    resolve(result);
                }
            })
        } else {
            reject();
        }
    });
}

var _Commit = function (path) {
    q.Promise(function (resolve, reject) {
        logger.info('_Commit path : ' + path);
        var option = {
            "username": config.get('git.username'),
            "password": config.get('git.password'),
            "m": "Commit from code generate scheduler"
        };
        if (!_.isUndefined(path)) {
            git(path).commit("Commited for code generator scheduler", option, function (error, result) {
                if (error !== null) {
                    console.log(error);
                    reject(error)
                }
                if (result !== null) {
                    console.log(result);
                    resolve(result);
                }
            });
        } else {
            reject();
        }
    });
}

var _clean = function (path) {
    q.Promise(function (resolve, reject) {
        logger.info('clean the repositery');
        var option = {
            "username": config.get('git.username'),
            "password": config.get('git.password')
        };
        if (!_.isUndefined(path)) {
            git(path).clean('n', option, function (error, result) {
                if (!_.isUndefined(error) && error !== null) {
                    reject(error);
                }
                if (!_.isUndefined(result) && result !== null) {
                    console.log("clean the repositery successfully");
                    resolve(result);
                }
            });
        } else {
            reject();
        }
    });
}

module.exports = {
    getUpdate: _getUpdate,
    Commit: _Commit,
    Clean: _clean
};