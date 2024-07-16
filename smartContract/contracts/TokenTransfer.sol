// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DonateTokenBank.sol";

contract TokenTransfer {
    DonateTokenBank private donate_token_bank;  // Smart Contract 주소
    address public donate_token_bank_address;   // 토큰을 가진 Donate 계좌 주소
    bool[3] private isTransferSuccessful;    // 각 단계의 토큰 전송 성공 여부 리스트
    address[] private _admin_list;  // Transfer 권한 가진 주소 리스트

    constructor(DonateTokenBank _donate_token_bank) {
        isTransferSuccessful = [false, false, false];
        donate_token_bank = DonateTokenBank(_donate_token_bank);
        donate_token_bank_address = _donate_token_bank.owner();
        _admin_list = donate_token_bank.getAdminArray();
    }

/*
    Function name: TransferTrigger
    Summary: 토큰 전송 총괄 함수. 차례로 세 개의 토큰 전송 함수를 호출함.
    parameter: 총 3개
        address donator; 기부자 주소
        address beneficiary; 수혜자 주소
        uint256 amount; 전송할 토큰량
    Return: 성공 여부 변수
    Caller: 없음
    Date: 2024.07.13
    Write by: 심민서
*/
    function TransferTrigger(address donator, address beneficiary, uint256 amount) public returns (bool success){
        sendTokensToDonator(donator, amount);
        sendTokensToBenificiary(donator, beneficiary, amount);
        sendTokensToDonateBank(beneficiary, amount);
        return isTransferSuccessful[2];
    }

/*
    Function name: sendTokensToDonator
    Summary: 토큰 전송 함수 (DonateTokenBank => donator)
    parameter: 총 2개
        address donator; 기부자 주소
        uint256 amount; 전송할 토큰량
    Return: 없음
    Caller: TransferTrigger
    Date: 2024.07.13
    Write by: 심민서
*/
    function sendTokensToDonator(address donator, uint256 amount) public {
        require(isAdmin(msg.sender), "Caller is not the admin");
        donate_token_bank.transfer(donate_token_bank_address, donator, amount);
        isTransferSuccessful[0] = true;
    }

/*
    Function name: sendTokensTobenificiary
    Summary: 토큰 전송 함수 (donator => beneficiary)
    parameter: 총 3개
        address donator; 기부자 주소
        address benificiary; 수혜자 주소
        uint256 amount; 전송할 토큰량
    Return: 없음
    Caller: TransferTrigger
    Date: 2024.07.13
    Write by: 심민서
*/
    function sendTokensToBenificiary(address donator, address beneficiary, uint256 amount) public {
        require(isTransferSuccessful[0], "Donor did not receive tokens.");
        donate_token_bank.transfer(donator, beneficiary, amount);
        isTransferSuccessful[1] = true;
    }

/*
    Function name: sendTokensToDonate
    Summary: 토큰 전송 함수 (beneficiary => DonateBank)
    parameter: 총 2개
        address beneficiary; 수혜자 주소
        uint256 amount; 전송할 토큰량
    Return: 없음
    Caller: TransferTrigger
    Date: 2024.07.13
    Write by: 심민서
*/
    function sendTokensToDonateBank(address beneficiary, uint256 amount) public {
        require(isTransferSuccessful[1], "beneficiary did not receive tokens.");
        donate_token_bank.transfer(beneficiary, donate_token_bank_address, amount);
        isTransferSuccessful[2] = true;
    }


/*
    Function name: isAdmin
    Summary: 호출자가 admin에 속하는지 검증하는 함수
    parameter: 총 1개
        address element; 검증할 호출자
    Return: 없음
    Caller: sendTokensToDonator
    Date: 2024.07.16
    Write by: 조현지
*/
    function isAdmin(address element) private view returns (bool) {
        for (uint i = 0; i < _admin_list.length; i++) {
            if (_admin_list[i] == element) {
                return true;
            }
        }
        return false;
    }

}