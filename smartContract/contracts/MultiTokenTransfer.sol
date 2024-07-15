// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DonateTokenBank.sol";

contract MultiTokenTransfer {
    DonateTokenBank private donate_token_bank;  // Smart Contract 주소
    address public donate_token_bank_address;   // 토큰을 가진 Donate 계좌 주소
    bool private isInitTransferSuccessful;  // 토큰 전송 성공 여부 (DonateTokenBank => donator)
    address[] private reverted_list_1;  // 토큰 전송 실패 수혜자 리스트 (donator => beneficiary_list)
    address[] private reverted_list_2;  // 토큰 회수 실패 수혜자 리스트 (beneficiary_list => DonateTokenBank)

    constructor(DonateTokenBank _donate_token_bank) {
        isInitTransferSuccessful = false;
        donate_token_bank = _donate_token_bank;
        donate_token_bank_address = _donate_token_bank.owner();
    }

/*
    Function name: MultiTransferTrigger
    Summary: 토큰 전송 총괄 함수. 차례로 세 개의 토큰 전송 함수를 호출함.
    parameter: 총 3개
        address donator; 기부자 주소
        address[] beneficiary_list; 수혜자 주소 리스트
        uint256 divided_amount; 전송할 동등 분할된 토큰량
    Return: 성공 여부 변수
    Caller: 없음
    Date: 2024.07.15
    Write by: 심민서
*/
    function MultiTransferTrigger(address donator,  address[] memory beneficiary_list, uint256 divided_amount) public returns (bool success){
        uint256 amount = divided_amount * beneficiary_list.length;  // 기부 총액

        sendTokensToDonator(donator, amount);
        sendBatchTokensToBenificiary(donator, beneficiary_list, divided_amount);
        sendBatchTokensToDonateBank(beneficiary_list, divided_amount);

        success = (reverted_list_1.length == 0) && (reverted_list_2.length == 0);
        return success;
    }

/*
    Function name: sendTokensToDonator
    Summary: 토큰 전송 함수 (DonateTokenBank => donator)
    parameter: 총 2개
        address donator; 기부자 주소
        uint256 amount; 전송할 토큰량
    Return: 없음
    Caller: MultiTransferTrigger
    Date: 2024.07.15
    Write by: 심민서
*/
    function sendTokensToDonator(address donator, uint256 amount) public {
        donate_token_bank.transfer(donate_token_bank_address, donator, amount);
        isInitTransferSuccessful = true;
    }

/*
    Function name: sendBatchTokensToBenificiary
    Summary: 토큰 일괄 전송 함수 (donator => beneficiary_list)
    parameter: 총 3개
        address donator; 기부자 주소
        address[] beneficiary_list; 수혜자 주소 리스트
        uint256 amount; 전송할 토큰량
    Return: 없음
    Caller: MultiTransferTrigger
    Date: 2024.07.15
    Write by: 심민서
*/
    function sendBatchTokensToBenificiary(address donator, address[] memory beneficiary_list, uint256 divided_amount) public {
        require(isInitTransferSuccessful, "Donor did not received the token.");
        for (uint256 i = 0; i < beneficiary_list.length; i++) {
            try donate_token_bank.transfer(donator, beneficiary_list[i], divided_amount){
            } catch {
                reverted_list_1.push(beneficiary_list[i]);
                remove(beneficiary_list, i);
            }
        }
    }

/*
    Function name: sendBatchTokensToDonateBank
    Summary: 토큰 일괄 전송 함수 (beneficiary_list => DonateBank)
    parameter: 총 3개
        address donator; 기부자 주소
        address[] beneficiary_list; 수혜자 주소 리스트
        uint256 divided_amount; 전송할 동등 분할된 토큰량
    Return: 없음
    Caller: MultiTransferTrigger
    Date: 2024.07.15
    Write by: 심민서
*/
    function sendBatchTokensToDonateBank(address[] memory beneficiary_list, uint256 divided_amount) public {
        require(beneficiary_list.length != 0, "none of the beneficiaries received the token.");
        for (uint256 i = 0; i < beneficiary_list.length; i++) {
            try donate_token_bank.transfer(beneficiary_list[i], msg.sender, divided_amount) {
            } catch {
                reverted_list_2.push(beneficiary_list[i]);
                remove(beneficiary_list, i);
            }
        }
    }
    
/*
    Function name: remove
    Summary: 배열의 원소를 index로 삭제 (얕은 복사)
    parameter: 총 2개
        address[] array; 원소 삭제할 배열
        uint index; 삭제할 원소의 index
    Return: 없음
    Caller: sendBatchTokensToBenificiary, sendBatchTokensToDonateBank
    Date: 2024.07.15
    Write by: 심민서
*/
    function remove(address[] memory array, uint index) private {
        require(index < array.length, "Index out of bounds");
        array[index] = array[array.length - 1];
        assembly {
            mstore(array, sub(mload(array), 1))
        }
    }
}