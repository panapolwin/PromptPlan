#include <bits/stdc++.h>
using namespace std;
long long q,k,wi,li,si,sj,mn;
char b[20][20];
bool v[20][20];

void find(int x,int y,int cnt,int di,int st){
    if(x<1 || x>wi || y<1 || y>li || st>k) return;
    if(b[x][y]=='e'){
        //mn=min(mn,cnt);
        mn=(mn<cnt?mn:cnt);
        return;
    }
    if(!v[x+1][y] && b[x+1][y]!='#'){
        v[x+1][y]=1;
        find(x+1,y,cnt+1,0,(di==0?st+1:1));
        v[x+1][y]=0;
    }
    if(!v[x-1][y] && b[x-1][y]!='#'){
        v[x-1][y]=1;
        find(x-1,y,cnt+1,1,(di==1?st+1:1));
        v[x-1][y]=0;
    }
    if(!v[x][y+1] && b[x][y+1]!='#'){
        v[x][y+1]=1;
        find(x,y+1,cnt+1,2,(di==2?st+1:1));
        v[x][y+1]=0;
    }
    if(!v[x][y-1] && b[x][y-1]!='#'){
        v[x][y-1]=1;
        find(x,y-1,cnt+1,3,(di==3?st+1:1));
        v[x][y-1]=0;
    }
}

int main(){
    cin.tie(nullptr)->sync_with_stdio(false);
    cin>>q>>k;
    q--;
    while(q--){
        cin>>wi>>li;
        memset(v,0,sizeof(v));
        mn=INT_MAX;
        for(int i=1;i<=wi;i++){
            for(int j=1;j<=li;j++){
                cin>>b[i][j];
                if(b[i][j]=='s'){
                    si=i;
                    sj=j;
                }
            }
        }
        v[si][sj]=1;
        find(si,sj,0,0,0);
        v[si][sj]=0;
        cout<<mn<<'\n';
    }
    return 0;
}