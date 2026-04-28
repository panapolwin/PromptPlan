#include <bits/stdc++.h>
using namespace std;
#define int long long
int n,m,k,a[200010],b[200010],cnt,idx,st;
int32_t main(){
    cin.tie(nullptr)->sync_with_stdio(false);
    cin>>n>>m>>k;
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
    for(int i=0;i<m;i++){
        cin>>b[i];
    }
    sort(a,a+n);
    sort(b,b+m);
    for(int i=0;i<n;i++){
        idx=lower_bound(b+st,b+m,a[i]-k)-b;
        if(idx==m) continue;
        if(b[idx]<=a[i]+k) cnt++,st=idx+1;
    }
    cout<<cnt;
    return 0;
}