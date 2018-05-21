import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});

/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
    type: 'hot'
});

/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
    type: 'group'
});

/**
 * 获取当前所在城市
 */

export const currentcity = number => fetch('/v1/cities/' + number);

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});

/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);

/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
});

/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurantCategoryId = '', restaurantCategoryIds = '', order_by = '', deliveryMode = '', supportIds = []) => {
    let supportStr = '';
    supportIds.forEach(item => {
        if (item.status) {
            supportStr += '&supportIds[]=' + item.id;
        }
    });
    let data = {
        latitude,
        longitude,
        offset,
        limit: '20',
        'extras[]': 'activities',
        keyword: '',
        restaurantCategoryId,
        'restaurantCategoryIds[]': restaurantCategoryIds,
        order_by,
        'deliveryMode[]': deliveryMode + supportStr
    };
    return fetch('/shopping/restaurants', data);
};

/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
    'extras[]': 'restaurant_activity',
    geohash,
    keyword,
    type: 'search'
});

/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
    latitude,
    longitude
});

/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
    latitude,
    longitude,
    kw: ''
});

/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
    latitude,
    longitude,
    kw: ''
});

/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
    latitude,
    longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});

/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurantId => fetch('/shopping/v2/menu', {
    restaurantId
});

/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
    has_content: true,
    offset,
    limit: 10,
    tag_name
});

/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');

/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');

/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
    mobile: phone,
    scene: 'login',
    type: 'sms'
}, 'POST');

/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST');

/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
    [type]: checkNumber,
    type
});

/**
 * 发送帐号
 */

export const sendMobile = (sendData, captchaCode, type, password) => fetch('/v1/mobile/verify_code/send', {
    action: 'send',
    captchaCode,
    [type]: sendData,
    type: 'sms',
    way: type,
    password
}, 'POST');

/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopId) => fetch('/v1/carts/checkout', {
    comeFrom: 'web',
    geohash,
    entities,
    restaurantId: shopId
}, 'POST');

/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
    sig
});

/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => fetch('/v1/carts/' + id + '/addresses', {
    sig
});

/**
 * 搜索地址
 */

export const searchNearby = keyword => fetch('/v1/pois', {
    type: 'nearby',
    keyword
});

/**
 * 添加地址
 */

export const postAddAddress = (userId, address, addressDetail, geohash, name, phone, phoneBk, poiType, sex, tag, tagType) => fetch('/v1/users/' + userId + '/addresses', {
    address,
    addressDetail,
    geohash,
    name,
    phone,
    phoneBk,
    poiType,
    sex,
    tag,
    tagType
}, 'POST');

/**
 * 下订单
 */

export const placeOrders = (userId, cartId, addressId, description, entities, geohash, sig) => fetch('/v1/users/' + userId + '/carts/' + cartId + '/orders', {
    addressId,
    comeFrom: 'mobileWeb',
    deliverTime: '',
    description,
    entities,
    geohash,
    paymethodId: 1,
    sig
}, 'POST');

/**
 * 重新发送订单验证码
 */

export const rePostVerify = (cartId, sig, type) => fetch('/v1/carts/' + cartId + '/verify_code', {
    sig,
    type
}, 'POST');

/**
 * 下订单
 */

export const validateOrders = ({
    userId,
    cartId,
    addressId,
    description,
    entities,
    geohash,
    sig,
    validationCode,
    validationToken
}) => fetch('/v1/users/' + userId + '/carts/' + cartId + '/orders', {
    addressId,
    comeFrom: 'mobileWeb',
    deliver_time: '',
    description,
    entities,
    geohash,
    paymethodId: 1,
    sig,
    validationCode,
    validationToken
}, 'POST');

/**
 * 重新发送订单验证码
 */

export const payRequest = (merchantOrderNo, userId) => fetch('/payapi/payment/queryOrder', {
    merchantId: 5,
    merchantOrderNo,
    source: 'MOBILE_WAP',
    userId,
    version: '1.0.0'
});

/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');

/**
 *兑换会员卡
 */

export const vipCart = (id, number, password) => fetch('/member/v1/users/' + id + '/delivery_card/physical_card/bind', {
    number,
    password
}, 'POST')

/**
 * 获取红包
 */

export const getHongbaoNum = id => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');

/**
 * 获取过期红包
 */

export const getExpired = id => fetch('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');

/**
 * 兑换红包
 */

export const exChangeHongbao = (id, exchangeCode, captchaCode) => fetch('/v1/users/' + id + '/hongbao/exchange', {
    exchangeCode,
    captchaCode
}, 'POST');

/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});

/**
 * 手机号登录
 */

export const sendLogin = (code, mobile, validateToken) => fetch('/v1/login/app_mobile', {
    code,
    mobile,
    validateToken
}, 'POST');

/**
 * 获取订单列表
 */

export const getOrderList = (userId, offset) => fetch('/bos/v2/users/' + userId + '/orders', {
    limit: 10,
    offset
});

/**
 * 获取订单详情
 */

export const getOrderDetail = (userId, orderId) => fetch('/bos/v1/users/' + userId + '/orders/' + orderId + '/snapshot');

/**
 *个人中心里编辑地址
 */

export const getAddressList = (userId) => fetch('/v1/users/' + userId + '/addresses')

/**
 *个人中心里搜索地址
 */

export const getSearchAddress = (keyword) => fetch('v1/pois', {
    keyword: keyword,
    type: 'nearby'
})

/**
 * 删除地址
 */

export const deleteAddress = (userId, addressid) => fetch('/v1/users/' + userId + '/addresses/' + addressid, {}, 'DELETE');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captchaCode) => fetch('/v2/login', {
    username,
    password,
    captcha_code: captchaCode
}, 'POST');

/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');

/**
 * 改密码
 */
export const changePassword = (username, oldPassword, newPassword, confirmPassword, captchaCode) => fetch('/v2/changepassword', {
    username,
    oldPassword,
    newPassword,
    confirmPassword,
    captchaCode
}, 'POST');
