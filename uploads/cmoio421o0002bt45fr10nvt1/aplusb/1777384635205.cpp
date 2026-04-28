/*
#include <bits/stdc++.h>
using namespace std;
string a,b;
int la,lb,tod,na,nb;
int main(){
    cin.tie(nullptr)->sync_with_stdio(false);
    cin>>a>>b;
    la=a.size(),lb=b.size();
    for(int i=1;i<=max(la,lb);i++){
            if(i<=la) na=a[la-i]-'0';
            else na=0;
            if(i<=lb) nb=b[lb-i]-'0';
            else nb=0;
            if(la>=lb) a[la-i]=((na+nb+tod)%10)+'0';
            else b[lb-i]=((na+nb+tod)%10)+'0';
            tod=(na+nb)/10;
    }
    if(tod) cout<<1;
    if(la>=lb) cout<<a;
    else cout<<b;
    return 0;
}
*/
#include <bits/stdc++.h>
using namespace std;
long long a,b;
int main(){
    cin.tie(nullptr)->sync_with_stdio(false);
    cin>>a>>b;
    cout<<a+b;
    return 0;
}