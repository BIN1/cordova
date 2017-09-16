<template>
    <div id='contacts' class="page-container">
        <x-header title="通讯录"></x-header>
        <search placeholder="请输入你要搜索的产品" v-model="search" @on-change='_search'></search>
        <x-input title="姓名：" v-model="name"></x-input><br/>
        <x-input title="联系号码：" v-model="tel"></x-input><br/>
        <ul>
            <li v-for='(result,index) in aResult' :key="index">
                <div class="name kz-vertica-horizontal-center">{{result.name}}</div>
                <div class="phone">
                    <p v-for="(phone,key) in result.phone" :key="key" @click="_click(result.name,phone.value)">
                        {{phone.type}}&nbsp;&nbsp;&nbsp;{{phone.value}}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<<style lang="less">
    #contacts{
        ul{
            width:100%;
            position:absolute;
            top:200px;
            bottom:0;
            overflow:auto;
            li{
                display:flex;
                border-bottom:1px solid lightblue;
                .name{
                    flex:0 0 100px;
                    width:100px;
                }
                .phone{
                    flex:1;
                    p{
                        line-height:30px;
                    }
                }
            }
        }
    }
</style>

<<script>
    import {
        XHeader,XInput,Search
    } from 'vux';
    export default {
        components: {
            XHeader,XInput,Search
        },
        data(){
            return {
                search:'',
                aResult:[],
                name:'',
                tel:''
            }
        },
        created() {
            this.$store.dispatch('isLoading', false);
            this._search();
        },
        methods: {
            onSuccess(contacts) {
                // 联系人与电话号码 全写在这儿
                for (var i = 0; contacts[i]; i++) {
                    if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length) {
                        var contactPhoneList = [];
                        for (var j = 0; contacts[i].phoneNumbers[j]; j++) {
                            contactPhoneList.push({
                                'type': contacts[i].phoneNumbers[j].type,
                                'value': contacts[i].phoneNumbers[j].value
                            });
    
                        };
                        this.aResult.push({
                            name: contacts[i].displayName,
                            phone: contactPhoneList
                        });
                    };
                    //
                }
                // //迭代获取 联系人和号码
                // for (var i = 0; this.aResult[i]; i++) {
                //     for (var j = 0; this.aResult[i].phone[j]; j++) {
                //         console.log()
                //         // alert(this.aResult[i].name + "--------" + this.aResult[i].phone[j].type + "-----" + this.aResult[i].phone[j].value);
                //     };
                // };
                // console.log(this.aResult);
            },
            // onError: Failed to get the contacts   
            onError(contactError) {
                alert('onError!');
            },
            baozi() {
                alert("S1");
            },
            _click(name,phone){
                let vm=this;
                vm.name=name;
                vm.tel=phone;
            },
            _search(){
                // 获取通讯录
                let options = new ContactFindOptions();
                options.filter = '';
                options.multiple = true;
                /*
                查找关键字
                名字：displayName
                电话号码：phoneNumbers   ContactField[]类型
                */
                // let fields = ["displayName", "name", "phoneNumbers"];
                let fields = [{
                    displayName:this.search
                }];
                navigator.contacts.find(fields, this.onSuccess, this.onError, options);
            }
        }
    }
</script>