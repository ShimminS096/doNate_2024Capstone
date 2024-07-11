// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DonateTokenBank.sol";

contract TokenTransfer {
    DonateTokenBank private donateTokenBank;
    address private donateTokenBankAddress;

    constructor(DonateTokenBank _donateTokenBank) {
        donateTokenBank = _donateTokenBank;
        donateTokenBankAddress = address(_donateTokenBank);
    }

/*
    Function name: sendTokensFromDonate
    Summary: 토큰을 전송하는 함수 (DonateBank => donator)
    parameter: 총 2개 | address donator, uint256 amount
        donator; 기부자 주소
        amount; 전송할 토큰량
    Return: 성공 여부 변수
    Caller: 없음
    Date: 2024.07.11
    Write by: 심민서
*/
    function sendTokensFromDonate(address donator, uint256 amount) public returns (bool success){
        require(donateTokenBank.balances(msg.sender) >= amount);
        donateTokenBank.transfer(donator, amount);
        return true;
    }

/*
    Function name: sendTokensToDonatee
    Summary: 토큰을 전송하는 함수 (donator => donatee)
    parameter: 총 2개 | address donator, uint256 amount
        donatee; 수혜자 주소
        amount; 전송할 토큰량
    Return: 성공 여부 변수
    Caller: 없음
    Date: 2024.07.11
    Write by: 심민서
*/
    function sendTokensToDonatee(address donatee, uint256 amount) public returns (bool success){
        require(donateTokenBank.balances(msg.sender) >= amount);
        donateTokenBank.transfer(donatee, amount);
        return true;
    }

/*
    Function name: sendTokensToBank
    Summary: 토큰을 전송하는 함수 (donator => donatee)
    parameter: 총 1개 | address donator, uint256 amount
        donatee; 수혜자 주소
        amount; 전송할 토큰량
    Return: 성공 여부 변수
    Caller: 없음
    Date: 2024.07.11
    Write by: 심민서
*/
    function sendTokensToBank(uint256 amount) public returns (bool success){
        require(donateTokenBank.balances(msg.sender) >= amount);
        donateTokenBank.transfer(donateTokenBankAddress, amount);
        return true;
    }

}