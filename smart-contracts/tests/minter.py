import smartpy as sp

FA2 = sp.io.import_script_from_url("file:contracts/fa2.py").Fa2
Minter = sp.io.import_script_from_url("file:contracts/minter.py").Minter


@sp.add_test(name = "minter", is_default = True)
def test():
    scenario = sp.test_scenario()
    scenario.add_flag("default_record_layout", "comb")
    scenario.h1("Tezotopia")
    scenario.table_of_contents()
    admin = sp.test_account("Administrator")
    manager1 = sp.test_account("Manager1")
    manager2 = sp.test_account("Manager2")
    user1 = sp.test_account("User1")
    user2 = sp.test_account("User2")
    
    scenario.h1("FA2 contract")
    fa2 = FA2(
        administrator = admin.address,
        metadata = sp.utils.metadata_of_url("ipfs://Qmfa2.."),
    )
    scenario += fa2
    
    scenario.h2("Minter")
    minter = Minter(
        fa2 = fa2.address,
        admin = admin.address,
        managers = sp.set([manager1.address]),
        metadata = sp.utils.metadata_of_url("ipfs://Qm1.")
    )
    scenario += minter
    
    scenario.h3("Set minter of NFT Registry")
    fa2.set_minter(minter.address).run(sender = admin)
    
    scenario.h3("Not admin or manager")
    minter.mint([sp.record(
        metadata = sp.utils.bytes_of_string("ipfs://Qm-1.."),
        rollno = "1",
        to_ = user1.address
    )]).run(sender=user1, valid=False, exception="NOT_ADMIN_OR_MANAGER")

    scenario.h3("Mint")
    minter.mint([sp.record(
        metadata = sp.utils.bytes_of_string("ipfs://Qm0.."),
        rollno = "1",
        to_ = user1.address
    )]).run(sender=manager1)

    scenario.verify(fa2.data.token_metadata[0].token_info[""] == sp.utils.bytes_of_string("ipfs://Qm0.."))

    scenario.verify(minter.data.managers.contains(manager1.address))
    scenario.verify( ~minter.data.managers.contains(manager2.address))

    scenario.h3("Add manager, Not admin")
    minter.add_manager(manager2.address).run(sender = manager1, valid=False, exception="NOT_ADMIN")

    scenario.h3("Add manager, Valid")
    minter.add_manager(manager2.address).run(sender = admin)

    scenario.verify(minter.data.managers.contains(manager2.address))

    scenario.h3("Mint")
    minter.mint([
        sp.record(
            metadata = sp.utils.bytes_of_string("ipfs://Qm1.."),
            rollno = "2",
            to_ = user1.address
        ),
        sp.record(
            metadata = sp.utils.bytes_of_string("ipfs://Qm2.."),
            rollno = "3",
            to_ = user2.address
        )
    ]).run(sender=manager2)

    scenario.show(fa2.data.token_metadata[1].token_info[""])
