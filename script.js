var app = angular.module('imageSearchApp', []);

app.controller('ImageSearchController', ['$http', function($http) {
    var vm = this;
    vm.accessKey = "iP7p67tucfGZczUpAGdelHlOzCNpKjv_3AFLz-PIciY";
    vm.keyword = "";
    vm.page = 1;
    vm.results = [];
    vm.showMoreBtn = true;

    vm.searchImages = function() {
        var url = `https://api.unsplash.com/search/photos?page=${vm.page}&query=${vm.keyword}&client_id=${vm.accessKey}&per_page=12`;

        $http.get(url)
            .then(function(response) {
                if (vm.page === 1) {
                    vm.results = [];
                }
                vm.results = vm.results.concat(response.data.results);
                vm.showMoreBtn = true;
            })
            .catch(function(error) {
                console.error('Error fetching images:', error);
            });
    };

    vm.loadMore = function() {
        vm.page++;
        vm.searchImages();
    };

    // Function to check if there are more pages
    vm.hasMorePages = function() {
        return vm.page < 10; // You can adjust the maximum number of pages as needed
    };

}]);
