// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import {Test} from "forge-std/Test.sol";
import {KryptTransfer} from "../src/KryptTransfer.sol";
import {DeployKryptTransfer} from "../script/DeployKryptTransfer.s.sol";

contract KryptTransferTest is Test {
    KryptTransfer public kryptTransfer;
    DeployKryptTransfer public deployKryptTransfer;
    address user1;
    address user2;

    function setUp() external {
        deployKryptTransfer = new DeployKryptTransfer();
        kryptTransfer = deployKryptTransfer.run();
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }

    function testTransferProcess() public {
        uint256 initialBalances = payable(user1).balance + payable(user2).balance;
        vm.prank(user1);
        kryptTransfer.transferEth{value: 1 ether}(payable(user2), "Hello");
        uint256 finalBalances = payable(user1).balance + payable(user2).balance;
        assertEq(initialBalances, finalBalances);
    }
}
