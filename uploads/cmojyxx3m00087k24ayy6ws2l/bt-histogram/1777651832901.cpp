#include <iostream>
using namespace std;
int main(){
    int a;
    cin >> a;
    int b[a];
    int m = 0;
    int mt = 0;
    for(int i = 0 ; i < a; i ++){
        cin >> b[i];
        m = max(m,b[i]);
    }
    int c[m];
    for(int i = 0 ; i < m; i ++){
        c[i] = 0;
    }
    for(int i = 0 ; i < a; i ++){
        c[b[i]-1]++;
    }
    for(int i = 0 ; i < m; i ++){
        mt = max(mt,c[i]);
    }
    for(int i = 0 ; i < mt; i ++){
        for(int j = 0; j < m; j ++){
            if(c[j] >= mt-i){
                cout << "*";
            }
            else{
                cout << ".";
            }
        }
        cout << "\n";
    }
    return 0;
}
