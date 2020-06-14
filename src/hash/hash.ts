'use strict'
import * as _ from "lodash"

/**
 * 에러 enum 입니다.
 */
enum CoustomException {
    HA001 = '인원이 1명 크거나 10,000명 보다 작아야 합니다.',
    HA002 = '도착한 인원은 현재 마라톤 총 인원의 차이가 1이여야합니다.',
    HA003 = '알파벳 소문자만 가능합니다.',
}

/**
 * 헬퍼 클래스 입니다.
 */
class HashHelper {
    /**
     * 마라톤에 참여한 목록
     */
    participant: Array<string> = [];

    /**
     * 완주한 사람 목록
     */
    completion: Array<string> = [];

    /**
     * 생성자이다.
     * 
     * @param participant 마라톤에 참여한 목록
     * @param completion 완주한 사람 목록
     */
    constructor(participant: Array<string>, completion: Array<string>) {
        this.participant = participant;
        this.completion = completion;
    }

    /**
     * 조건에 맞는 검사를 실행 한다.
     */
    valid(): void {
        let regex = new RegExp(/([a-z])+/g);

        // 참가자 중에는 동명이인이 있을 수 있습니다. = 중복은 가능하다.
        // 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
        if(this.participant.length < 1 && this.completion.length > 10000) {
            throw CoustomException.HA001;
        }

        // completion의 길이는 participant의 길이보다 1 작습니다.
        if(this.participant.length -1 != this.completion.length) {
            throw CoustomException.HA002;
        }

        // 소문자 체크
        if(this.participant.filter(el => el.match(regex)) == null) {
            throw CoustomException.HA003;
        }
    }

    /**
     * 실패한 사람 목록을 돌려준다.
     */
    failRun(): string {
        this.valid();

        return this.participant.filter((el, idx) => el !== this.completion[idx])[0];
    }
}

/**
 * 이름을 생성한다.
 * 
 * @param len 길이
 */
function makeName(len: number) {
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLen = characters.length;

    for (let i = 0; i < len; i++) {
        this.participant.push(characters.charAt(Math.floor(Math.random() * charactersLen)));
    }
}

/**
 * 정답을 리턴한다.
 * 
 * @param participant 
 * @param completion 
 */
function solution(participant: Array<string>, completion: Array<string>) {
    let answer = '';
    const helper = new HashHelper(participant, completion);

    try {
        answer = helper.failRun();
    }
    catch(err) {
        alert(err);
    }

    return answer;
}

let participant: Array<string> = [];

makeName(1000);

console.log(participant.filter(el =>  el[_.random(1, participant.length)]));

/**
 * 답
 */
console.log(solution(participant, participant.filter(el =>  el[_.random(1, participant.length)]) ));