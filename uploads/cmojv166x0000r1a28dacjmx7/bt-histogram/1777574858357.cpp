#include <bits/stdc++.h>
using namespace std;
int n,h=INT_MIN,w=INT_MIN,t,arr[10010];
int main(){
    cin.tie(nullptr)->sync_with_stdio(false);
    cin>>n;
    for(int i=0;i<n;i++){
        cin>>t;
        w=max(w,t);
        arr[t]++;
        h=max(h,arr[t]);
    }
    for(int i=0;i<h;i++){
        for(int j=1;j<=w;j++){
            if(i<h-arr[j]) cout<<'.';
            else cout<<'*';
        }
        cout<<'\n';
    }
    return 0;
}
