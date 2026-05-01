#include <bits/stdc++.h>
#define nw <<" "<<
using namespace std;
double x,xx,xxx,y,yy,yyy,d,dd,ddd,s,a,dt,k;
int main(){
    cin.tie(nullptr)->sync_with_stdio(false);
    cin>>x>>y>>xx>>yy>>xxx>>yyy;
    d=pow(pow(x-xx,2)+pow(y-yy,2),0.5);
    dd=pow(pow(x-xxx,2)+pow(y-yyy,2),0.5);
    ddd=pow(pow(xx-xxx,2)+pow(yy-yyy,2),0.5);
    s=(d+dd+ddd)/2;
    a=pow(s*(s-d)*(s-dd)*(s-ddd),0.5);
    dt=pow(4*a/pow(3,0.5),0.5);
    k=pow(pow(dt,2)-pow(dt/2,2),0.5);
    cout<<fixed<<setprecision(2)<<dt nw dt/2 nw k;
    return 0;
}
