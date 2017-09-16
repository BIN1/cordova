const state={
    cartNum:(localStorage.getItem('userAccounts'))?JSON.parse(localStorage.getItem('userAccounts')).cart_nums:'0',//购物车数量
    balance:'0',//账户余额
    isLoading:false,
    starCore:0,//信用分
    userInfo:(localStorage.getItem('userAccounts'))?JSON.parse(localStorage.getItem('userAccounts')):'0'
}
export default state;