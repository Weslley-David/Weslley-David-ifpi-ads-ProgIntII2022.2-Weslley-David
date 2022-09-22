export const codeGenerator = () =>{
    let min: number = Math.ceil(10000);
    let max: number = Math.floor(99999);
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
}