import re
from urllib import response
from django.shortcuts import render, redirect
from .models import Post, Comment, Like, CommentLike
from accounts.models import Profile
from django.db.models import Count
from django.contrib.auth.models import User
from tags.models import Tag
from django.http import JsonResponse
import os
import requests

# Create your views here.
def index(request):
    if request.method == 'GET': 
        posts = Post.objects.all().order_by('-created_at')
        tags = Tag.objects.all()
            
        return render(
            request, 
            'blogPosts/index.html', 
            {
                'posts': posts, 
                'tags': tags
            }
        )
    elif request.method == 'POST': 
        title = request.POST['title']
        content = request.POST['content']
        post = Post.objects.create(title=title, content=content, author=request.user)
        post.tags.set(request.POST.getlist('tags'))
        return redirect('blogPosts:index') 


def new(request):
    tags = Tag.objects.all()
    return render(request, 'blogPosts/new.html', {'tags': tags})


def show(request, id):
    post = Post.objects.get(id=id)
    tags = Tag.objects.filter(posts=post)
    comments = Comment.objects.filter(post = post).order_by('-like_users')
    app_key = os.environ.get('KAKAO_MAP_APP_KEY')
    return render(request, 'blogPosts/show.html', {
			'post':post, 'tags': tags, 'comments':comments, 'app_key': app_key
		})


def delete(request, id):
    post = Post.objects.get(id=id)
    post.delete() 
    if request.method == 'DELETE': 
        return JsonResponse({'postLikeCount': request.user.like_posts.count()})
    return redirect('blogPosts:index') 


def update(request, id):
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        tags = Tag.objects.all()
        return render(request, 'blogPosts/update.html', {'post':post, 'tags': tags})
    
    elif request.method == 'POST':
        post = Post.objects.filter(id=id)
        post.update(title=request.POST['title'], content=request.POST['content'])
        post.first().tags.set(request.POST.getlist('tags'))
        return redirect('blogPosts:show', id=id)


class CommentView:
    def create(request, id):
        content = request.POST['content']
        comment = Comment.objects.create(post_id=id, content=content, author=request.user)
        post = Post.objects.get(id=id)
        return JsonResponse({
            'commentId': comment.id,
            'commentAuthor': comment.author.username,
            'commentCreatedAt': comment.created_at,
            'commentCount': post.comment_set.count(),
            'commentLikeCount': comment.like_users.count(), 
        })
        
    def delete(request, id, cid):
        comment = Comment.objects.get(id=cid)
        comment.delete()
        post = Post.objects.get(id=id)
        return JsonResponse({'commentCount': post.comment_set.count()})


class LikeView:
    def create(request, id):
        post = Post.objects.get(id=id)
        like_list = post.like_set.filter(user_id=request.user.id)
        if like_list.count() > 0:
            post.like_set.get(user=request.user).delete()
        else:
            Like.objects.create(user=request.user, post=post)
        return JsonResponse({
            'postLikeCount': post.like_set.count(), 
            'userLikeCount': request.user.like_posts.count()
        })

    def weather(request):
        weather_app_key = os.environ.get('WEATHER_APPKEY')
        lat = request.POST.get('lat')
        lon = request.POST.get('lon')
        response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={weather_app_key}")
        
        weatherdata = response.json()['weather'][0]['main']
        citydata = response.json()['name']



        return JsonResponse({
            'weatherdata' : weatherdata,
            'citydata' : citydata
        })


class CommentLikeView:
    def create(request, cid):
        comment = Comment.objects.get(id=cid)
        like_list = comment.commentlike_set.filter(user_id=request.user.id)
        if like_list.count() > 0:
            comment.commentlike_set.get(user=request.user).delete()
        else:
            CommentLike.objects.create(user=request.user, comment=comment)
        return JsonResponse({'commentLikeCount': comment.commentlike_set.count()})
