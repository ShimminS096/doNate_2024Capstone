// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonateTokenBank {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 public _initialSupply = 1000000;
    uint256 public totalSupply; // 토큰 총 발행량
    address public owner = msg.sender;
    address[] private admin_list = [
        owner,
        0x51c15f3527891f3c64E05cafaF7656d85a8b85Fc,
        0x3BF5FB83f7A8b00C42Ad499FF6737774d9e08AF7
    ];

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        totalSupply = _initialSupply;
        balances[owner] = _initialSupply;
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
    function additionalMint(uint256 amount) public returns (bool success) {
        require(isAdmin(msg.sender), "Caller is not the admin");
        totalSupply += amount;
        balances[owner] += amount;
        return true;
    }

/*
    Function name: transfer
    Summary: 토큰 전송 함수 (remitter => recipient)
    parameter: 총 3개
        address remitter; 송신자 주소
        address recipient; 수신자 주소
        uint256 amount; 전송할 토큰량
    Return: 성공 여부 변수
    Caller: 없음
    Date: 2024.07.11
    Write by: 심민서
*/
    function transfer(address remitter, address recipient, uint256 amount) public returns (bool success) { 
        if (remitter == owner && balances[remitter] < amount) {
            totalSupply += amount;
            balances[owner] += amount;
        }
        require(balances[remitter] >= amount, "Insufficient tokens");
        balances[remitter] -= amount;
        balances[recipient] += amount;
        
        emit Transfer(remitter, recipient, amount);
        return true;
    }

/*
    Function name: burn
    Summary: 토큰 소각 함수
    parameter: 총 1개
        address to; 소각할 토큰의 소유자 주소
        uint amount; 소각할 토큰량
    Return: 없음
    Caller: 없음
    Date: 2024.07.20
    Write by: 심민서
*/
    function burn(address to, uint amount) public {
        require(isAdmin(msg.sender), "Caller is not the admin");
        balances[to] -= amount;
        totalSupply -= amount;
    }

    /*--------------------------------------------------------------- Admin 관리용 함수 ---------------------------------------------------------------*/

    function getAdminArray() external view returns (address[] memory) {
        return admin_list;
    }
/*
    Function name: addAdmin
    Summary: Smart Contract 실행 권한 부여 함수
    parameter: 총 1개
        address newAdmin; 권한 부여할 주소
    Return: 없음
    Caller: 없음
    Date: 2024.07.20
    Write by: 심민서
*/
    function addAdmin(address newAdmin) public {
        require(isAdmin(msg.sender), "Caller is not the admin");
        require(newAdmin != address(0), "Invalid address");
        admin_list.push(newAdmin);
    }

/*
    Function name: removeAdmin
    Summary: Smart Contract 실행 권한 박탈 함수, 계약의 owner 권한은 박탈할 수 없음.
    parameter: 총 1개
        address newAdmin; 권한 박탈할 주소
    Return: 없음
    Caller: 없음
    Date: 2024.07.20
    Write by: 심민서
*/
    function removeAdmin(address admin) public {
        require(isAdmin(msg.sender), "Caller is not the admin");
        require(admin != address(0), "Invalid address");
        for (uint i = 0; i < admin_list.length; i++) {
            if (admin_list[i] == admin && owner != admin) {
                admin_list[i] = admin_list[admin_list.length - 1];
                admin_list.pop();
                break;
            }
        }
    }

/*
    Function name: isAdmin
    Summary: 호출자가 admin에 속하는지 검증하는 함수
    parameter: 총 1개
        address element; 검증할 호출자
    Return: 없음
    Caller: additionalMint, burn, addAdmin, removeAdmin
    Date: 2024.07.20
    Write by: 심민서
*/
    function isAdmin(address element) private view returns (bool) {
        for (uint i = 0; i < admin_list.length; i++) {
            if (admin_list[i] == element) {
                return true;
            }
        }
        return false;
    }

    /*--------------------------------------------------------------- ERC20 형식 충족용 함수 ---------------------------------------------------------------*/

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function allowance(address _owner, address spender) external view returns (uint256) {
        return _allowances[_owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
}