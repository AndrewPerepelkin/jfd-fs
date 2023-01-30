import React, {useEffect} from 'react';
import {orderBy} from 'lodash';
import CardWrapper from '../../../common/Card';
import Divider from '../../../common/divider';
import CommentsForm from './addCommentsForm';
import CommentsList from './commentsList';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from '../../../../store/comments';
import {getCurrentUserId} from '../../../../store/users';
import {nanoid} from '@reduxjs/toolkit';

const Comments = () => {
  const {userId} = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsLoadingStatus());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    const comment = {
      ...data,
      created_at: Date.now(),
      pageId: userId,
      userId: currentUserId,
      _id: nanoid()
    };
    dispatch(createComment(comment));
  };

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id));
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  return (
    <>
      <CardWrapper>
        <CommentsForm onSubmit={handleSubmit} />
      </CardWrapper>
      {sortedComments.length > 0 && (
        <CardWrapper>
          <h2>Comments</h2>
          <Divider />
          {!isLoading ? (
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          ) : (
            'Загрузка...'
          )}
        </CardWrapper>
      )}
    </>
  );
};

export default Comments;
