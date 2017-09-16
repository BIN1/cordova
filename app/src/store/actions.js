export const cartNum=(context,value) => {
    context.commit({
        type:'getCartNum',
        cartNum:value
    })
};
export const balance=(context,value) => {
    context.commit({
        type:'getBalance',
        balance:value
    })
};
export const isLoading=(context,value) => {
    context.commit({
        type:'updateLoadingStatus',
        isLoading:value
    })
};
export const starCore=(context,value) => {
    context.commit({
        type:'updateStarCore',
        starCore:value
    })
};
export const userInfo=(context,value) => {
    context.commit({
        type:'updateUserInfo',
        userInfo:value
    })
}