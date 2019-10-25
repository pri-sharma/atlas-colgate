export const apiUrl=(obj)=>{
    if(obj=='gridViewStructure')
    return 'http://aggrid-demo.mediaagility.com/BigQuery/api/View/GetGridViewStructure'
    if(obj=='gridViewData')
    return 'http://aggrid-demo.mediaagility.com/BigQuery/api/View/GetGridViewData?data=0'
   }

