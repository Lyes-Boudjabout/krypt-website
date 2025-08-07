// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import {Script} from "forge-std/Script.sol";
import {KryptTransfer} from "../src/KryptTransfer.sol";

contract DeployKryptTransfer is Script {
    KryptTransfer kryptTransfer;

    function run() public returns (KryptTransfer) {
        vm.startBroadcast();
        kryptTransfer = new KryptTransfer();
        vm.stopBroadcast();
        return kryptTransfer;
    }
}
