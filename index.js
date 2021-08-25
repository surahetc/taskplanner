
const fs = require('fs');
const args = process.argv;
const currentWorkingDirectory = args[1].slice(0, -8);

if (fs.existsSync(currentWorkingDirectory + 'todo.txt') === false) {
    let createStream = fs.createWriteStream('todo.txt');
    createStream.end();
  }
 

  

  const listFunction = () => {
  

    let data = []; 
      

    const fileData = fs.readFileSync(
      currentWorkingDirectory + 'todo.txt')
    .toString(); 
      

    data = fileData.split('\n'); 

    let filterData = data.filter(function (value) {
      return value !== '';
    }); 
      
    if (filterData.length === 0) {
      console.log('There are no pending todos!');
    }
      
    for (let i = 0; i < filterData.length; i++) {
      console.log((filterData.length - i) + '. ' 
      + filterData[i]);
    }
  };

  const addFunction = () => {
  
   
    const newTask = args[3]; 
      
  
    if (newTask) { 
      

      let data = []; 
    

      const fileData = fs
        .readFileSync(currentWorkingDirectory + 'todo.txt')
        .toString(); 
          

      fs.writeFile(
        currentWorkingDirectory + 'todo.txt',
        newTask + '\n' + fileData, 
          
        function (err) {
    

          if (err) throw err; 
          console.log('Added todo: "' + newTask + '"'); 
        },
      );
    } else { 
    

      console.log('Error: Missing todo string. Nothing added!');
    }
  };



  const deleteFunction = () => {
  

    const deleteIndex = args[3]; 
      

    if (deleteIndex) { 

      let data = []; 
        

      const fileData = fs
        .readFileSync(currentWorkingDirectory + 'todo.txt')
        .toString(); 
          
      data = fileData.split('\n');

      let filterData = data.filter(function (value) {
        return value !== ''; 
      });
        

      if (deleteIndex > filterData.length || deleteIndex <= 0) {
        console.log(
          'Error: todo #' + deleteIndex 
              + ' does not exist. Nothing deleted.',
        );   
      } else {
    

        filterData.splice(filterData.length - deleteIndex, 1); 
          
  
        const newData = filterData.join('\n'); 
          
        
        fs.writeFile(
          currentWorkingDirectory + 'todo.txt',
          newData, 
          function (err) {
            if (err) throw err;
    
            
            console.log('Deleted todo #' + deleteIndex); 
          },
        );
      }
    } else { 
    
      
      console.log(
  'Error: Missing NUMBER for deleting todo.');
    }
  };


  
  
switch (args[2]) {
    case 'add': {
        addFunction();
        break;
    }
    
    case 'list': {
        listFunction();
        break;
    }
    
    case 'delete': {
        deleteFunction();
        break;
    }
        
        
    default: {
        console.log("Wrong command line argument")
        
    }
    }
    