const Sequelize = require('./notify.prepare').Sequelize;
const sequelize = require('./notify.prepare').sequelize;
const moment = require('moment');

const createdAt = {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    field: "created_at",
    get() {
        return getDate.call(this, 'createdAt');
    }
}

const updatedAt = {
    type: Sequelize.DATE,
    field: "updated_at",
    get() {
        return getDate.call(this, 'updatedAt');
    }
}

function getDate(field, tz) {
    tz = tz === undefined ? 8 : tz;
    let value = this.getDataValue(field);
    if(value == null) {
        return '';
    }
    return moment(this.getDataValue(field)).utcOffset(tz).format('YYYY-MM-DD HH:mm:ss');
}

var model = module.exports;

model.DomainPoolAddresses = sequelize.define("pool_addresses", {
    address: {
        type: Sequelize.STRING,
        field: "address"
    },
    currency:{
        type: Sequelize.STRING,
        field: "currency"
    },
    used:{
        type: Sequelize.INTEGER,
        field: "used"
    },
    createdAt: createdAt,
    updatedAt: updatedAt
}); 

model.DomainAccountVersions = sequelize.define("account_versions", {
    member_id: {
        type: Sequelize.INTEGER,
        field: "member_id"
    },
    account_id: {
        type: Sequelize.INTEGER,
        field: "account_id"
    },
    reason: {
        type: Sequelize.INTEGER,
        field: "reason"
    },
    balance: {
        type: Sequelize.DECIMAL(32,16),
        field: "balance"
    },
    locked: {
        type: Sequelize.DECIMAL(32,16),
        field: "locked"
    },
    fee: {
        type: Sequelize.DECIMAL(32,16),
        field: "fee"
    },
    amount: {
        type: Sequelize.DECIMAL(32,16),
        field: "amount"
    },
    modifiable_id: {
        type: Sequelize.INTEGER,
        field: "modifiable_id"
    },
    modifiable_type: {
        type: Sequelize.STRING,
        field: "modifiable_type"
    },
    currency: {
        type: Sequelize.INTEGER,
        field: "currency"
    },
    fun: {
        type: Sequelize.INTEGER,
        field: "fun"
    },
    createdAt: createdAt,
    updatedAt: updatedAt
});

model.DomainPaymentTrasaction = sequelize.define("payment_trasactions", {
    txid: {
        type: Sequelize.STRING,
        field: "txid"
    },
    amount: {
        type: Sequelize.DECIMAL(32,16),
        field: "amount"
    },
    confirmations: {
        type: Sequelize.INTEGER,
        field: "confirmations"
    },
    address: {
        type: Sequelize.STRING,
        field: "address"
    },
    state: {
        type: Sequelize.INTEGER,
        field: "state"
    },
    aasm_state: {
        type: Sequelize.STRING,
        field: "aasm_state"
    },
    receive_at:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: "receive_at"
    },
    dont_at:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: "dont_at"
    },
    currency:{
        type: Sequelize.INTEGER,
        field: "currency"
    },
    type:{
        type: Sequelize.STRING,
        field: "type"
    },
    txout:{
        type: Sequelize.INTEGER,
        field: "txout"
    },
    createdAt: createdAt,
    updatedAt: updatedAt
}); 

model.DomainPaymentAddresses = sequelize.define("payment_addresses", {
    account_id: {
        type: Sequelize.INTEGER,
        field: "account_id"
    },
    address: {
        type: Sequelize.STRING,
        field: "address"
    },
    currency:{
        type: Sequelize.INTEGER,
        field: "currency"
    },
    createdAt: createdAt,
    updatedAt: updatedAt
}); 

model.DomainDeposits = sequelize.define("deposits", {
    member_id: {
        type: Sequelize.INTEGER,
        field: "member_id"
    },
    account_id: {
        type: Sequelize.INTEGER,
        field: "account_id"
    },
    currency: {
        type: Sequelize.INTEGER,
        field: "currency"
    },
    amount: {
        type: Sequelize.DECIMAL(32,16),
        field: "amount"
    },
    fee: {
        type: Sequelize.DECIMAL(32,16),
        field: "fee"
    },
    fund_uid: {
        type: Sequelize.STRING,
        field: "fund_uid"
    },
    fund_extra: {
        type: Sequelize.STRING,
        field: "fund_extra"
    },
    txid: {
        type: Sequelize.STRING,
        field: "txid"
    },
    state: {
        type: Sequelize.INTEGER,
        field: "state"
    },
    aasm_state: {
        type: Sequelize.STRING,
        field: "aasm_state"
    },
    confirmations: {
        type: Sequelize.STRING,
        field: "confirmations"
    },
    type: {
        type: Sequelize.STRING,
        field: "type"
    },
    payment_transaction_id: {
        type: Sequelize.INTEGER,
        field: "payment_transaction_id"
    },
    txout: {
        type: Sequelize.INTEGER,
        field: "txout"
    },
    done_at:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: "done_at"
    },
    createdAt: createdAt,
    updatedAt: updatedAt
});



sequelize.sync({ force: false }).then(() => {
    console.log('----------------------start----------------------');
});
