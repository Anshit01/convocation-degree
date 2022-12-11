import smartpy as sp
from os import environ

Fa2 = sp.io.import_script_from_url("file:contracts/fa2.py").Fa2

NETWORK = environ['NETWORK']

metadata = sp.utils.metadata_of_url("ipfs://Qm...")

if NETWORK == "mainnet":
    admin = sp.address("tz1fbKDvLgwjnuXDcVDUW8JdPTAsna5VhvKD")
else:
    admin = sp.address("tz1fbKDvLgwjnuXDcVDUW8JdPTAsna5VhvKD")

sp.add_compilation_target(
    "fa2",
    Fa2(
        administrator = admin,
        metadata = metadata,
    ),
    flags = [["default_record_layout", "comb"]]
)
