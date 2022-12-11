#!/usr/bin/env python3
import os
import time
from sys import argv
from enum import Enum
import subprocess
import dotenv

RPC = {
    "mainnet": "https://mainnet.smartpy.io",
    "testnet": "https://ghostnet.smartpy.io",
}

class Commands(str, Enum):
    TEST = "test"
    COMPILE = "compile"
    ORIGINATE = "originate"

class Networks(str, Enum):
    MAINNET = "mainnet"
    TESTNET = "testnet"

COMMANDS = [item.value for item in list(Commands)]

dotenv.load_dotenv()
# dotenv.load_dotenv(".key")

start_time = time.time()


def getAllContracts():
    return [file[:-3] for file in os.listdir("contracts/") if file[-3:] == ".py"]


def separate_options(args: list[str]):
    options = []
    params = []
    for arg in args:
        if arg.startswith("--"):
            options.append(arg[2:])
        else:
            params.append(arg)
    return [params, options]


def parse_network_from_options(options: list[str]):
    for option in options:
        if option.startswith("network="):
            network = option[8:]
            valid_networks = [Networks.MAINNET, Networks.TESTNET]
            if network not in valid_networks:
                print(f"{network} is an invalid network. Valid networks are: {', '.join(valid_networks)}")
                exit(1)
            return network
    return Networks.TESTNET


def test(contracts, options):
    for contract in contracts:
        filename = f"tests/{contract}.py"
        if not os.path.isfile(filename):
            print(f"Test for {contract} does not exist")
            exit(1)

    if len(contracts) == 0:
        contracts = getAllContracts()

    for contract in contracts:
        print(f"🛠️ Testing {contract}...")
        filename = f"tests/{contract}.py"
        subprocess.Popen(f"~/smartpy-cli/SmartPy.sh test {filename} .test/ --html", shell=True).wait(timeout=60)
    
    print(f"Done👍 Process completed in {round(time.time() - start_time, 5)}s")


def compile(contracts, options):
    for contract in contracts:
        filename = f"compile/{contract}.py"
        if not os.path.isfile(filename):
            print(f"Compilation target for {contract} doesn't exist")
            exit(1)
    
    if len(contracts) == 0:
        contracts = getAllContracts()

    network = parse_network_from_options(options)
    for contract in contracts:
        print(f"💡Compiling {contract} for {network}...")
        filename = f"compile/{contract}.py"
        subprocess.Popen(f"NETWORK={network} ~/smartpy-cli/SmartPy.sh compile {filename} .compile/ --html", shell=True).wait(timeout=60)

    print(f"Done👍 Process completed in {round(time.time() - start_time, 5)}s")


def originate(params, options):
    contract = params[0]
    network = parse_network_from_options(options)
    is_compile = "--skip-compile" not in options

    rpc = RPC[network]

    if is_compile:
        compile([contract], [op for op in options if op.startswith("network")])

    print(f"🚀 Originating {contract} to {network}...")
    key = ""
    is_key = "--key" in options
    if is_key:
        print("Using custom key")
        key = f"--private-key {os.environ['MAINNET_KEY']}"
    else:
        print("Using default key")
    
    compile_path = f".compile/{contract}"
    process = subprocess.Popen(f"~/smartpy-cli/SmartPy.sh originate-contract --code {compile_path}/*contract.tz --storage {compile_path}/*storage.tz --rpc {rpc} {key}", shell=True)
    process.wait()
    print(f"Deployed {contract} 🎉")


command = argv[1]
args = argv[2:]
[params, options] = separate_options(args)

if command == Commands.TEST:
    test(params, options)
elif command == Commands.COMPILE:
    compile(params, options)
elif command == Commands.ORIGINATE:
    originate(params, options)
elif command == Commands.ci.value:
    contracts = getAllContracts()
    test(contracts, options)
    compile(contracts, options)
else:
    print(f"{command} is not a valid command")
    print("Valid commands are:", *COMMANDS)
    exit(1)
