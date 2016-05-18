import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';
import { normalize, Schema, arrayOf } from 'normalizr';

const tweet = new Schema('tweets', { idAttribute: 'id_str' });

const interval = {
  Home: 60 * 1000,
  Favorite: 60 * 1000,
  Mention: 60 * 1000,
};

const fetch = (store, account, type) => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetch(type, { count: 200 })
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      store.dispatch(action({ account, tweets: normalize(tweets, arrayOf(tweet)), type }));
    })
    .catch(error => {
      const action = createAction('FETCH_TIMELINE_FAIL');
      store.dispatch(action({ error }));
    });
};

const hooks = {
  ['ADD_COLUMN'](store, action) {
    // FIXME: storeから同一のaccount, typeがないか検索し、あったらtimerIdを返す
    const { account, type } = action.payload;
    // const { tweets: { timerIds } } = store.getState();
    const key = `${account.id}:${type}`;
    // if (timerIds[key]) {
    //   return { ...action, payload: { ...action.payload, timerId: timerIds[key].id } };
    // }
    fetch(store, account, type);
    // const timerId = setInterval(() => fetch(store, account, type), interval[type]);
    return { ...action, payload: { ...action.payload } };
  },
  ['DELETE_COLUMN'](store, action) {
    // TODO: clearするかどうかはtimerの参照カウンタで管理する必要あり？
    clearInterval(action.payload.timerId);
    return action;
  },
};

export default store => next => action => {
  const hook = hooks[action.type];
  if (!hook) return next(action);
  return next(hook(store, action));
};
