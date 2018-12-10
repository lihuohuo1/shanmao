from django.conf.urls import url

from shanmao1 import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^index/$',views.index,name='index1'),
    url(r'^login/$',views.login,name='login'),
    url(r'^register/$',views.register,name='register'),
    url(r'^nike/$',views.nike,name='nike'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^balance/$',views.balance,name='balance'),
]