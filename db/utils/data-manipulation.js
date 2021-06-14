exports.formatCategories = (categories) => {
  return categories.map((category) => [category.slug, category.description]);
};

exports.formatUsers = (users) => {
  return users.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
};

exports.formatReviews = (reviews) => {
  return reviews.map((review) => {
    return [
      review.title,
      review.review_body,
      review.designer,
      review.review_img_url,
      review.votes,
      review.category,
      review.owner,
      review.created_at,
    ];
  });
};

exports.formatComments = (comments, reviews) => {
  const refReviews = {};
  reviews.forEach((review) => {
    refReviews[review.title] = review.review_id;
  });
  return comments.map((comment) => {
    return [
      comment.created_by,
      refReviews[comment.belongs_to],
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
};
