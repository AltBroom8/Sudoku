/*Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]*/


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

console.log(nuevo);
