PUT       api/v1/notifications/mark-all-read Api\V1\NotificationControlle…
  DELETE    api/v1/notifications/{id} Api\V1\NotificationController@destroy
  PUT       api/v1/notifications/{id}/read Api\V1\NotificationController@ma…
  GET|HEAD  api/v1/orders ..................... Api\V1\OrderController@index
  GET|HEAD  api/v1/orders/{id} ................. Api\V1\OrderController@show
  POST      api/v1/orders/{id}/cancel ........ Api\V1\OrderController@cancel
  POST      api/v1/orders/{id}/return . Api\V1\OrderController@requestReturn
  GET|HEAD  api/v1/pages/about .................. Api\V1\CmsController@about
  GET|HEAD  api/v1/pages/home .................... Api\V1\CmsController@home
  GET|HEAD  api/v1/pages/{slug} .................. Api\V1\CmsController@page
  POST      api/v1/payment/intent .... Api\V1\PaymentController@createIntent
  GET|HEAD  api/v1/payment/methods ........ Api\V1\PaymentController@methods
  GET|HEAD  api/v1/payment/status/{id} ..... Api\V1\PaymentController@status
  POST      api/v1/payment/verify .......... Api\V1\PaymentController@verify
  GET|HEAD  api/v1/products ................. Api\V1\ProductController@index
  GET|HEAD  api/v1/products/deals ........... Api\V1\ProductController@deals
  GET|HEAD  api/v1/products/new ....... Api\V1\ProductController@newArrivals
  GET|HEAD  api/v1/products/related/{id} .. Api\V1\ProductController@related
  GET|HEAD  api/v1/products/similar/{id} .. Api\V1\ProductController@similar
  GET|HEAD  api/v1/products/top ............... Api\V1\ProductController@top
  GET|HEAD  api/v1/products/{id} ............. Api\V1\ProductController@show
  GET|HEAD  api/v1/promotions ........... Api\V1\CouponController@promotions
  POST      api/v1/reviews ................... Api\V1\ReviewController@store
  GET|HEAD  api/v1/reviews/product/{productId} Api\V1\ReviewController@byPr…
  GET|HEAD  api/v1/reviews/user ............. Api\V1\ReviewController@byUser
  PUT       api/v1/reviews/{id} ............. Api\V1\ReviewController@update
  DELETE    api/v1/reviews/{id} ............ Api\V1\ReviewController@destroy
  POST      api/v1/reviews/{id}/report ...... Api\V1\ReviewController@report
  GET|HEAD  api/v1/search .................... Api\V1\SearchController@index
  GET|HEAD  api/v1/search/suggest .......... Api\V1\SearchController@suggest
  GET|HEAD  api/v1/sellers ................... Api\V1\SellerController@index
  POST      api/v1/sellers/applications ...... Api\V1\SellerController@apply
  GET|HEAD  api/v1/sellers/{id} ............... Api\V1\SellerController@show
  GET|HEAD  api/v1/sellers/{id}/products .. Api\V1\SellerController@products
  GET|HEAD  api/v1/settings ................. Api\V1\SettingController@index
  GET|HEAD  api/v1/settings/privacy ....... Api\V1\SettingController@privacy
  GET|HEAD  api/v1/settings/return-policy Api\V1\SettingController@returnPo…
  GET|HEAD  api/v1/settings/shipping ..... Api\V1\SettingController@shipping
  GET|HEAD  api/v1/users/addresses .......... Api\V1\AddressController@index
  POST      api/v1/users/addresses .......... Api\V1\AddressController@store
  PUT       api/v1/users/addresses/{id} .... Api\V1\AddressController@update
  DELETE    api/v1/users/addresses/{id} ... Api\V1\AddressController@destroy
  POST      api/v1/webhooks/paypal ......... Api\V1\WebhookController@paypal
  POST      api/v1/webhooks/shipping ..... Api\V1\WebhookController@shipping
  POST      api/v1/webhooks/stripe ......... Api\V1\WebhookController@stripe
  GET|HEAD  api/v1/wishlist ................ Api\V1\WishlistController@index
  POST      api/v1/wishlist ................ Api\V1\WishlistController@store
  DELETE    api/v1/wishlist/{productId} .. Api\V1\WishlistController@destroy
  GET|HEAD  sanctum/csrf-cookie sanctum.csrf-cookie › Laravel\Sanctum › Csr…
  GET|HEAD  storage/{path} ................................... storage.local
  GET|HEAD  up .............................................................