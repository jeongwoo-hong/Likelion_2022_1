from django.urls import path
from blogPosts import views

app_name = 'blogPosts'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
    path('<int:id>/', views.show, name='show'),
    path('<int:id>/delete/', views.delete, name='delete'), 
    path('<int:id>/update/', views.update, name='update'),
    path('<int:id>/comments/', views.CommentView.create, name='comment_create'),
    path('<int:id>/comments/<int:cid>/', views.CommentView.delete, name='comment_delete'),
    path('<int:id>/like/', views.LikeView.create, name='like'),
    path('<int:cid>/commentlike/', views.CommentLikeView.create, name='commentlike'),
    path('weather/', views.LikeView.weather, name='weather'),
]
