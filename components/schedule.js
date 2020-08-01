"use strict";

var CronJob = require('cron').CronJob;

class ScheduleTimer {
    constructor() {
        this.schedules = []
    }

    add(setting) {
        this.schedules.push(
            new CronJob({
                cronTime: setting.timer,
                onTick: function () {
                    setting.runner();
                },
                start: true
            }));
        setting.runner()
    };

    stop() {
        this.schedules.forEach(function (element, index, array) {
            element.stop();
        });
    };
};

module.exports = ScheduleTimer;
