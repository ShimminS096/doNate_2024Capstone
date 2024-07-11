// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonateTokenBank {
    mapping(address => uint256) public balances;
    uint256 public _initialSupply = 1000000;
    uint256 public totalSupply; // 토큰 총 발행량
    address public owner;

    constructor() {
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
        owner = msg.sender;
    }

/*
    Function name: additional_mint
    Summary: 토큰 추가 발행 함수
    parameter: 총 1개
        uint256 amount; 추가로 발행할 토큰량
    Return: 성공 여부 변수
    Caller: 없음
    Date: 2024.07.11
    Write by: 심민서
*/
    function additional_mint(uint256 amount) public returns (bool success) {
        require(msg.sender == owner, "Caller is not the owner");
        totalSupply += amount;
        return true;
    }

/*
    Function name: transfer
    Summary: 토큰 전송 함수
    parameter: 총 2개
        address recipient; 수신자 주소
        uint256 amount; 전송할 토큰량
    Return: 성공 여부 변수
    Caller: sendTokens()
    Date: 2024.07.11
    Write by: 심민서
*/
    function transfer(address recipient, uint256 amount) public returns (bool success) {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }
}
