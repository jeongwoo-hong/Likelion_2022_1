from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.shortcuts import redirect
from accounts.models import Profile

def signup(request):
    if request.method == 'POST':
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
            auth.login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            Profile.objects.filter(user=request.user).update(college=request.POST['college'], major=request.POST['major'])
            return redirect('/posts')

    return render(request, 'accounts/signup.html')


def myinfo(request):
    if request.method == 'POST':
        Profile.objects.filter(user=request.user).update(college=request.POST['college'], major=request.POST['major'])
        return redirect('/posts')

    return render(request, 'accounts/myinfo.html')
