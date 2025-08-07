// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract KryptTransfer {
    error KryptTransfer__ReceiverAddressCantBeZero();
    error KryptTransfer__TransferAmountCantBeZero();
    error KryptTransfer__TransferFailed();

    event EthTransfer(address indexed from, address indexed to, uint256 amount);

    function transferEth(address payable _to, string memory message) public payable {
        if (_to == address(0)) {
            revert KryptTransfer__ReceiverAddressCantBeZero();
        }
        if (msg.value == 0) {
            revert KryptTransfer__TransferAmountCantBeZero();
        }
        (bool success,) = _to.call{value: msg.value}(bytes(message));
        if (!success) {
            revert KryptTransfer__TransferFailed();
        }
        emit EthTransfer(address(msg.sender), _to, msg.value);
    }
}
