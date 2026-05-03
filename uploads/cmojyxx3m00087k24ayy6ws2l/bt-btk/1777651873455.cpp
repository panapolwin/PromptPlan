#include <bits/stdc++.h>
using namespace std;
int main(){
    cin.tie(0)->sync_with_stdio(0);
    int x[3],y[3];
    for(int i = 0; i < 3; i ++){
        cin >> x[i] >> y[i];
    }
    double  l[3];
    l[0] = sqrt(abs(x[0]-x[1]) + abs(y[0]-y[1]));
    l[1] = sqrt(abs(x[1]-x[2]) + abs(y[1]-y[2]));
    l[2] = sqrt(abs(x[2]-x[0]) + abs(y[2]-y[0]));
    double s = (l[0] + l[1] + l[2])/2;
    double t = sqrt(s*(s-l[0])*(s-l[1])*(s-l[2]));
    double i = sqrt(t*(4/sqrt(3)));
    double j = i/2;
    double k = sqrt((i*i) - ( (i/2)*(i/2) ));
    cout << fixed << setprecision(2) << i << " " << j << " " << k;
    return 0;
}
