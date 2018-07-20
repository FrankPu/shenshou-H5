<template>
    <li :item="item" class="listItem">
        <img src="../../assets/images/input@2x.png" @click="editPassenger" />
        <div class="list">
            <div class="messL"><span class="name">{{item.PsgerName}}</span>{{item.Phone}}</div>
            <div class="messR"><span class="ID">身份证</span>{{item.UserId}}</div>
        </div>  
        <label :class="[{'checked': isChecked}, 'check']" @click="choosePassenger(item, index)"></label>
    </li>
</template>

<script>

import qs from 'qs'

export default {
    name: 'passenger-list-item',
    props: {
        item: Object,
        index: Number
    },
   data: function() {
        return {
            isChecked: false
        }
    },
    methods: {
        choosePassenger(item, index) {
            this.isChecked = !this.isChecked
            this.$emit('choose-passenger', item, this.isChecked, index)
        },
        editPassenger() {
            this.$router.push({path: '/MyInmod'})
        }
    }
}
</script>
 
<style lang="less">  
    .listItem {
        padding: 1.2rem 0;
        border-bottom: solid 1px #E6E6E6;
        position: relative;
        img {
            width: 2rem;
            vertical-align: middle;
        }
        .list {
            display: inline-block;
            vertical-align: middle;
            margin-left: 1.2rem;
            span {
                width: 5rem;
                display: inline-block;
            }
            .messL {
                color: #2B2B2B;
                font-size: 1.6rem;
            }
            .messR {
                color: #A5A5A5;
                margin-top: .4rem;
            }
            
        }     
        .check {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            background: #E5E5E5;
            top: 0;
            bottom: 0;
            margin: auto;
            border-radius: .2rem;
            position: absolute;
            right: .6rem;
        }
        .checked {
            background: #2475DD;
            text-align: center;
        }
        .checked:after{
            content: '';
            display: inline-block;
            border: .2rem solid #fff;
            border-top-width: 0;
            border-right-width: 0; 
            width: 1.2rem;
            height: .6rem;
            transform: rotate(-50deg);
        }
    }
    
</style>
