import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import commentService from '../services/commentService';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';
import {nanoid} from 'nanoid';
import {useSelector} from 'react-redux';
import {getCurrentUserId} from '../store/users';

const CommentsContext = React.createContext();

export const useComments = () => useContext(CommentsContext);

export const CommentsProvider = ({children}) => {
  const {userId} = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getComments();
  }, [userId]);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function createComment(data) {
    const comment = {
      ...data,
      created_at: Date.now(),
      pageId: userId,
      userId: currentUserId,
      _id: nanoid()
    };
    try {
      const {content} = await commentService.create(comment);
      setComments((prev) => [...prev, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const {content} = await commentService.get(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteComment(id) {
    try {
      const {content} = await commentService.delete(id);
      if (content === null) {
        setComments((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  const errorCatcher = (error) => {
    const {message} = error.response.data;
    setError(message);
  };

  return (
    <CommentsContext.Provider
      value={{comments, createComment, isLoading, getComments, deleteComment}}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
