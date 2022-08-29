export const verifyNewPassword = (newPassword : string, oldpassword: string) =>{
    let loop: number = newPassword.length
    let maiusc: boolean = false
    let special: boolean = false

    while(loop >= 0){
        if(newPassword.charCodeAt(loop) > 64 && newPassword.charCodeAt(loop) < 91){
            maiusc = true
        }
        if(newPassword.charCodeAt(loop) > 31 && newPassword.charCodeAt(loop) < 65){
            special = true
        }
        loop--
    }

    if(newPassword.length < 6 || newPassword === oldpassword || (!special || !maiusc)){
        return false
    }
        return true
}