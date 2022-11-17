function wraper(argument, callback){
  if(typeof argument === 'string'){
    const err = new Error('The argument is a string');
    callback(err);
  }else{
    const timesTen = argument * 10;
    callback(null, timesTen);
  }
}

wraper('oe', (error, result)=>{
  if(error){
    console.error(error);
  }else{
    console.log(result);
  }
})
