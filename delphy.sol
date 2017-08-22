pragma solidity ^0.4.11;

library Math {
    /// @dev Returns whether an add operation causes an overflow
    /// @param a First addend
    /// @param b Second addend
    /// @return Did no overflow occur?
    function safeToAdd(uint a, uint b)
    public
    constant
    returns (bool)
    {
        return a + b >= a;
    }

    /// @dev Returns whether a subtraction operation causes an underflow
    /// @param a Minuend
    /// @param b Subtrahend
    /// @return Did no underflow occur?
    function safeToSub(uint a, uint b)
    public
    constant
    returns (bool)
    {
        return a >= b;
    }

    /// @dev Returns whether a multiply operation causes an overflow
    /// @param a First factor
    /// @param b Second factor
    /// @return Did no overflow occur?
    function safeToMul(uint a, uint b)
    public
    constant
    returns (bool)
    {
        return b == 0 || a * b / b == a;
    }

    /// @dev Returns sum if no overflow occurred
    /// @param a First addend
    /// @param b Second addend
    /// @return Sum
    function add(uint a, uint b)
    public
    constant
    returns (uint)
    {
        require(safeToAdd(a, b));
        return a + b;
    }

    /// @dev Returns difference if no overflow occurred
    /// @param a Minuend
    /// @param b Subtrahend
    /// @return Difference
    function sub(uint a, uint b)
    public
    constant
    returns (uint)
    {
        require(safeToSub(a, b));
        return a - b;
    }

    /// @dev Returns product if no overflow occurred
    /// @param a First factor
    /// @param b Second factor
    /// @return Product
    function mul(uint a, uint b)
    public
    constant
    returns (uint)
    {
        require(safeToMul(a, b));
        return a * b;
    }
}

contract Owned {
    /*
     *  Storage
     */
    address public owner;
    address public newOwner;

    /*
     *  Modifiers
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /*
     *  Public functions
     */
    /// @notice The Constructor assigns the message sender to be `owner`
    function Owned() {
        owner = msg.sender;
    }

    /// @notice `owner` can step down and assign some other address to this role
    /// @param _newOwner The address of the new owner. 0x0 can be used to create
    ///  an unowned neutral vault, however that cannot be undone
    function changeOwner(address _newOwner) onlyOwner {
        newOwner = _newOwner;
    }


    /// @dev if msg.sender is newOwner, then the owner become the newOwner
    function acceptOwnership() {
        if (msg.sender == newOwner) {
            owner = newOwner;
        }
    }
}
/// @title Abstract token contract - Functions to be implemented by token contracts
contract Token {

    /*
     *  Events
     */
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    /*
     *  Public functions
     */
    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint _value) public returns (bool);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint _value) public returns (bool);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint _value) public returns (bool);

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public constant returns (uint);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public constant returns (uint);

    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// total amount of tokens
    uint256 public totalSupply;
}
contract StandardToken is Token {
    using Math for *;

    /*
     *  Storage
     */
    mapping (address => uint) balances;
    mapping (address => mapping (address => uint)) allowances;

    /*
     *  Public functions
     */
    /// @dev Transfers sender's tokens to a given address. Returns success
    /// @param to Address of token receiver
    /// @param value Number of tokens to transfer
    /// @return Was transfer successful?
    function transfer(address to, uint value)
    public
    returns (bool)
    {
        if (!balances[msg.sender].safeToSub(value)
        || !balances[to].safeToAdd(value))
        return false;
        balances[msg.sender] -= value;
        balances[to] += value;
        Transfer(msg.sender, to, value);
        return true;
    }

    /// @dev Allows allowed third party to transfer tokens from one address to another. Returns success
    /// @param from Address from where tokens are withdrawn
    /// @param to Address to where tokens are sent
    /// @param value Number of tokens to transfer
    /// @return Was transfer successful?
    function transferFrom(address from, address to, uint value)
    public
    returns (bool)
    {
        if (   !balances[from].safeToSub(value)
        || !allowances[from][msg.sender].safeToSub(value)
        || !balances[to].safeToAdd(value))
        return false;
        balances[from] -= value;
        allowances[from][msg.sender] -= value;
        balances[to] += value;
        Transfer(from, to, value);
        return true;
    }

    /// @dev Sets approved amount of tokens for spender. Returns success
    /// @param spender Address of allowed account
    /// @param value Number of approved tokens
    /// @return Was approval successful?
    function approve(address spender, uint value)
    public
    returns (bool)
    {
        allowances[msg.sender][spender] = value;
        Approval(msg.sender, spender, value);
        return true;
    }

    /// @dev Returns number of allowed tokens for given address
    /// @param owner Address of token owner
    /// @param spender Address of token spender
    /// @return Remaining allowance for spender
    function allowance(address owner, address spender)
    public
    constant
    returns (uint)
    {
        return allowances[owner][spender];
    }

    /// @dev Returns number of tokens owned by given address
    /// @param owner Address of token owner
    /// @return Balance of owner
    function balanceOf(address owner)
    public
    constant
    returns (uint)
    {
        return balances[owner];
    }
}

contract DelphyToken is StandardToken {
    /*
     *  Constants
     */

    string constant public name = "Delphy Token";
    string constant public symbol = "DPY";
    uint8 constant public decimals = 18;

    /// Delphy token total supply
    uint public constant TOTAL_TOKENS = 100000000 * 10**18; // 1e


    /*
     *  Public functions
     */

    /// @dev Initialization of the Delphy Token contract
    /// @param owners is the addresses of Delphy token distribution
    /// @param tokens is the token number of Delphy token distribution
    function DelphyToken(address[] owners, uint[] tokens)
    public
    {
        totalSupply = 0;

        for (uint i=0; i<owners.length; i++) {
            require (owners[i] != 0);

            balances[owners[i]] += tokens[i];
            Transfer(0, owners[i], tokens[i]);
            totalSupply += tokens[i];
        }

        require (totalSupply == TOTAL_TOKENS);
    }
}

contract DelphyICO is Owned {
    using Math for uint;

    /*
     *  Events
     */

    event NewSale(address indexed destAddress, uint ethCost, uint gotTokens);

    /*
     *  Constants
     */

    /// - Delphy token distribution
    ///
    /// -        bonus (post-sail in 24 months)         -       public sail       -pre-ico- dev team   -foundation-
    /// -                       50%                     -        (18 + 8)%        -   5%  -    10%     -    9%    -
    ///
    uint public constant TOTAL_TOKENS = 100000000 * 10**18; // 1e
    uint public constant TOTAL_TOKENS_PERCENT = 1000000 * 10**18; // 1e / 100
    uint public constant ICO_DURATION = 5 days;

    /// bonus coin distribution 50%
    address public BONUS_HOLDER = 0xad854341e7989F5542189bB52265337E2993B7bc;
    uint public constant BONUS_TOKENS = TOTAL_TOKENS_PERCENT * 50;

    /// first round ICO: 18%
    address public constant PUBLIC_FIRST_HOLDER = 0x431Cf2c7310d15Ec9316510dAF6BbC48557ecB2C;
    uint public constant PUBLIC_FIRST_TOKENS = TOTAL_TOKENS_PERCENT * 18;

    /// second round ICO: 8%
    /// address public constant PUBLIC_SECOND_HOLDER = 0x4a75c0bD3e9B71A99fC9A5CAA92fcdb9Bc62a374;
    uint public constant PUBLIC_SECOND_TOKENS = TOTAL_TOKENS_PERCENT / 10 * 25;

    address public constant PUBLIC_SECOND_PRESOLD_HOLDER = 0x4a75c0bD3e9B71A99fC9A5CAA92fcdb9Bc62a374;
    uint public constant PUBLIC_SECOND_PRESOLD_TOKENS = TOTAL_TOKENS_PERCENT / 10 * 55;

    /// pre-ico 5%
    address public constant PRE_ICO_HOLDER = 0x32d192A05030F3Cf34DDb017b1306fB0E1378E1E;
    uint public constant PRE_ICO_TOKENS = TOTAL_TOKENS_PERCENT * 5;

    /// dev team 10%
    address public constant DEV_TEAM_HOLDER = 0x24b7c7800a3636844898832463FB6934337D8518;
    uint public constant DEV_TEAM_TOKENS = TOTAL_TOKENS_PERCENT * 10;

    /// Delphy Foundation 9%
    address public constant FOUNDATION_HOLDER = 0xD6355e36b4715D7Ef80432ED0F7063FEbe0806A5;
    uint public constant FOUNDATION_TOKENS = TOTAL_TOKENS_PERCENT * 9;

    /// maximum tokens to-be-sold
    uint public constant MAX_OPEN_SOLD = PUBLIC_SECOND_TOKENS;

    /*
     *  Storage
     */

    /// Fields that are only changed in constructor
    /// All deposited ETH will be instantly forwarded to this address.
    address public wallet;

    /// ICO start time
    uint public startTime;

    /// ICO end time
    uint public endTime;

    /// ERC20 compliant Delphy token contact instance
    DelphyToken public delphyToken;

    /// Fields that can be changed by functions
    /// Accumulator for tokens sold in ICO
    uint public openSoldTokens;

    /// In emergency, set this to true to halt the contribution
    bool public halted;

    /// tokens bought by address
    mapping (address => uint256) public lockedBalances;

    /*
     *  Modifiers
     */

    modifier onlyWallet {
        require(msg.sender == wallet);
        _;
    }

    modifier notHalted() {
        require(!halted);
        _;
    }

    modifier initialized() {
        require(address(wallet) != 0x0);
        _;
    }

    modifier notEarlierThan(uint x) {
        require(getBlockTime() >= x);
        _;
    }

    modifier earlierThan(uint x) {
        require(getBlockTime() < x);
        _;
    }

    modifier ceilingNotReached() {
        require(openSoldTokens < MAX_OPEN_SOLD);
        _;
    }

    modifier isLaterThan (uint x) {
        assert(getBlockTime() > x);
        _;
    }

    modifier isNotContract(address _addr) {
        require(!isContract(_addr));
        _;
    }

    modifier isValidPayload() {
        require (msg.data.length == 4 || msg.data.length == 36);
        _;
    }

    /*
     *  Public functions
     */

    /// @dev Contract constructor function set Delphy ICO contract
    /// @param _wallet The escrow account address, all ethers will be sent to this address.
    /// @param _startTime ICO start time
    function DelphyICO(address _wallet, uint _startTime) public {
        require (_wallet != 0);

        halted = false;
        wallet = _wallet;
        startTime = _startTime;
        endTime = startTime + ICO_DURATION;
        openSoldTokens = 0;

        address[] memory orgs = new address[](7);
        uint[] memory nums = new uint[](7);
        orgs[0] = BONUS_HOLDER;
        nums[0] = BONUS_TOKENS;

        orgs[1] = PUBLIC_FIRST_HOLDER;
        nums[1] = PUBLIC_FIRST_TOKENS;

        orgs[2] = this;
        nums[2] = PUBLIC_SECOND_TOKENS;

        orgs[3] = PUBLIC_SECOND_PRESOLD_HOLDER;
        nums[3] = PUBLIC_SECOND_PRESOLD_TOKENS;

        orgs[4] = PRE_ICO_HOLDER;
        nums[4] = PRE_ICO_TOKENS;

        orgs[5] = DEV_TEAM_HOLDER;
        nums[5] = DEV_TEAM_TOKENS;

        orgs[6] = FOUNDATION_HOLDER;
        nums[6] = FOUNDATION_TOKENS;
        delphyToken = new DelphyToken(orgs, nums);
    }

    /// @dev If Ethers are sent directly to this contract,
    //          then Delphy tokens are considered being purchased.
    function () public payable notHalted ceilingNotReached {
        buyDelphyToken(msg.sender);
    }

    /// @dev purchase Delphy Tokens with Ethers for receiver.
    /// @param receiver the address of Delphy tokens receiver
    function buyDelphyToken(address receiver)
    public
    payable
    notHalted
    initialized
    ceilingNotReached
    notEarlierThan(startTime)
    earlierThan(endTime)
    returns (bool)
    {
        require(msg.value >= 0.1 ether);
        require(msg.value <= 20 ether);

        if (receiver == 0x0)
        receiver = msg.sender;

        doBuyDelphyToken(receiver);

        return true;
    }

    /// @dev collect all left-over tokens when ICO ends
    function finishICO()
    public
    onlyWallet
    isLaterThan(endTime)
    returns (bool)
    {
        if (openSoldTokens < MAX_OPEN_SOLD) {
            uint tokenAvailable = MAX_OPEN_SOLD.sub(openSoldTokens);
            require(delphyToken.transfer(wallet, tokenAvailable));
            openSoldTokens = MAX_OPEN_SOLD;
        }
        return true;
    }

    /// @dev After locking period passes, unlock tokens.
    ///      All tokens owned by receiver will be tradeable
    function claimTokens(address receiver)
    public
    isLaterThan(endTime)
    isValidPayload
    {
        if (receiver == 0x0)
        receiver = msg.sender;

        uint tokenCount = lockedBalances[receiver] ;
        require(tokenCount != 0x0);

        require(delphyToken.transfer(receiver, tokenCount));
        lockedBalances[receiver] = 0;
    }

    /// @dev Stop contribution when in emergency.
    /// Contribution is not possible anymore.
    function halt() public onlyWallet {
        halted = true;
    }

    /// @dev Un-halt when emergency situation is resolved.
    /// Contribution becomes possible again
    function unHalt() public onlyWallet {
        halted = false;
    }

    /*
     *  Internal functions
     */

    /// @dev Buy Delphy token normally
    /// @param receiver is the receiving address of delphy tokens
    function doBuyDelphyToken(address receiver) internal {
        // Do not allow contracts to game the system
        require(!isContract(msg.sender));

        uint tokenAvailable = MAX_OPEN_SOLD.sub(openSoldTokens);
        require(tokenAvailable != 0);

        uint toFund;
        uint toCollect;
        (toFund, toCollect) = calcEtherAndToken(tokenAvailable);
        doBuy(receiver, toFund, toCollect);
    }

    /// @dev Utility function to buy Delphy tokens
    /// @param receiver is the receiving address of Delphy tokens
    /// @param toFund is the ether amount to be paid
    /// @param tokenCollect the number of delphy tokens purchased
    function doBuy(address receiver, uint toFund, uint tokenCollect) internal {
        require(msg.value >= toFund); // double check

        if(toFund > 0) {
            lockedBalances[receiver] += tokenCollect;
            wallet.transfer(toFund);
            openSoldTokens = openSoldTokens.add(tokenCollect);
            NewSale(receiver, toFund, tokenCollect);
        }

        uint toReturn = msg.value.sub(toFund);
        if(toReturn > 0) {
            msg.sender.transfer(toReturn);
        }
    }

    /// @dev Utility function to calculate available tokens and cost in ethers
    /// @param availableToken is the number of Delphy tokens that will be purchased
    function calcEtherAndToken(uint availableToken) constant internal returns (uint costValue, uint getTokens){
        // all conditions have been checked in the caller functions
        uint exchangeRate = getTokenTimes();
        getTokens = exchangeRate * msg.value;

        if(availableToken >= getTokens){
            costValue = msg.value;
        } else {
            costValue = availableToken / exchangeRate;
            getTokens = availableToken;
        }
    }

    /// @dev Internal function to determine if an address is a contract
    /// @param _addr The address to-be-verified
    /// @return True if `_addr` is a contract
    function isContract(address _addr) constant internal returns(bool) {
        uint size;

        if (_addr == 0)
        return false;

        assembly {
        size := extcodesize(_addr)
        }

        return size > 0;
    }

    /*
     *  Testing functions
     */
    /// @notice This function is overridden by the test Mocks.
    function getBlockTime() internal constant returns (uint256) {
        return block.timestamp;
    }

    /// @notice This function is overridden by the test Mocks.
    function getTokenTimes() internal constant returns (uint256) {
        return 250;
    }

}

