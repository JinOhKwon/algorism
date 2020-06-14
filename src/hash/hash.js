'use strict';
exports.__esModule = true;
var _ = require("lodash");
/**
 * 에러 enum 입니다.
 */
var CoustomException;
(function (CoustomException) {
    CoustomException["HA001"] = "\uC778\uC6D0\uC774 1\uBA85 \uD06C\uAC70\uB098 10,000\uBA85 \uBCF4\uB2E4 \uC791\uC544\uC57C \uD569\uB2C8\uB2E4.";
    CoustomException["HA002"] = "\uB3C4\uCC29\uD55C \uC778\uC6D0\uC740 \uD604\uC7AC \uB9C8\uB77C\uD1A4 \uCD1D \uC778\uC6D0\uC758 \uCC28\uC774\uAC00 1\uC774\uC5EC\uC57C\uD569\uB2C8\uB2E4.";
    CoustomException["HA003"] = "\uC54C\uD30C\uBCB3 \uC18C\uBB38\uC790\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4.";
})(CoustomException || (CoustomException = {}));
/**
 * 헬퍼 클래스 입니다.
 */
var HashHelper = /** @class */ (function () {
    /**
     * 생성자이다.
     *
     * @param participant 마라톤에 참여한 목록
     * @param completion 완주한 사람 목록
     */
    function HashHelper(participant, completion) {
        /**
         * 마라톤에 참여한 목록
         */
        this.participant = [];
        /**
         * 완주한 사람 목록
         */
        this.completion = [];
        this.participant = participant;
        this.completion = completion;
    }
    /**
     * 조건에 맞는 검사를 실행 한다.
     */
    HashHelper.prototype.valid = function () {
        var regex = new RegExp(/([a-z])+/g);
        // 참가자 중에는 동명이인이 있을 수 있습니다. = 중복은 가능하다.
        // 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
        if (this.participant.length < 1 && this.completion.length > 10000) {
            throw CoustomException.HA001;
        }
        // completion의 길이는 participant의 길이보다 1 작습니다.
        if (this.participant.length - 1 != this.completion.length) {
            throw CoustomException.HA002;
        }
        // 소문자 체크
        if (this.participant.filter(function (el) { return el.match(regex); }) == null) {
            throw CoustomException.HA003;
        }
    };
    /**
     * 실패한 사람 목록을 돌려준다.
     */
    HashHelper.prototype.failRun = function () {
        var _this = this;
        this.valid();
        return this.participant.filter(function (el, idx) { return el !== _this.completion[idx]; })[0];
    };
    return HashHelper;
}());
/**
 * 이름을 생성한다.
 *
 * @param len 길이
 */
function makeName(len) {
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLen = characters.length;
    for (var i = 0; i < len; i++) {
        this.participant.push(characters.charAt(Math.floor(Math.random() * charactersLen)));
    }
}
/**
 * 정답을 리턴한다.
 *
 * @param participant
 * @param completion
 */
function solution(participant, completion) {
    var answer = '';
    var helper = new HashHelper(participant, completion);
    try {
        answer = helper.failRun();
    }
    catch (err) {
        alert(err);
    }
    return answer;
}
var participant = [];
makeName(1000);
console.log(participant.filter(function (el) { return el[_.random(1, participant.length)]; }));
/**
 * 답
 */
console.log(solution(participant, participant.filter(function (el) { return el[_.random(1, participant.length)]; })));
