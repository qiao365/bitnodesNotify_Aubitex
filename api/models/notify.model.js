"use strict";
const TABLE_DEFINE = require("../domain/table.define");
const DomainAccountVersions = TABLE_DEFINE.DomainAccountVersions;
const DomainPaymentTrasaction = TABLE_DEFINE.DomainPaymentTrasaction;
const DomainDeposits = TABLE_DEFINE.DomainDeposits;
const DomainPoolAddresses = TABLE_DEFINE.DomainPoolAddresses;
const DomainPaymentAddresses = TABLE_DEFINE.DomainPaymentAddresses;
const DomainAccounts = TABLE_DEFINE.DomainAccounts;
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
    let array = body.data;
    if(body.password != 'aubitex!@#$'){
        return Promise.resolve({
            isSuccess:false,
            message:'err,pass err'
        });
    }
    let currency = 0;
    if(body.bankType == 'BTC'){
        currency = 1;
    }else if(body.bankType == 'ETH'){
        currency = 3;
    }else if(body.bankType == 'CAN'){
        currency = 4;
    }
    let allArray = array.map(item=>{
        return DomainPoolAddresses.findOne({
            where:{
                address:item.address
            }
        }).then(PA=>{
            if(PA == null){
                return Promise.resolve({
                    isSuccess:false,
                    message:"没有此地址"+item.address
                });
            }
            return DomainPaymentTrasaction.create({//交易插入
                txid:item.txHash,
                amount:item.txInput,
                confirmations:item.blockNumber,
                address:item.address,
                state:'accepted',
                aasm_state:'accepted',
                receive_at:new Date(),
                dont_at:new Date(),
                currency:currency,
                type:'in'
                // txout:
            }).then(()=>{
                return DomainPaymentAddresses.findOne({
                    where:{
                        currency:currency,
                        address:item.address
                    }
                }).then(paymentAddresses=>{
                    if(paymentAddresses == null){
                        return Promise.resolve({
                            isSuccess:false,
                            message:"此地址没有分配用户"+item.address
                        });
                    }
                    return DomainAccounts.findOne({
                        where:{
                            id:paymentAddresses.accountId,
                            currency:currency
                        }
                    }).then(account=>{
                        account.balance += item.txHuman;
                        return account.save().then(()=>{
                            return {
                                isSuccess:true,
                                message:item.address
                            };
                        });
                    });
                });
            });
        });
    });
    return Promise.all(allArray).then(allback=>{
        return {
            isSuccess:true,
            message:allback
        };
    });
};