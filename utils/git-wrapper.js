const config = require('../config');
const _ = require('lodash');
var GIT = require('simple-git');
const q = require('q');
const logger = require('./logger');


/**
 * This function will get latest content from repository
 * @param path
 *          Directory path for content update.
 */

const _getUpdate = function (gitPath) {
    return new Promise((resolve, reject) => {
        var gitObj = GIT(gitPath);
        console.log(gitObj);
        var option = {
            username: config.get('git.username'),
            password: config.get('git.password')
        };
        if (!_.isUndefined(gitPath)) {
            gitObj.pull('origin', 'master', option, (error, result) => {
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

const _Commit = function (path) {
    return new Promise((resolve, reject) => {
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

const _clean = function (path) {
    return new Promise((resolve, reject) => {
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

const _status = (gitPath) => {
    return new Promise((resolve, reject) => {
        let gitObj = GIT(gitPath);
        gitObj.status((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getUpdate: _getUpdate,
    Commit: _Commit,
    Clean: _clean,
    Status: __status
};