import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';

export const fetchHome = (account, type) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchHomeTimeline({})
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      dispatch(action({ account, tweets, type }));
    })
    .catch(error => {
      console.error(error);
      const action = createAction('FETCH_TIMELINE_FAIL');
      dispatch(action({ error }));
    });
};

export const fetchFavorites = (account, type) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchFavorites({})
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      dispatch(action({ account, tweets, type }));
    })
    .catch(error => {
      console.error(error);
      const action = createAction('FETCH_TIMELINE_FAIL');
      dispatch(action({ error }));
    });
};

export const createFavorite = (account, id) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.createFavorite({ id })
    .then(tweet => {
      const action = createAction('CREATE_FAVORITE_SUCCESS');
      dispatch(action({ account, tweet }));
    })
    .catch(error => {
      console.error(error);
      const action = createAction('CREATE_FAVORITE_FAIL');
      dispatch(action({ error }));
    });
};

export const postTweet = (account, status) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.postTweet({ status })
    .then(tweet => {
      const action = createAction('POST_TWEET_SUCCESS');
      dispatch(action({ account, tweet }));
    })
    .catch(error => {
      console.error(error);
      const action = createAction('POST_TWEET_FAIL');
      dispatch(action({ error }));
    });
};
