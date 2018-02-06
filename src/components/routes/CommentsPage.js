import React from 'react';
import CommentsPagination from "../CommentsPagination";

const CommentsPage = ({match}) => {
  console.log('++++++++', match)
  return <CommentsPagination page={match.params.page}/>
};

export default CommentsPage;
