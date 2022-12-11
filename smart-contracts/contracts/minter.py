import smartpy as sp

## ## Minter Contract
##
## Responsible for minting all the tokens in the FA2.
## Only this has access to the mint entry point of FA2.
## Its goal is to keep minting logic and permissions separate from core FA2 contract

MintType = sp.TList(sp.TRecord(
    metadata = sp.TMap(sp.TString, sp.TBytes),
    rollno = sp.TString,
    to_ = sp.TAddress,
))

class Minter(sp.Contract):
    def __init__(self, fa2, admin, managers, metadata):
        self.init(
            fa2 = fa2,
            admin = admin,
            managers = managers,
            paused = False,
            metadata = metadata,
        )
    
    # Administrator and managers management
    def is_admin(self, sender):
        return sender == self.data.admin
    
    def is_paused(self):
        return self.data.paused
    

    @sp.entry_point
    def set_admin(self, params):
        sp.set_type(params, sp.TAddress)
        sp.verify(self.is_admin(sp.sender), message = "NOT_ADMIN")
        self.data.admin = params

    @sp.entry_point
    def set_pause(self, params):
        sp.set_type(params, sp.TBool)
        sp.verify(self.is_admin(sp.sender), message = "NOT_ADMIN")
        self.data.paused = params

    @sp.entry_point
    def add_manager(self, params):
        sp.set_type(params, sp.TAddress)
        sp.verify(self.is_admin(sp.sender), message = "NOT_ADMIN")
        self.data.managers.add(params)
    
    @sp.entry_point
    def remove_manager(self, params):
        sp.set_type(params, sp.TAddress)
        sp.verify(self.is_admin(sp.sender), message = "NOT_ADMIN")
        self.data.managers.remove(params)
    
        
    @sp.entry_point
    def mint(self, params):
        sp.set_type(params, sp.TList(sp.TRecord(
            to_ = sp.TAddress,
            rollno = sp.TString,
            metadata = sp.TBytes,
        )))

        sp.verify(
            self.is_admin(sp.sender) |
            self.data.managers.contains(sp.sender),
            message = "NOT_ADMIN_OR_MANAGER"
        )
        
        contract = sp.contract(MintType, self.data.fa2, "mint").open_some()
        payload = sp.local("payload", [])

        with sp.for_("nft", params) as nft:
            payload.value.push(sp.record(
                metadata = {"": nft.metadata},
                rollno = nft.rollno,
                to_ = nft.to_,
            ))
        sp.transfer(payload.value, sp.mutez(0), contract)
