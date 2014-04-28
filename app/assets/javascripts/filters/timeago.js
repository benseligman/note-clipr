angular.module('noteClipr').filter('timeAgo', function () {
  return function (time) {
    return time ? $.timeago(time) : "";
  };
});
