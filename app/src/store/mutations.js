export const getCartNum=(state,payload) => {
    state.cartNum=payload.cartNum;
};
export const getBalance=(state,payload) => {
    state.balance=payload.balance;
};
export const updateLoadingStatus=(state,payload) => {
    state.isLoading=payload.isLoading;
};
export const updateStarCore=(state,payload) => {
    state.starCore=payload.starCore;
};
export const updateUserInfo=(state,payload) => {
    state.userInfo=payload.userInfo;
}