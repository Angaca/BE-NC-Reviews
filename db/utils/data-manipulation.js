exports.categoriesValues = (categories) => {
  return categories.map((category) => [category.slug, category.description]);
};

exports.usersValues = (users) => {
  return users.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
};
