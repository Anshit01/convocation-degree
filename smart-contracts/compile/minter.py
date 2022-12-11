import smartpy as sp

Minter = sp.io.import_script_from_url("file:contracts/minter.py").Minter

sp.add_compilation_target(
    "minter",
    Minter(
        admin = sp.address("tz1fbKDvLgwjnuXDcVDUW8JdPTAsna5VhvKD"),
        fa2 = sp.address("KT1Aa9amSPeHNN24A83hyuhb49gtTN2JP6vm"),
        managers = sp.set([
            sp.address("tz1fbKDvLgwjnuXDcVDUW8JdPTAsna5VhvKD"),
            sp.address("tz1VPZyh4ZHjDDpgvznqQQXUCLcV7g91WGMz"),
            sp.address("tz1f85LjxaHfWfPuNtZFg1aVBiaAkVnVnKsH"),
        ]),
        metadata = sp.utils.metadata_of_url("ipfs://Qm..."),
    ),
    flags = [["default_record_layout", "comb"]]
)
