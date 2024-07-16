//Declaramos los arrays
let nums = [2,0,2,1,1,0];
let nuevo = [];
let cosa = nums.length;
for (let i=0;i<cosa;i++){
    let num = Number.MAX_VALUE;
    let pos = -1;
    for(let j=0;j<nums.length;j++){
        if (nums[j]<num){
            num=nums[j]
            pos = j;
        }
    }

    nuevo.push(num)
    nums.splice(pos,1)
}
//Imprimimos el resultado
console.log(nuevo);
//Reemplazamos en el nuevo array
for (let i = 0; i < nums.length; i++) {
    nums[i] = nuevo[i];
}