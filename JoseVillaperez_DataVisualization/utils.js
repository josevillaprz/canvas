class Utils {
    constructor(){}

    // DRY code. need to fix
    static validateGrades(g1,g2,g3){
        if((g1<0 || g1>100) || g1 == ''){
            return false;
        }
        else if((g2<0 || g2>100) || g2 == ''){
            return false;
        }
        else if((g3<0 || g3>100) || g3 == ''){
            return false;
        }
        return true;
    }

    static displayError(message){
        const error = document.querySelector("#alert p");
        error.style.display = 'block';
        error.innerHTML = message;
    }

    static clearError(){
        const error = document.querySelector("#alert p");
        error.style.display = 'none';
    }
}