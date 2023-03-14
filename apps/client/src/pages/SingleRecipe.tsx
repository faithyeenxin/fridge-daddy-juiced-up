import React from 'react';
import { useParams } from 'react-router-dom';

const SingleRecipe = () => {
  const { id } = useParams();

  return (
    <>
      <div>SingleRecipe</div>;<div>{id}</div>
    </>
  );
};

export default SingleRecipe;
