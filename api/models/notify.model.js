"use strict";
const TABLE_DEFINE = require("../domain/table.define");
const DomainAccountVersions = TABLE_DEFINE.DomainAccountVersions;
const DomainPaymentTrasaction = TABLE_DEFINE.DomainPaymentTrasaction;
const DomainDeposits = TABLE_DEFINE.DomainDeposits;
const DomainPoolAddresses = TABLE_DEFINE.DomainPoolAddresses;
const DomainPaymentAddresses = TABLE_DEFINE.DomainPaymentAddresses;

var NotifyModel = module.exports;

    // address: ele.address,
    // bankType: 'BTC',
    // txHash: tx.txid,
    // blockHash: tx.blockHash,
    // blockNumber: 0,
    // txFrom: ele.category == 'send' ? ele.address : '',
    // txTo: ele.category == 'receive' ? ele.address : '',
    // txValue: ele.amount * 1e10,
    // txInput: ele.amount,
    // txIndex: tx.blockindex,
    // txDate: new Date(tx.timereceived * 1000)

NotifyModel.notify  = function notify(body){
    return DomainPoolAddresses.findOne({
        address:body.address
    }).then(PA=>{
        if(PA == null){
            return Promise.resolve({
                isSuccess:false,
                message:"没有此地址"+body.address
            });
        }
        var currency = 2;
        if(body.bankType == 'BTC'){
            currency = 2;
        }else if(body.bankType == 'ETH'){
            currency = 3;
        }
        return DomainPaymentTrasaction.create({//交易插入
            txid:body.txHash,
            amount:body.txInput,
            confirmations:body.blockNumber,
            address:body.address,
            // state:
            // aasm_state:
            receive_at:txDate,
            dont_at:new Date(),
            currency:currency,
            // type:
            // txout:
        }).then(()=>{
            return DomainPaymentAddresses.findOne({
                address:body.address
            }).then(DPA=>{
                if(DPA == null){
                    return Promise.resolve({
                        isSuccess:false,
                        message:"此地址没有分配用户"+body.address
                    });
                }
                // DPA.account_id;
    
            });
        });



    });
};