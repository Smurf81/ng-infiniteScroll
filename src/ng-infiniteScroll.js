angular.module('ng.infiniteScroll',[]).directive('scrollInfinite',['$rootScope', '$window','$timeout', function($rootScope, $window,$timeout) {
    return {
        link:function(scope,elem,attrs){
            elem.css('overflow', 'hidden');
            var jqueryElement = angular.element(elem);

            var scrollFunction = function() {
                // Remove heightBeforeBottom % to scrollHeight for execute function before the bottom
                var scrollHeight = jqueryElement[0].scrollHeight - jqueryElement[0].scrollHeight*attrs.heightBeforeBottom/100;
                var innerheight = $window.innerHeight;
                var scrollY = $window.scrollY;

                if (scrollHeight  < innerheight + scrollY) {
                    $timeout.cancel(scope.stop);
                    scope.stop = $timeout(function () {
                        if ($rootScope.$$phase) {
                            scope.$eval(attrs.scrollInfinite);
                        } else {
                            scope.$apply(attrs.scrollInfinite);
                        }
                    },200);
                }
            }

            angular.element($window).bind("scroll", function() {
                scrollFunction();
            });
        }
    }
}])
