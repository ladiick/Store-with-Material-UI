from django.urls import path, include
from rest_framework import routers


from magazin.views import ProductViewSet, CategoryViewSet, OrderViewSet

router = routers.DefaultRouter()
router.register(r'product', ProductViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'order', OrderViewSet)



urlpatterns = [
    path('api/v1/', include(router.urls)),

]

