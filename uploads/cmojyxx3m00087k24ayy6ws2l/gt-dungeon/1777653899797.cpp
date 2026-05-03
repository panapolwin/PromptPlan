#include <bits/stdc++.h>
using namespace std;
int q,k,w,l,mn,di[]={1,0,-1,0},dj[]={0,1,0,-1};
char p[20][20];
void recur(int ii,int jj,int cnt,int d,int f){
    for(int a=0;a<4;a++){
        if(ii+di[a]<1 || ii+di[a]>w || jj+dj[a]<1 || jj+dj[a]>l || p[ii+di[a]][jj+dj[a]]=='#') continue;
        if(a==d && f==k) continue;
        if(p[ii+di[a]][jj+dj[a]]=='e'){
            mn=min(cnt+1,mn);
            return;
        }
        p[ii+di[a]][jj+dj[a]]='#';
        recur(ii+di[a],jj+dj[a],cnt+1,a,(a==d?f+1:1));
        p[ii+di[a]][jj+dj[a]]='.';
    }
}
int main(){
    cin.tie(nullptr)->sync_with_stdio(false);
    cin>>q>>k;
    q--;
    while(q--){
        cin>>w>>l;
        for(int i=1;i<=w;i++){
            for(int j=1;j<=l;j++){
                cin>>p[i][j];
            }
        }
        mn=INT_MAX;
        for(int i=1;i<=w;i++){
            for(int j=1;j<=l;j++){
                if(p[i][j]=='s'){
                    p[i][j]='#';
                    recur(i,j,0,5,0);
                }
            }
        }
        cout<<mn<<'\n';
    }
    return 0;
}
